import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Zap } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "L'escalade et les moments partagés sont au cœur de notre association. On grimpe par passion, on se retrouve par plaisir.",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Arktic, c'est avant tout une famille. Que tu sois débutant ou confirmé, tu trouveras ta place parmi nous.",
    },
    {
      icon: Zap,
      title: "Énergie",
      description: "Des sessions intenses, des afterworks fun, des soirées mémorables. On vit chaque moment à fond !",
    },
    {
      icon: Target,
      title: "Accessibilité",
      description: "Pas besoin d'être un pro pour nous rejoindre. On accueille tout le monde avec le sourire et la bonne humeur.",
    },
  ];



  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">À propos d'Arktic</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-semibold italic">
            On est passé à Arkose Montreuil sur le chemin du retour pour se désaltérer. On a vu les gens grimper. Et on est tombé amoureux du spot.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-primary-foreground">Notre Histoire</h2>
            <div className="space-y-4 text-primary-foreground/90 leading-relaxed">
              <p>
                Arktic, c'est l'asso qui sort les profils tech de leur écran pour les envoyer au sommet. On a notre QG chez Arkose, juste à côté de l'école, pour transformer nos sessions de code en sessions de bloc. L'idée est simple : se dépenser, oublier les bugs et briser la glace autour d'un verre ou d'un plat après l'effort.
              </p>
              <p>
                Entre deux grimpes, on squatte la terrasse pour une pétanque ou un ping-pong au soleil. Que tu sois pro de la grimpe ou débutant complet, rejoins-nous pour décompresser hors des cours dans une ambiance 100% détente.
              </p>
              <p>
                Viens nous voir, la magnésie n'attend que toi !
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <value.icon size={28} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-foreground/70">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Envie de nous rejoindre ?</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Que tu sois étudiant à HETIC ou dans une autre école, passionné d'escalade ou simplement curieux, tu es le bienvenu chez Arktic !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/inscription" className="inline-block">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                S'inscrire
              </button>
            </a>
            <a href="/contact" className="inline-block">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Nous contacter
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
