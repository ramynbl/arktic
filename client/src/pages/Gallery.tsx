import { useState } from "react";
import { X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { src: "/hero-climbing.jpg", alt: "Session escalade en groupe", category: "Escalade" },
    { src: "/climbing-action.jpg", alt: "Grimpeur en action", category: "Escalade" },
    { src: "/petanque.jpg", alt: "Afterwork pétanque", category: "Afterwork" },
    { src: "/hero-climbing.jpg", alt: "Mur d'escalade coloré", category: "Escalade" },
    { src: "/climbing-action.jpg", alt: "Concentration maximale", category: "Escalade" },
    { src: "/petanque.jpg", alt: "Moment convivial", category: "Afterwork" },
    { src: "/hero-climbing.jpg", alt: "Défi relevé", category: "Escalade" },
    { src: "/climbing-action.jpg", alt: "Session du soir", category: "Escalade" },
    { src: "/petanque.jpg", alt: "Pétanque entre amis", category: "Afterwork" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Galerie Photos</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Revivez nos meilleurs moments en images ! Escalade, afterworks, et bonne humeur garantie.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-white font-semibold">{image.alt}</p>
                  <p className="text-white/80 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 bg-muted/30 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Partage tes photos !</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
            Tu as participé à l'un de nos événements ? Envoie-nous tes meilleures photos sur Instagram avec le hashtag <span className="font-bold text-primary">#ArkticsClimbing</span> pour qu'elles apparaissent dans notre galerie !
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Suivre sur Instagram
            </button>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Image agrandie"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
