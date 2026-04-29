import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string;
  delta: string;
}

export function StatGrid({ items }: { items: readonly StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.delta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
