import { Plus, Target, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  onAddGain: () => void;
  onSetGoal: () => void;
}

export const Header = ({ onAddGain, onSetGoal }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">💰</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GainTrack
          </h1>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button onClick={onAddGain} className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar ganho
          </Button>
          <Button variant="ghost" size="icon" onClick={onSetGoal} title="Definir meta mensal">
            <Target className="h-5 w-5" />
          </Button>
          <Link to="/">
            <Button variant="ghost" size="icon" title="Voltar ao início">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
