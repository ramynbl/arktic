# Workflow Complet : Intégration de Stripe (Paiement Sécurisé)

Ce workflow détaillé est conçu pour vous guider pas-à-pas dans l'intégration de Stripe pour des paiements sécurisés avec une stack React / Vite en frontend, et tRPC / Express en backend.

## Prérequis
- Un compte [Stripe](https://stripe.com/fr)
- Un projet existant avec Node.js, Vite et tRPC

---

## Étape 1 : Récupération des Clés (Dashboard Stripe)

1. Connectez-vous à votre [Tableau de Bord Stripe](https://dashboard.stripe.com/test/dashboard).
2. Vérifiez bien que le **"Mode Test"** est activé (bouton en haut à droite).
3. Naviguez vers la section **Développeurs > Clés API**.
4. Copiez vos deux clés principales :
   - **Clé publiable** (`pk_test_...`) : pour le frontend (React).
   - **Clé secrète** (`sk_test_...`) : pour le backend (Node.js/tRPC). *Ne jamais exposer cette clé en public.*

---

## Étape 2 : Variables d'Environnement

Dans la racine de votre projet, ouvrez le fichier `.env` ou `.env.local` et ajoutez vos clés :

```env
# Clé Publique (Frontend) : Préfixée par VITE_ pour être accessible dans React
VITE_STRIPE_PUBLIC_KEY="pk_test_votre_cle_publique_ici"

# Clé Secrète (Backend)
STRIPE_SECRET_KEY="sk_test_votre_cle_secrete_ici"
```

---

## Étape 3 : Installation des Dépendances

Dans votre terminal, installez les paquets nécessaires pour le backend et le frontend.

**Backend :**
```bash
pnpm add stripe
```

**Frontend :**
```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js
```

---

## Étape 4 : Configuration Backend (Création du Payment Intent)

L'objectif ici est de dire à Stripe qu'un utilisateur s'apprête à payer X euros, et de récupérer un `client_secret` pour sécuriser la transaction.

Dans votre fichier `server/routers.ts` :

```typescript
import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";

// 1. Initialisation de Stripe (Backend uniquement)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Remplacez par votre version
});

export const appRouter = router({
  // ... vos autres routeurs
  
  payment: router({
    createIntent: publicProcedure
      .input(z.object({
        amount: z.number(), // Le montant en centimes (ex: 1500 pour 15.00€)
      }))
      .mutation(async ({ input }) => {
        try {
          // 2. Création de l'intention de paiement
          const paymentIntent = await stripe.paymentIntents.create({
            amount: input.amount,
            currency: "eur",
            automatic_payment_methods: {
              enabled: true,
            },
          });

          // 3. Retour du secret au client
          return {
            clientSecret: paymentIntent.client_secret,
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erreur Stripe",
            cause: error,
          });
        }
      }),
  }),
});
```

---

## Étape 5 : Création du Composant de Paiement Frontend

Ce composant utilise les éléments pré-conçus et sécurisés de Stripe pour saisir la carte bleue (`PaymentElement`).

Créez le fichier `client/src/components/CheckoutForm.tsx` :

```tsx
import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "./ui/button"; // Optionnel, adaptez avec vos boutons

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    // Confirmation auprès de Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirection après succès du paiement
        return_url: `${window.location.origin}/paiement-succes`,
      },
    });

    if (error) {
      setErrorMessage(error.message as string);
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Traitement..." : "Payer maintenant"}
      </Button>

      {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
    </form>
  );
}
```

---

## Étape 6 : Intégration dans la page de paiement

Il faut charger la clé publique Stripe (`loadStripe`) et appeler notre routeur TRPC pour initialiser l'intention de paiement.

Exemple dans `client/src/pages/Inscription.tsx` (ou toute page de paiement) :

```tsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { trpc } from "@/lib/trpc";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";

// Chargement unique et synchrone de Stripe au chargement du fichier
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>();
  const createPayment = trpc.payment.createIntent.useMutation();

  const handleStartPayment = async () => {
    try {
      // 15€ = 1500 centimes
      const result = await createPayment.mutateAsync({ amount: 1500 });
      setClientSecret(result.clientSecret);
    } catch (e) {
      console.error("Erreur gérée:", e);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center">Paiement Sécurisé</h2>

      {!clientSecret ? (
        <Button onClick={handleStartPayment} disabled={createPayment.isPending} className="w-full">
          {createPayment.isPending ? "Initialisation..." : "Procéder au paiement (15€)"}
        </Button>
      ) : (
        // Le provider Stripe "Elements" englobe le formulaire
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
```

---

## Étape 7 : Tests avec une carte factice de développement

Lancez votre application en local, cliquez sur "Procéder au paiement" et remplissez le formulaire avec la carte de test Stripe :

- **Numéro de carte :** `4242 4242 4242 4242`
- **Date d'expiration :** `N'importe quelle date valide dans le futur (ex: 12/28)`
- **CVC :** `123`
- **Code Postal :** `75000` ou n'importe quel code local

Vérifiez ensuite le résultat directement dans votre tableau de bord Stripe de Test, rubrique **Paiements**. Vous verrez remonter vos tests (réussis ou déclinés).
