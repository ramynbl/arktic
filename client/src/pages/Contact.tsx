import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé ! On te répond très vite 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "Comment puis-je m'inscrire à un événement ?",
      answer: "C'est simple ! Va sur la page Événements, choisis celui qui te plaît et clique sur 'S'inscrire'. Tu recevras une confirmation par email avec tous les détails.",
    },
    {
      question: "Faut-il avoir de l'expérience en escalade ?",
      answer: "Pas du tout ! Nos événements sont ouverts à tous les niveaux. On organise même des sessions spéciales débutants avec des conseils et un accompagnement personnalisé.",
    },
    {
      question: "Quel est le prix des événements ?",
      answer: "Les prix varient selon l'événement. Pour l'escalade à Arkose, compte environ 15-20€ (entrée + location de chaussons). Les afterworks sont souvent gratuits ou à prix réduit.",
    },
    {
      question: "Dois-je être étudiant à HETIC pour participer ?",
      answer: "Non ! Même si Arktic est basée à HETIC, on accueille tous les étudiants et jeunes professionnels motivés. Plus on est de fous, plus on grimpe !",
    },
    {
      question: "Comment puis-je rejoindre l'équipe organisatrice ?",
      answer: "Tu es motivé pour nous aider à organiser des événements ? Contacte-nous via le formulaire ou sur Instagram, on cherche toujours des personnes passionnées !",
    },
    {
      question: "Y a-t-il un groupe WhatsApp ou Discord ?",
      answer: "Oui ! Une fois inscrit à ton premier événement, tu recevras un lien pour rejoindre notre communauté en ligne où on partage infos, photos et bonne humeur.",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contacte-nous</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Une question ? Une suggestion ? On est là pour toi !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Envoie-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ton nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ton.email@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Dis-nous tout..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-foreground/70">contact@arktic.com</p>
                    <p className="text-sm text-foreground/60 mt-1">
                      On répond sous 24h max !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <MapPin size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Lieu principal</h3>
                    <p className="text-foreground/70">Arkose Montreuil</p>
                    <p className="text-sm text-foreground/60 mt-1">
                      93100 Montreuil
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Réseaux sociaux</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <Instagram size={20} className="text-primary" />
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <Facebook size={20} className="text-primary" />
                    <span className="font-medium">Facebook</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Questions Fréquentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
