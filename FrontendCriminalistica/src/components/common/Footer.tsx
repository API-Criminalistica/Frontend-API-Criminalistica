import { Link } from "react-router-dom"
import { Mail } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "Translator", href: "/" },
    { label: "Tutorial", href: "/" },
    { label: "Dashboard", href: "/" },
    { label: "About", href: "/" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2" aria-label="SilentEcho home">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground font-serif">
                API-Criminalistica
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Plataforma de visualización de datos geoespaciales diseñada para el análisis de seguridad urbana. Nuestra herramienta permite identificar patrones de incidentes y zonas críticas en Bogotá, facilitando el acceso a información estratégica sobre seguridad ciudadana.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@silentecho.ai"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SilentEcho. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with AI for a more inclusive world.
          </p>
        </div>
      </div>
    </footer>
  )
}