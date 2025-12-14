"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  UserPlus,
  FileText,
  AlertTriangle,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  Eye,
  Mail,
  TrendingDown,
  Briefcase,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { label: "Professeurs actifs", value: "234", change: "+8", icon: Users, color: "text-blue-500" },
  { label: "En attente", value: "12", change: "+3", icon: UserPlus, color: "text-amber-500" },
  { label: "Turnover", value: "4.2%", change: "-0.8%", positive: true, icon: TrendingDown, color: "text-green-500" },
  { label: "Charge horaire moy.", value: "18.5h", change: "+1.2h", icon: Clock, color: "text-purple-500" },
]

const contractsToRenew = [
  { id: 1, name: "Prof. Martin", type: "CDI", endDate: "2024-02-15", daysLeft: 28, status: "urgent" },
  { id: 2, name: "Prof. Dubois", type: "CDD", endDate: "2024-02-28", daysLeft: 41, status: "warning" },
  { id: 3, name: "Prof. Bernard", type: "Freelance", endDate: "2024-03-15", daysLeft: 57, status: "ok" },
]

const pendingApplications = [
  {
    id: 1,
    name: "Marie Dupont",
    instrument: "Piano",
    experience: "8 ans",
    status: "evaluation_technique",
    score: 85,
    submittedAt: "2024-01-15",
    step: 2,
  },
  {
    id: 2,
    name: "Jean Martin",
    instrument: "Guitare",
    experience: "12 ans",
    status: "entretien_rh",
    score: 92,
    submittedAt: "2024-01-14",
    step: 3,
  },
  {
    id: 3,
    name: "Sophie Bernard",
    instrument: "Violon",
    experience: "15 ans",
    status: "pre_selection",
    score: null,
    submittedAt: "2024-01-16",
    step: 1,
  },
]

const upcomingInterviews = [
  { name: "Jean Martin", date: "2024-01-18", time: "14:00", type: "Entretien RH" },
  { name: "Lucas Petit", date: "2024-01-19", time: "10:30", type: "Évaluation technique" },
  { name: "Emma Roux", date: "2024-01-19", time: "15:00", type: "Entretien RH" },
]

const missingDocuments = [
  { prof: "Prof. Lefebvre", documents: ["Attestation URSSAF", "RIB mis à jour"], urgency: "high" },
  { prof: "Prof. Simon", documents: ["Certificat de formation"], urgency: "medium" },
  { prof: "Prof. Moreau", documents: ["Diplôme certifié"], urgency: "low" },
]

export function RGHDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-blue-500/10 via-background to-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Responsable Gestion Humaine</h1>
                <p className="text-muted-foreground">Recrutement et gestion des professeurs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4" />
                Nouveau recrutement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p
                      className={`text-sm mt-1 ${stat.positive || (stat.change.startsWith("-") && stat.label === "Turnover") ? "text-green-500" : stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.change} ce mois
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="data-[state=active]:bg-background">
              Recrutement
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-background">
              Contrats
            </TabsTrigger>
            <TabsTrigger value="payroll" className="data-[state=active]:bg-background">
              Paie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Candidatures en cours */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Pipeline de recrutement</CardTitle>
                    <CardDescription>Candidatures en cours de traitement</CardDescription>
                  </div>
                  <Badge variant="secondary">{pendingApplications.length} actifs</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApplications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {app.instrument} • {app.experience}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {app.score && (
                              <Badge variant="outline" className="text-green-500 border-green-500/30">
                                {app.score}/100
                              </Badge>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                  <Eye className="w-4 h-4" /> Voir dossier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Calendar className="w-4 h-4" /> Planifier entretien
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Mail className="w-4 h-4" /> Envoyer email
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {/* Progress steps */}
                        <div className="flex items-center gap-2">
                          {[
                            { step: 1, label: "Pré-sélection" },
                            { step: 2, label: "Éval. technique" },
                            { step: 3, label: "Entretien RH" },
                            { step: 4, label: "Validation" },
                          ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2 flex-1">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                  app.step > s.step
                                    ? "bg-green-500 text-white"
                                    : app.step === s.step
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-muted-foreground"
                                }`}
                              >
                                {app.step > s.step ? <CheckCircle className="w-4 h-4" /> : s.step}
                              </div>
                              {i < 3 && (
                                <div className={`flex-1 h-1 ${app.step > s.step ? "bg-green-500" : "bg-secondary"}`} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Entretiens à venir */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Entretiens à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{interview.name}</p>
                          <p className="text-xs text-muted-foreground">{interview.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{interview.time}</p>
                          <p className="text-xs text-muted-foreground">{interview.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contrats et Documents */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Contrats à renouveler */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Contrats à renouveler (J-30)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contractsToRenew.map((contract) => (
                      <div
                        key={contract.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          contract.status === "urgent"
                            ? "bg-red-500/10 border-red-500/30"
                            : contract.status === "warning"
                              ? "bg-amber-500/10 border-amber-500/30"
                              : "bg-secondary/30 border-border"
                        }`}
                      >
                        <div>
                          <p className="font-medium">{contract.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {contract.type} • Fin: {contract.endDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={contract.status === "urgent" ? "destructive" : "secondary"}>
                            J-{contract.daysLeft}
                          </Badge>
                          <Button size="sm">Renouveler</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Documents manquants */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Documents manquants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {missingDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          doc.urgency === "high"
                            ? "bg-red-500/10 border-red-500/30"
                            : doc.urgency === "medium"
                              ? "bg-amber-500/10 border-amber-500/30"
                              : "bg-secondary/30 border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{doc.prof}</p>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Mail className="w-4 h-4" />
                            Relancer
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doc.documents.map((d, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recruitment" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Toutes les candidatures</CardTitle>
                <CardDescription>Gérez le processus de recrutement complet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Rechercher un candidat..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Filtrer
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead>Expérience</TableHead>
                      <TableHead>Étape</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ...pendingApplications,
                      {
                        id: 4,
                        name: "Lucas Petit",
                        instrument: "Batterie",
                        experience: "6 ans",
                        status: "accepted",
                        score: 88,
                        submittedAt: "2024-01-10",
                        step: 4,
                      },
                      {
                        id: 5,
                        name: "Emma Roux",
                        instrument: "Chant",
                        experience: "10 ans",
                        status: "refused",
                        score: 54,
                        submittedAt: "2024-01-08",
                        step: 2,
                      },
                    ].map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{app.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{app.instrument}</TableCell>
                        <TableCell>{app.experience}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              app.status === "accepted"
                                ? "default"
                                : app.status === "refused"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {app.status === "pre_selection"
                              ? "Pré-sélection"
                              : app.status === "evaluation_technique"
                                ? "Éval. technique"
                                : app.status === "entretien_rh"
                                  ? "Entretien RH"
                                  : app.status === "accepted"
                                    ? "Accepté"
                                    : "Refusé"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {app.score ? (
                            <span
                              className={
                                app.score >= 75 ? "text-green-500" : app.score >= 60 ? "text-amber-500" : "text-red-500"
                              }
                            >
                              {app.score}/100
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{app.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Gestion des contrats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interface de gestion des contrats en développement...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Gestion de la paie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interface de gestion de la paie en développement...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
