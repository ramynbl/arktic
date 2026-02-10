import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    accepteContact: false,
    attestePresence: false,
  });

  const createInscription = trpc.inscriptions.create.useMutation();
  const isSubmitting = createInscription.isPending;

  // Récupérer le nombre d'inscriptions
  const { data: inscriptionCount = 0 } = trpc.inscriptions.count.useQuery({
    eventId: "prochain-event",
  });

  const maxPlaces = 15;
  const remainingPlaces = Math.max(0, maxPlaces - (inscriptionCount as number));
  const occupancyPercentage = ((inscriptionCount as number) / maxPlaces) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    if (!formData.accepteContact || !formData.attestePresence) {
      toast.error("Vous devez accepter les conditions");
      return;
    }

    try {
      await createInscription.mutateAsync({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        accepteContact: formData.accepteContact,
        attestePresence: formData.attestePresence,
        eventId: "prochain-event",
      });

      toast.success("Inscription confirmée ! À bientôt chez Arkose 🧗");
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        accepteContact: false,
        attestePresence: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container max-w-2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <img src={APP_LOGO} alt="Arktic" className="h-16 w-auto mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary mb-2">
              Inscription
            </h1>
            <p className="text-muted-foreground text-lg">
              Rejoins-nous pour la prochaine session escalade à Arkose Montreuil
            </p>
          </div>

          {/* Places Counter */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">Places disponibles</h2>
                <span className="text-3xl font-bold text-primary">{remainingPlaces}/{maxPlaces}</span>
              </div>
              
              {/* Occupancy Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-foreground/70">Taux d'occupation</p>
                  <p className="text-sm text-muted-foreground">{Math.round(occupancyPercentage)}%</p>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
              </div>

              {remainingPlaces === 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">Événement complet</p>
                  <p className="text-red-600 text-sm">Toutes les places sont réservées</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-foreground/70 mb-2">
                  Prénom *
                </label>
                <Input
                  id="prenom"
                  type="text"
                  name="prenom"
                  placeholder="Jean"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="rounded-lg"
                  required
                  disabled={isSubmitting || remainingPlaces === 0}
                />
              </div>
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-foreground/70 mb-2">
                  Nom *
                </label>
                <Input
                  id="nom"
                  type="text"
                  name="nom"
                  placeholder="Dupont"
                  value={formData.nom}
                  onChange={handleChange}
                  className="rounded-lg"
                  required
                  disabled={isSubmitting || remainingPlaces === 0}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="jean.dupont@exemple.com"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg"
                required
                disabled={isSubmitting || remainingPlaces === 0}
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-foreground/70 mb-2">
                Numéro de téléphone *
              </label>
              <Input
                id="telephone"
                type="tel"
                name="telephone"
                placeholder="+33 6 12 34 56 78"
                value={formData.telephone}
                onChange={handleChange}
                className="rounded-lg"
                required
                disabled={isSubmitting || remainingPlaces === 0}
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="attestePresence"
                  name="attestePresence"
                  checked={formData.attestePresence}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      attestePresence: checked as boolean,
                    }))
                  }
                  className="mt-1"
                  disabled={isSubmitting || remainingPlaces === 0}
                />
                <label
                  htmlFor="attestePresence"
                  className="text-sm text-foreground/70 cursor-pointer"
                >
                  J'atteste que je serai présent à cet événement et que les informations
                  fournies sont exactes *
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="accepteContact"
                  name="accepteContact"
                  checked={formData.accepteContact}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      accepteContact: checked as boolean,
                    }))
                  }
                  className="mt-1"
                  disabled={isSubmitting || remainingPlaces === 0}
                />
                <label
                  htmlFor="accepteContact"
                  className="text-sm text-foreground/70 cursor-pointer"
                >
                  J'accepte d'être recontacté par email ou téléphone en cas de besoin *
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || remainingPlaces === 0}
              className="w-full rounded-lg py-3 text-lg font-semibold"
            >
              {remainingPlaces === 0
                ? "Événement complet"
                : isSubmitting
                ? "Inscription en cours..."
                : "Confirmer mon inscription"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Les champs marqués d'un * sont obligatoires
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
