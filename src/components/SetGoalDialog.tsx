import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SetGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal: number;
  onSubmit: (goal: number) => void;
}

export const SetGoalDialog = ({ open, onOpenChange, currentGoal, onSubmit }: SetGoalDialogProps) => {
  const [goal, setGoal] = useState(currentGoal.toString());

  useEffect(() => {
    setGoal(currentGoal.toString());
  }, [currentGoal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || parseFloat(goal) <= 0) return;
    
    onSubmit(parseFloat(goal));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Definir Meta Mensal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Meta Mensal (R$)</Label>
            <Input
              id="goal"
              type="number"
              step="0.01"
              placeholder="5000,00"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Defina quanto você deseja ganhar por mês
            </p>
          </div>
          
          <Button type="submit" className="w-full">
            Salvar Meta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
