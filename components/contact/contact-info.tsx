import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Clock, MessageCircle, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "wendpayangdeseverinbouda@gmail.com",
    href: "mailto:wendpayangdeseverinbouda@gmail.com",
    description: "Réponse sous 24-48h",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+226 66 64 00 77",
    href: "tel:+22666640077",
    description: "Lun-Ven, 9h-18h GMT",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+226 66 64 00 77",
    href: "https://wa.me/22666640077",
    description: "Support rapide",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informations de contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <method.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{method.title}</p>
                <p className="text-sm text-primary break-all">{method.value}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </a>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Horaires de support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Lundi - Vendredi:</span> 9h00 - 18h00 GMT
              </p>
              <p>
                <span className="font-medium">Samedi:</span> 10h00 - 14h00 GMT
              </p>
              <p>
                <span className="font-medium">Dimanche:</span> Fermé
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Headphones className="w-8 h-8 text-primary" />
            <div>
              <p className="font-medium text-foreground">Support Premium</p>
              <p className="text-sm text-muted-foreground">Abonnés Pro & Studio : support prioritaire 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
