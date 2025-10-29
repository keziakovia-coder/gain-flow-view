import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, PieChart, LineChart, DollarSign, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Gráfico de Crescimento",
      description: "Visualize seus ganhos crescerem em tempo real com gráficos interativos e dinâmicos."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Histórico Completo",
      description: "Registre todos os seus ganhos com data, valor e categoria para análise detalhada."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Metas Mensais",
      description: "Defina objetivos financeiros e acompanhe seu progresso em tempo real."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Estatísticas Inteligentes",
      description: "Analise seu crescimento percentual e total de ganhos mensais automaticamente."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Finance
            </span>
          </div>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Acessar Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Ferramenta de Análise Financeira Pessoal
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Visualize seu{" "}
            <span className="bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">
              crescimento financeiro
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Finance é sua ferramenta pessoal para monitorar, analisar e celebrar cada conquista financeira. 
            Quanto mais você ganha, mais seu gráfico sobe!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                <TrendingUp className="w-5 h-5" />
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#features">Conheça as Funcionalidades</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Tudo que você precisa para crescer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas e simples para acompanhar sua jornada financeira
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como funciona?</h2>
            <p className="text-xl text-muted-foreground">Simples, rápido e eficiente</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Adicione seus ganhos",
                description: "Registre cada receita: salário, vendas, investimentos ou extras. Tudo fica salvo no seu navegador."
              },
              {
                step: "2",
                title: "Acompanhe o crescimento",
                description: "Veja seu gráfico subir automaticamente conforme seus ganhos aumentam ao longo do tempo."
              },
              {
                step: "3",
                title: "Defina suas metas",
                description: "Estabeleça objetivos mensais e acompanhe o progresso em tempo real com barras de progresso visuais."
              },
              {
                step: "4",
                title: "Analise e melhore",
                description: "Use estatísticas inteligentes para entender seu crescimento percentual e tomar decisões melhores."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-success/5 to-primary/10 border-primary/20">
          <h2 className="text-4xl font-bold mb-4">
            Seu crescimento começa quando você o mede
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comece a acompanhar seus ganhos hoje e veja seu progresso financeiro crescer visualmente
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              <TrendingUp className="w-5 h-5" />
              Começar
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-4 text-lg font-medium">
              Seu crescimento começa quando você o mede.
            </p>
            <div className="flex gap-6 justify-center text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Contato</a>
              <a href="#" className="hover:text-primary transition-colors">Sobre</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
