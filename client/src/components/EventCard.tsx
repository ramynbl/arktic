import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "wouter";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  image: string;
  category: "escalade" | "petanque" | "pingpong" | "bar";
}

const categoryColors = {
  escalade: "bg-primary/15 text-primary",
  petanque: "bg-secondary/15 text-secondary",
  pingpong: "bg-accent/15 text-accent",
  bar: "bg-primary/15 text-primary",
};

const categoryLabels = {
  escalade: "Escalade",
  petanque: "Pétanque",
  pingpong: "Ping-Pong",
  bar: "Bar",
};

export default function EventCard({
  title,
  date,
  location,
  participants,
  maxParticipants,
  image,
  category,
}: EventCardProps) {
  const spotsLeft = maxParticipants - participants;
  const isAlmostFull = spotsLeft <= 5;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category]}`}>
          {categoryLabels[category]}
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Users size={16} />
          <span>
            {participants}/{maxParticipants} participants
            {isAlmostFull && <span className="text-secondary ml-2 font-semibold">• Plus que {spotsLeft} places !</span>}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href="/inscription" className="w-full">
          <Button className="w-full" disabled={spotsLeft === 0}>
            {spotsLeft === 0 ? "Complet" : "S'inscrire"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
