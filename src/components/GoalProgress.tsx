import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GoalProgressProps {
  current: number;
  goal: number;
}

export const GoalProgress = ({ current, goal }: GoalProgressProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <Card className="bg-gradient-to-br from-success-light to-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎯</span>
          Meta Mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold">{percentage.toFixed(1)}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Atual</p>
            <p className="text-xl font-bold text-primary">
              R$ {current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Meta</p>
            <p className="text-xl font-bold">
              R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        {percentage >= 100 ? (
          <p className="text-sm font-medium text-primary text-center py-2 bg-success-light rounded-md">
            🎉 Parabéns! Você atingiu sua meta!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Faltam R$ {(goal - current).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para sua meta
          </p>
        )}
      </CardContent>
    </Card>
  );
};
