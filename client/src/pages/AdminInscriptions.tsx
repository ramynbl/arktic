import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Trash2, LogOut, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

/* ─── CSV Export ─────────────────────────────────────── */

function downloadCSV(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return;

  const headers = [
    "id", "prenom", "nom", "email", "telephone",
    "accepteContact", "attestePresence", "eventId", "createdAt",
  ];

  const escape = (v: unknown) => {
    const s = String(v ?? "");
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

/* ─── Login Screen ───────────────────────────────────── */

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      toast.success("Connexion réussie !");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Entrez le mot de passe");
      return;
    }
    loginMutation.mutate({ password });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">Espace Admin</CardTitle>
          <p className="text-muted-foreground mt-2">
            Entrez le mot de passe pour accéder au panneau d'administration
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg pr-10"
                autoFocus
                disabled={loginMutation.isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Inscriptions Table ─────────────────────────────── */

function InscriptionsTable() {
  const utils = trpc.useUtils();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data: inscriptions, isLoading, error } = trpc.inscriptions.list.useQuery({
    eventId: "prochain-event",
  });
  const { data: count } = trpc.inscriptions.count.useQuery({
    eventId: "prochain-event",
  });

  const deleteMutation = trpc.inscriptions.delete.useMutation({
    onSuccess: () => {
      toast.success("Inscription supprimée !");
      invalidateAndClearSelection();
    },
    onError: (error) => {
      toast.error("Erreur : " + error.message);
    },
  });

  const deleteManyMutation = trpc.inscriptions.deleteMany.useMutation({
    onSuccess: (_, variables) => {
      toast.success(`${variables.ids.length} inscription(s) supprimée(s) !`);
      invalidateAndClearSelection();
    },
    onError: (error) => {
      toast.error("Erreur : " + error.message);
    },
  });

  const deleteAllMutation = trpc.inscriptions.deleteAll.useMutation({
    onSuccess: () => {
      toast.success("Toutes les inscriptions ont été supprimées !");
      invalidateAndClearSelection();
    },
    onError: (error) => {
      toast.error("Erreur : " + error.message);
    },
  });

  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => {
      toast.success("Déconnecté !");
      window.location.reload();
    },
  });

  const invalidateAndClearSelection = () => {
    setSelectedIds(new Set());
    utils.inscriptions.list.invalidate();
    utils.inscriptions.count.invalidate();
  };

  const isDeleting =
    deleteMutation.isPending ||
    deleteManyMutation.isPending ||
    deleteAllMutation.isPending;

  /* ─ Selection helpers ─ */

  const allIds = inscriptions?.map((i) => i.id) ?? [];
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const someSelected = selectedIds.size > 0;

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIds));
    }
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Erreur : {error.message}</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
        <div>
          <CardTitle className="text-2xl">Inscriptions</CardTitle>
          <p className="text-muted-foreground mt-1">
            {count !== undefined ? `${count} inscrit(s)` : "Chargement…"}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Bulk delete selected */}
          {someSelected && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer ({selectedIds.size})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer {selectedIds.size} inscription(s) ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu es sur le point de supprimer <strong>{selectedIds.size} inscription(s)</strong>.
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteManyMutation.mutate({ ids: Array.from(selectedIds) })}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Delete all */}
          {inscriptions && inscriptions.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  disabled={isDeleting}
                >
                  Tout supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tout supprimer ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu es sur le point de supprimer <strong>TOUTES les inscriptions</strong> ({inscriptions.length}).
                    Cette action est irréversible. Pense à exporter le CSV avant si tu veux garder une trace.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteAllMutation.mutate({ eventId: "prochain-event" })}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Tout supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => inscriptions && downloadCSV(inscriptions as any)}
            disabled={!inscriptions || inscriptions.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="text-muted-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground py-8 text-center">Chargement…</p>
        ) : !inscriptions || inscriptions.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            Aucune inscription pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleAll}
                      aria-label="Tout sélectionner"
                    />
                  </TableHead>
                  <TableHead>#</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Contact OK</TableHead>
                  <TableHead>Présence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inscriptions.map((ins) => (
                  <TableRow
                    key={ins.id}
                    data-selected={selectedIds.has(ins.id) || undefined}
                    className={selectedIds.has(ins.id) ? "bg-muted/50" : ""}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(ins.id)}
                        onCheckedChange={() => toggleOne(ins.id)}
                        aria-label={`Sélectionner ${ins.prenom} ${ins.nom}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{ins.id}</TableCell>
                    <TableCell>{ins.prenom}</TableCell>
                    <TableCell>{ins.nom}</TableCell>
                    <TableCell>{ins.email}</TableCell>
                    <TableCell>{ins.telephone}</TableCell>
                    <TableCell>{ins.accepteContact ? "✅" : "❌"}</TableCell>
                    <TableCell>{ins.attestePresence ? "✅" : "❌"}</TableCell>
                    <TableCell>
                      {ins.createdAt
                        ? new Date(ins.createdAt).toLocaleDateString("fr-FR")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer cette inscription ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tu es sur le point de supprimer l'inscription de{" "}
                              <strong>
                                {ins.prenom} {ins.nom}
                              </strong>
                              . Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate({ id: ins.id })}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Page Root ───────────────────────────────────────── */

export default function AdminInscriptions() {
  const { data: authStatus, isLoading } = trpc.admin.verify.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const isAuthenticated = authStatus?.authenticated || justLoggedIn;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {isAuthenticated ? (
        <InscriptionsTable />
      ) : (
        <AdminLogin onSuccess={() => setJustLoggedIn(true)} />
      )}
    </div>
  );
}
