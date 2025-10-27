import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Gain {
  id: string;
  date: string;
  amount: number;
  category: string;
}

interface GainHistoryProps {
  gains: Gain[];
}

const categoryColors: Record<string, string> = {
  salário: "bg-chart-1 hover:bg-chart-1/80",
  venda: "bg-chart-2 hover:bg-chart-2/80",
  investimento: "bg-chart-3 hover:bg-chart-3/80",
  extra: "bg-chart-4 hover:bg-chart-4/80",
};

export const GainHistory = ({ gains }: GainHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Ganhos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    Nenhum ganho registrado ainda
                  </TableCell>
                </TableRow>
              ) : (
                gains.map((gain) => (
                  <TableRow key={gain.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      {new Date(gain.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[gain.category] || "bg-muted"}>
                        {gain.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      R$ {gain.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
