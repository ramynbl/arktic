import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

function downloadCSV(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return;

  const headers = [
    "id",
    "prenom",
    "nom",
    "email",
    "telephone",
    "accepteContact",
    "attestePresence",
    "eventId",
    "createdAt",
  ];

  const escape = (v: unknown) => {
    const s = String(v ?? "");
    // Wrap in quotes if it contains comma, quote or newline
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const csvLines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];

  const blob = new Blob(["\uFEFF" + csvLines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `inscriptions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminInscriptions() {
  const { data: inscriptions, isLoading } = trpc.inscriptions.list.useQuery({
    eventId: "prochain-event",
  });
  const { data: count } = trpc.inscriptions.count.useQuery({
    eventId: "prochain-event",
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Inscriptions</CardTitle>
            <p className="text-muted-foreground mt-1">
              {count !== undefined ? `${count} inscrit(s)` : "Chargement…"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => inscriptions && downloadCSV(inscriptions as any)}
            disabled={!inscriptions || inscriptions.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground py-8 text-center">
              Chargement…
            </p>
          ) : !inscriptions || inscriptions.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              Aucune inscription pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Contact OK</TableHead>
                    <TableHead>Présence</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inscriptions.map((ins) => (
                    <TableRow key={ins.id}>
                      <TableCell className="font-medium">{ins.id}</TableCell>
                      <TableCell>{ins.prenom}</TableCell>
                      <TableCell>{ins.nom}</TableCell>
                      <TableCell>{ins.email}</TableCell>
                      <TableCell>{ins.telephone}</TableCell>
                      <TableCell>
                        {ins.accepteContact ? "✅" : "❌"}
                      </TableCell>
                      <TableCell>
                        {ins.attestePresence ? "✅" : "❌"}
                      </TableCell>
                      <TableCell>
                        {ins.createdAt
                          ? new Date(ins.createdAt).toLocaleDateString("fr-FR")
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
