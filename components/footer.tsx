import Link from "next/link"
import { Music, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from "lucide-react"

const footerLinks = {
  plateforme: [
    { name: "École de musique", href: "/ecole" },
    { name: "Réseau social", href: "/social" },
    { name: "Pédale d'effets", href: "/effets" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Cloud collaboratif", href: "/cloud" },
    { name: "AI Studio", href: "/studio" },
    { name: "AI Composer", href: "/composer" },
  ],
  ressources: [
    { name: "Practice Analytics", href: "/practice" },
    { name: "Gamification", href: "/gamification" },
    { name: "Boutique Coins", href: "/boutique" },
    { name: "Kids Academy", href: "/kids" },
    { name: "Expériences VR", href: "/vr" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Conditions d'utilisation", href: "/cgu" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
    { name: "Politique des cookies", href: "/cookies" },
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Règles communautaires", href: "/regles" },
  ],
  entreprise: [
    { name: "À propos", href: "/a-propos" },
    { name: "Carrières", href: "/carrieres" },
    { name: "Presse", href: "/presse" },
    { name: "Partenaires", href: "/partenaires" },
    { name: "Contact", href: "/contact" },
    { name: "Devenir professeur", href: "/professeur/candidature" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/severinoel" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/severinoel" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/severinoel" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/severinoel" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/severinoel" },
  { name: "GitHub", icon: Github, href: "https://github.com/severinoel" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Séverino<span className="text-primary">El</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              L'écosystème musical complet pour apprendre, créer et partager votre passion.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Plateforme</h3>
            <ul className="space-y-2">
              {footerLinks.plateforme.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Ressources</h3>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:wendpayangdeseverinbouda@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="break-all">wendpayangdeseverinbouda@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+22666640077"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +226 66 64 00 77
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                Burkina Faso
              </li>
            </ul>

            {/* Entreprise links */}
            <h3 className="font-semibold text-foreground mb-3 mt-6">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Séverino El. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">Fait avec passion pour les musiciens du monde entier</p>
        </div>
      </div>
    </footer>
  )
}
