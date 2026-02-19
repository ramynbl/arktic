import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import Inscription from "./Inscription";
import { trpc } from "@/lib/trpc";

export default function Home() {

  // Récupérer le nombre d'inscriptions
  const { data: inscriptionCount = 0 } = trpc.inscriptions.count.useQuery({
    eventId: "prochain-event",
  });

  const maxPlaces = 15;
  const remainingPlaces = Math.max(0, maxPlaces - (inscriptionCount as number));
  const occupancyPercentage = ((inscriptionCount as number) / maxPlaces) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-climbing.jpg"
            alt="Escalade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up leading-tight">
              Code, Climb,<br /><span className="text-primary">Chill</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in-up animation-delay-200">
              L'association étudiante qui te fait vivre des expériences inoubliables entre escalade et afterworks fun !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Link href="/inscription">
                <Button size="lg" className="text-lg px-8 rounded-full">
                  S'inscrire
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 rounded-full hover:border-primary hover:text-white hover:border-blue-800 transition-colors">
                  Découvrir Arktic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Banner Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Event Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                  Session Escalade Arkose
                </h2>
                <p className="text-xl text-foreground/70 mb-6">
                  Rejoins-nous pour une session d'escalade inoubliable à Arkose Montreuil ! Que tu sois débutant ou confirmé,
                  nos moniteurs expérimentés seront là pour te guider et te faire progresser dans une ambiance conviviale et fun.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lieu</p>
                    <p className="text-foreground/70">Arkose Montreuil, 93100 Montreuil</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">🕐</span>
                  </div>
                  <div>
                    <p className="font-semibold">Horaire</p>
                    <p className="text-foreground/70">!! PROCHAIN EVENT TRÈS BIENTÔT !!<br></br>Vous pouvez vous inscrire dès maintenant sur le site ! <br />Vous serez notifier par mail du prochain event.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">👥</span>
                  </div>
                  <div>
                    <p className="font-semibold">Places disponibles</p>
                    <p className="text-foreground/70">{remainingPlaces} / {maxPlaces} places</p>
                  </div>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Taux d'occupation</p>
                  <p className="text-sm text-foreground/70">{Math.round(occupancyPercentage)}%</p>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Event Image */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/climbing-action.jpg"
                  alt="Session Escalade Arkose"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-semibold opacity-90">Arkose Montreuil</p>
                  <p className="text-2xl font-bold">Grimpe & Partage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider className="bg-primary" />

      {/* Inscription Section */}
      <section id="inscription" className="py-20 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Rejoins-nous !</h2>
              <p className="text-xl text-foreground/70">
                Inscris-toi maintenant pour sécuriser ta place à la prochaine session
              </p>
            </div>
            <Inscription />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Que tu sois débutant ou grimpeur confirmé, Arktic t'accueille les bras ouverts. Viens partager ta passion avec nous !
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
