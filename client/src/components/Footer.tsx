import { Link } from "wouter";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 text-foreground border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Arktic</h3>
            <p className="text-muted-foreground text-sm">
              L'association étudiante qui te fait grimper et kiffer ! Escalade, afterworks et bonne ambiance garantie.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                À propos
              </Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Galerie
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="font-bold text-lg mb-4">Nous suivre</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/athlhetic?igsh=MTRxM2x4M3hnM2RzcA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Arktic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
