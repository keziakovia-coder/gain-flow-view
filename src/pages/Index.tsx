import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { GainChart } from "@/components/GainChart";
import { GainHistory } from "@/components/GainHistory";
import { GoalProgress } from "@/components/GoalProgress";
import { AddGainDialog } from "@/components/AddGainDialog";
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
  const [monthlyGoal] = useState(5000);

  // Load gains from localStorage on mount
  useEffect(() => {
    const savedGains = localStorage.getItem("gaintrack-gains");
    if (savedGains) {
      setGains(JSON.parse(savedGains));
    }
  }, []);

  // Save gains to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gaintrack-gains", JSON.stringify(gains));
  }, [gains]);

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

  return (
    <div className="min-h-screen bg-background">
      <Header onAddGain={() => setDialogOpen(true)} />
      
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
            value={`${growth}%`}
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
    </div>
  );
};

export default Index;
