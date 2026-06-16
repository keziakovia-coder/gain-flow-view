import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  TrendingUp,
  LineChart,
  DollarSign,
  Target,
  PieChart,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  Wallet,
  Calendar,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export default function Index() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const features = [
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Gráfico de Crescimento",
      description:
        "Visualize seus ganhos crescerem em tempo real com gráficos interativos. Acompanhe a evolução acumulada de forma intuitiva.",
      stat: "100%",
      statLabel: "Visual",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Histórico Completo",
      description:
        "Registre todos os seus ganhos com data, valor e categoria. Nunca perca o controle de nenhuma receita.",
      stat: "Ilimitado",
      statLabel: "Registros",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Metas Mensais",
      description:
        "Defina objetivos financeiros claros e acompanhe seu progresso em tempo real com barras de progresso visuais.",
      stat: "Rápido",
      statLabel: "Acompanhamento",
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Estatísticas Inteligentes",
      description:
        "Analise seu crescimento percentual e total de ganhos mensais automaticamente. Tome decisões baseadas em dados.",
      stat: "Automático",
      statLabel: "Cálculo",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Rápido e Simples",
      description: "Adicione um novo ganho em segundos. Interface limpa e sem complicações.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Dados Privados",
      description: "Tudo fica salvo localmente no seu navegador. Você tem total controle sobre suas informações.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Análise Visual",
      description: "Gráficos e estatísticas que tornam fácil entender sua evolução financeira.",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Acompanhamento Temporal",
      description: "Compare mês a mês e veja seu crescimento ao longo do tempo.",
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      title: "Multi-categoria",
      description: "Organize seus ganhos por categorias: salário, vendas, investimentos, extras e mais.",
    },
    {
      icon: <ArrowUpRight className="w-5 h-5" />,
      title: "Motivação Constante",
      description: "Quanto mais você ganha, mais seu gráfico sobe. Uma forma visual de se motivar.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Adicione seus ganhos",
      desc: "Registre cada receita com valor, categoria e data. Leva menos de 10 segundos.",
    },
    {
      num: "02",
      title: "Acompanhe o crescimento",
      desc: "Veja seu gráfico subir automaticamente conforme seus ganhos aumentam.",
    },
    {
      num: "03",
      title: "Defina suas metas",
      desc: "Estabeleça objetivos mensais e acompanhe o progresso em tempo real.",
    },
    {
      num: "04",
      title: "Analise e evolua",
      desc: "Use estatísticas automáticas para entender seu crescimento e tomar decisões.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/70">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Finance</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a>
          </nav>
          <Link to="/dashboard">
            <Button size="sm" className="gap-2 rounded-full px-5">
              <Sparkles className="w-3.5 h-3.5" />
              Acessar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Controle Financeiro Pessoal
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Seu crescimento
              <br />
              <span className="bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">
                financeiro visualizado
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Acompanhe seus ganhos, defina metas e veja seu progresso subir em tempo real.
              Uma ferramenta simples e poderosa para quem quer crescer.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 rounded-full px-8 h-12 text-base">
                  <TrendingUp className="w-4.5 h-4.5" />
                  Começar Agora
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 rounded-full px-8 h-12 text-base" asChild>
                <a href="#funcionalidades">
                  Ver Funcionalidades
                  <ChevronRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-16 md:mt-24 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 overflow-hidden">
              {/* Browser chrome */}
              <div className="h-10 bg-muted/50 border-b border-border/40 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/80 rounded-md px-4 py-1 text-xs text-muted-foreground font-mono">
                    finance.app/dashboard
                  </div>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total do Mês", value: "R$ 12.450,00", icon: DollarSign, up: true },
                    { label: "Crescimento", value: "+23.5%", icon: TrendingUp, up: true },
                    { label: "Meta Mensal", value: "85%", icon: Target, up: false },
                  ].map((card, i) => (
                    <div key={i} className="bg-background/60 rounded-xl p-4 border border-border/40">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                        <card.icon className="w-3.5 h-3.5" />
                        {card.label}
                      </div>
                      <div className="text-lg font-bold">{card.value}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-background/60 rounded-xl p-4 border border-border/40 h-40 flex items-end justify-center gap-1">
                  {[40, 55, 45, 70, 60, 85, 75, 90, 80, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Funcionalidades
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Tudo que você precisa para crescer
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-muted-foreground">
              Ferramentas poderosas e simples para acompanhar sua jornada financeira de perto
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative p-7 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/80 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1.5">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{feature.stat}</span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{feature.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Processo
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Como funciona?
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-muted-foreground">
              Quatro passos simples para começar a controlar seus ganhos
            </motion.p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <AnimatedSection key={i}>
                  <motion.div
                    variants={staggerItem}
                    className="relative p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-colors duration-300"
                  >
                    <span className="text-5xl font-bold text-primary/10 absolute top-4 right-6 select-none">
                      {step.num}
                    </span>
                    <div className="relative">
                      <div className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">
                        Passo {step.num}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Por que usar o Finance?
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-muted-foreground">
              Benefícios que fazem a diferença no seu dia a dia
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-primary/5 via-success/3 to-primary/5 border-y border-border/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "100%", label: "Gratuito" },
                { value: "0s", label: "Cadastro" },
                { value: "Privado", label: "Seus dados" },
                { value: "24/7", label: "Disponível" },
              ].map((stat, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={staggerItem}
              className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-primary/10 via-success/5 to-primary/10 border border-primary/15 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Seu crescimento começa quando você o mede
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Comece a acompanhar seus ganhos hoje. É gratuito, privado e leva menos de um minuto para começar.
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 rounded-full px-10 h-13 text-base">
                    <TrendingUp className="w-5 h-5" />
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Finance</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Seu crescimento começa quando você o mede.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
