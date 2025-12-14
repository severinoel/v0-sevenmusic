"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ChevronUp } from "lucide-react"

interface Section {
  id: string
  title: string
  content: string
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections?: Section[]
  children?: ReactNode
}

export function LegalPageLayout({ title, lastUpdated, sections, children }: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)

      if (sections) {
        const sectionElements = sections.map((s) => ({
          id: s.id,
          element: document.getElementById(s.id),
        }))

        for (const { id, element } of sectionElements.reverse()) {
          if (element && element.getBoundingClientRect().top <= 100) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // If children are provided, render simple layout
  if (children) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            <FileText className="w-3 h-3 mr-1" />
            Document légal
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:text-foreground [&_p]:text-muted-foreground [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:underline">
          {children}
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
        )}
      </div>
    )
  }

  // Original sections-based layout
  if (!sections) return null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
          <FileText className="w-3 h-3 mr-1" />
          Document légal
        </Badge>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Table of contents - sticky sidebar */}
        <aside className="hidden lg:block">
          <Card className="sticky top-24">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 text-foreground">Sommaire</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                <div
                  className="text-muted-foreground space-y-4 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:underline [&_table]:w-full [&_th]:text-left [&_th]:py-2 [&_th]:text-foreground [&_td]:py-2 [&_td]:text-muted-foreground [&_tr]:border-b [&_tr]:border-border"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
