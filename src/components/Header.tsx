import { Plus, Target, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddGain: () => void;
  onSetGoal: () => void;
}

export const Header = ({ onAddGain, onSetGoal }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GainTrack
          </h1>
        </div>
        
        <nav className="flex items-center gap-2">
          <Button onClick={onAddGain} className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar ganho
          </Button>
          <Button variant="ghost" size="icon" onClick={onSetGoal} title="Definir meta mensal">
            <Target className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};
