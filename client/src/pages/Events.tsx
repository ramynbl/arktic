import { useState } from "react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

type EventCategory = "all" | "escalade" | "petanque" | "pingpong" | "bar";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("all");

  const nextEvent = {
    title: "Session Escalade Arkose",
    date: "Vendredi 22 Nov, 18h30",
    location: "Arkose Ivry",
    participants: 8,
    maxParticipants: 15,
    image: "/climbing-action.jpg",
    category: "escalade" as const,
  };

  const allEvents = [nextEvent];
  const filteredEvents =
    selectedCategory === "all"
      ? allEvents
      : allEvents.filter((e) => e.category === selectedCategory);

  const categories = [
    { id: "all" as const, label: "Tous" },
    { id: "escalade" as const, label: "Escalade" },
    { id: "petanque" as const, label: "Pétanque" },
    { id: "pingpong" as const, label: "Ping-Pong" },
    { id: "bar" as const, label: "Bar" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos Événements</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Découvre tous nos événements à venir et inscris-toi pour vivre des moments inoubliables !
          </p>
        </div>



        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/60">
              Aucun événement dans cette catégorie pour le moment.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-20 bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-center text-primary-foreground">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-foreground">Choisis ton événement</h3>
              <p className="text-primary-foreground/90 text-sm">
                Parcours nos événements et trouve celui qui te correspond
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-foreground">Inscris-toi</h3>
              <p className="text-primary-foreground/90 text-sm">
                Clique sur "S'inscrire" et remplis le formulaire rapide
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-foreground">Viens kiffer !</h3>
              <p className="text-primary-foreground/90 text-sm">
                Rejoins-nous le jour J et profite de l'expérience Arktic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
