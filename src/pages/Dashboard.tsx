import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { GainChart } from "@/components/GainChart";
import { GainHistory } from "@/components/GainHistory";
import { GoalProgress } from "@/components/GoalProgress";
import { AddGainDialog } from "@/components/AddGainDialog";
import { SetGoalDialog } from "@/components/SetGoalDialog";
import { DollarSign, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";

interface Gain {
  id: string;
  date: string;
  amount: number;
  category: string;
}

const Index = () => {
  const [gains, setGains] = useState<Gain[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(0);
  const [trialExpired, setTrialExpired] = useState(false);

  // Check trial period and load data from localStorage on mount
  useEffect(() => {
    // Check trial period
    const trialStartDate = localStorage.getItem("finance-trial-start");
    
    if (!trialStartDate) {
      // First time user - start trial
      const now = new Date().toISOString();
      localStorage.setItem("finance-trial-start", now);
    } else {
      // Check if 10 days have passed
      const startDate = new Date(trialStartDate);
      const now = new Date();
      const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysPassed > 10) {
        setTrialExpired(true);
        return; // Don't load data if trial expired
      }
    }
    
    // Load gains from localStorage
    const savedGains = localStorage.getItem("finance-gains");
    if (savedGains) {
      setGains(JSON.parse(savedGains));
    }
    
    // Load goal from localStorage
    const savedGoal = localStorage.getItem("finance-goal");
    if (savedGoal) {
      setMonthlyGoal(parseFloat(savedGoal));
    }
  }, []);

  // Save gains to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("finance-gains", JSON.stringify(gains));
  }, [gains]);
  
  // Save goal to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("finance-goal", monthlyGoal.toString());
  }, [monthlyGoal]);

  const handleAddGain = (newGain: { amount: number; category: string; date: string }) => {
    const gain: Gain = {
      id: Date.now().toString(),
      ...newGain,
    };
    
    setGains([gain, ...gains]);
    toast.success("Ganho adicionado com sucesso! 🎉", {
      description: `R$ ${newGain.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em ${newGain.category}`,
    });
  };
  
  const handleSetGoal = (newGoal: number) => {
    setMonthlyGoal(newGoal);
    toast.success("Meta atualizada! 🎯", {
      description: `Nova meta: R$ ${newGoal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    });
  };
  
  const handleClearAll = () => {
    setGains([]);
    setMonthlyGoal(0);
    localStorage.removeItem("finance-gains");
    localStorage.removeItem("finance-goal");
    toast.success("Todos os dados foram limpos! 🗑️", {
      description: "Você pode começar do zero agora.",
    });
  };

  // Calculate statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyGains = gains.filter(g => {
    const gainDate = new Date(g.date);
    return gainDate.getMonth() === currentMonth && gainDate.getFullYear() === currentYear;
  });

  const totalMonthly = monthlyGains.reduce((sum, g) => sum + g.amount, 0);
  
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const previousMonthGains = gains.filter(g => {
    const gainDate = new Date(g.date);
    return gainDate.getMonth() === previousMonth && gainDate.getFullYear() === previousYear;
  });
  const totalPreviousMonth = previousMonthGains.reduce((sum, g) => sum + g.amount, 0);
  
  const growth = totalPreviousMonth > 0 
    ? ((totalMonthly - totalPreviousMonth) / totalPreviousMonth * 100).toFixed(1)
    : totalMonthly > 0 
      ? "100.0"
      : "0.0";

  // Prepare chart data - cumulative gains over time
  const chartData = gains
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: Array<{ date: string; total: number }>, gain) => {
      const lastTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
      acc.push({
        date: new Date(gain.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        total: lastTotal + gain.amount,
      });
      return acc;
    }, []);

  // If trial expired, show subscription message
  if (trialExpired) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Teste Grátis Expirado</h2>
            <p className="text-muted-foreground text-lg">
              Seu período de teste de 10 dias terminou.
            </p>
          </div>
          
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
            <p className="text-lg">
              Para continuar acessando o <span className="font-bold text-primary">Finance</span> e todos os seus recursos, você precisa assinar um plano.
            </p>
            
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                ✅ Histórico ilimitado de ganhos
              </p>
              <p className="flex items-center justify-center gap-2">
                ✅ Gráficos e estatísticas avançadas
              </p>
              <p className="flex items-center justify-center gap-2">
                ✅ Metas personalizadas
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md font-medium transition-colors">
              Assinar Agora
            </button>
            <p className="text-sm text-muted-foreground">
              Entre em contato para mais informações sobre os planos disponíveis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAddGain={() => setDialogOpen(true)} 
        onSetGoal={() => setGoalDialogOpen(true)}
        onClearAll={handleClearAll}
      />
      
      <main className="container px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total do Mês"
            value={`R$ ${totalMonthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
          />
          <StatsCard
            title="Crescimento"
            value={`${parseFloat(growth) >= 0 ? '+' : ''}${growth}%`}
            icon={TrendingUp}
            trend={parseFloat(growth) >= 0 ? "↗ Em crescimento" : "↘ Em queda"}
          />
          <StatsCard
            title="Meta Mensal"
            value={`${((totalMonthly / monthlyGoal) * 100).toFixed(0)}%`}
            icon={Target}
            trend={`de R$ ${monthlyGoal.toLocaleString('pt-BR')}`}
          />
        </div>

        {/* Main Chart */}
        <GainChart data={chartData.length > 0 ? chartData : [{ date: "Hoje", total: 0 }]} />

        {/* Motivational Text */}
        <div className="text-center py-4">
          <p className="text-lg font-medium text-muted-foreground italic">
            "Quanto mais você ganha, mais o gráfico sobe."
          </p>
        </div>

        {/* Bottom Section: History and Goal */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GainHistory gains={gains} />
          </div>
          <div>
            <GoalProgress current={totalMonthly} goal={monthlyGoal} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container px-4 text-center space-y-4">
          <p className="text-lg font-medium text-muted-foreground italic">
            "Seu crescimento começa quando você o mede."
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Sobre</a>
          </div>
        </div>
      </footer>

      <AddGainDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddGain}
      />
      
      <SetGoalDialog
        open={goalDialogOpen}
        onOpenChange={setGoalDialogOpen}
        currentGoal={monthlyGoal}
        onSubmit={handleSetGoal}
      />
    </div>
  );
};

export default Index;
