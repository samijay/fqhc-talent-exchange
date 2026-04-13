// KnowledgeGraph — Interactive concentric ring visualization of site content
// Shows how all content areas connect: Strategy → Intelligence → Tools → Data
// Pure Tailwind CSS + React (no D3 or charting library)
// Responsive: ring visual on desktop, structured list on mobile
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Target,
  FileText,
  ShieldCheck,
  Scale,
  Landmark,
  Heart,
  GraduationCap,
  Newspaper,
  AlertTriangle,
  Cpu,
  MapPin,
  DollarSign,
  TrendingDown,
  FileEdit,
  ClipboardCheck,
  Route,
  Award,
  FolderOpen,
  MessageSquare,
  BookOpenCheck,
  Calculator,
  Database,
  Briefcase,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GraphNode {
  id: string;
  label: { en: string; es: string };
  href: string;
  description: { en: string; es: string };
  stat?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface GraphRing {
  id: string;
  label: { en: string; es: string };
  color: {
    bg: string;
    border: string;
    text: string;
    dot: string;
    hoverBg: string;
    hoverBorder: string;
    lightBg: string;
  };
  nodes: GraphNode[];
}

/* ------------------------------------------------------------------ */
/*  Ring definitions                                                    */
/* ------------------------------------------------------------------ */

const RINGS: GraphRing[] = [
  {
    id: "strategy",
    label: { en: "Strategy", es: "Estrategia" },
    color: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-700",
      dot: "bg-teal-500",
      hoverBg: "hover:bg-teal-100",
      hoverBorder: "hover:border-teal-400",
      lightBg: "bg-teal-100",
    },
    nodes: [
      {
        id: "guides",
        label: { en: "Executive Guides", es: "Guias Ejecutivas" },
        href: "/strategy/guides",
        description: {
          en: "Real FQHC case studies with Rumelt framework analysis",
          es: "Casos reales de FQHCs con analisis del marco Rumelt",
        },
        stat: "22 case studies",
        icon: BookOpen,
      },
      {
        id: "okrs",
        label: { en: "OKR Templates", es: "Plantillas OKR" },
        href: "/strategy/okrs",
        description: {
          en: "Crisis change management templates with Excel export",
          es: "Plantillas de gestion de cambios con exportacion a Excel",
        },
        stat: "25 templates",
        icon: Target,
      },
      {
        id: "case-studies",
        label: { en: "Case Studies", es: "Casos de Estudio" },
        href: "/strategy/case-studies",
        description: {
          en: "Compact index of FQHC transformation outcomes",
          es: "Indice compacto de resultados de transformacion FQHC",
        },
        icon: FileText,
      },
      {
        id: "resilience",
        label: { en: "Resilience Scorecard", es: "Puntaje de Resiliencia" },
        href: "/strategy/resilience",
        description: {
          en: "220 FQHCs scored across 5 dimensions",
          es: "220 FQHCs evaluados en 5 dimensiones",
        },
        stat: "220 scored",
        icon: ShieldCheck,
      },
      {
        id: "scope",
        label: { en: "Scope of Practice", es: "Alcance de Practica" },
        href: "/strategy/scope-of-practice",
        description: {
          en: "CA delegation matrix for 10 FQHC roles with BPC citations",
          es: "Matriz de delegacion CA para 10 roles FQHC",
        },
        icon: Scale,
      },
      {
        id: "movement",
        label: { en: "The Movement", es: "El Movimiento" },
        href: "/strategy/movement",
        description: {
          en: "FQHC movement history 1960-2026 with cross-cultural alliances",
          es: "Historia del movimiento FQHC 1960-2026",
        },
        stat: "30 events",
        icon: Landmark,
      },
      {
        id: "cultural",
        label: { en: "Cultural Humility", es: "Humildad Cultural" },
        href: "/strategy/cultural-humility",
        description: {
          en: "CLAS Standards, 20 competencies, workforce diversity scenarios",
          es: "Estandares CLAS, 20 competencias, escenarios de diversidad",
        },
        icon: Heart,
      },
      {
        id: "masterclass",
        label: { en: "Masterclass", es: "Masterclass" },
        href: "/strategy/masterclass",
        description: {
          en: "15 deep-dive strategy modules for the 2026 crisis",
          es: "15 modulos de estrategia para la crisis 2026",
        },
        stat: "18 modules",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "intelligence",
    label: { en: "Intelligence", es: "Inteligencia" },
    color: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      dot: "bg-amber-500",
      hoverBg: "hover:bg-amber-100",
      hoverBorder: "hover:border-amber-400",
      lightBg: "bg-amber-100",
    },
    nodes: [
      {
        id: "intel-feed",
        label: { en: "Intel Feed", es: "Feed de Inteligencia" },
        href: "/",
        description: {
          en: "Breaking intelligence from primary sources, updated weekly",
          es: "Inteligencia de fuentes primarias, actualizada semanalmente",
        },
        stat: "130+ items",
        icon: Newspaper,
      },
      {
        id: "layoffs",
        label: { en: "Layoff Tracker", es: "Rastreador de Despidos" },
        href: "/layoffs",
        description: {
          en: "CA FQHC workforce reductions from WARN Act filings",
          es: "Reducciones de fuerza laboral FQHC de reportes WARN Act",
        },
        stat: "3,477+ workers",
        icon: AlertTriangle,
      },
      {
        id: "ai-tracker",
        label: { en: "AI Tracker", es: "Rastreador de IA" },
        href: "/ai-tracker",
        description: {
          en: "AI adoption monitoring: ambient scribes, RCM, vendor comparison",
          es: "Monitoreo de adopcion de IA: escribas, RCM, comparacion",
        },
        stat: "19 items",
        icon: Cpu,
      },
      {
        id: "regional",
        label: { en: "Regional Intel", es: "Inteligencia Regional" },
        href: "/intelligence/los-angeles",
        description: {
          en: "Per-region FQHC dashboards across 9 CA regions",
          es: "Paneles FQHC por region en 9 regiones de CA",
        },
        stat: "9 regions",
        icon: MapPin,
      },
      {
        id: "salary",
        label: { en: "Salary Data", es: "Datos Salariales" },
        href: "/salary-data",
        description: {
          en: "P25/P50/P75 benchmarks for 46 roles across 9 regions",
          es: "Benchmarks P25/P50/P75 para 46 roles en 9 regiones",
        },
        stat: "46 roles",
        icon: DollarSign,
      },
      {
        id: "funding",
        label: { en: "Funding Impact", es: "Impacto Financiero" },
        href: "/funding-impact",
        description: {
          en: "H.R. 1 policy timeline, revenue strategies, funding cliffs",
          es: "Cronologia de H.R. 1, estrategias de ingresos",
        },
        icon: TrendingDown,
      },
    ],
  },
  {
    id: "tools",
    label: { en: "Tools", es: "Herramientas" },
    color: {
      bg: "bg-stone-50",
      border: "border-stone-200",
      text: "text-stone-700",
      dot: "bg-stone-500",
      hoverBg: "hover:bg-stone-100",
      hoverBorder: "hover:border-stone-400",
      lightBg: "bg-stone-200",
    },
    nodes: [
      {
        id: "resume",
        label: { en: "Resume Builder", es: "Constructor de CV" },
        href: "/resume-builder",
        description: {
          en: "8 FQHC-specific templates with PDF export",
          es: "8 plantillas especificas de FQHC con exportacion PDF",
        },
        icon: FileEdit,
      },
      {
        id: "assessment",
        label: { en: "Career Assessment", es: "Evaluacion de Carrera" },
        href: "/career-insights",
        description: {
          en: "5-domain behavioral assessment with 90-day plan",
          es: "Evaluacion conductual de 5 dominios con plan de 90 dias",
        },
        icon: ClipboardCheck,
      },
      {
        id: "roadmap",
        label: { en: "Career Roadmap", es: "Mapa de Carrera" },
        href: "/career-roadmap",
        description: {
          en: "5 tracks, 4 levels, CA salary data with regional multipliers",
          es: "5 pistas, 4 niveles, datos salariales de CA",
        },
        icon: Route,
      },
      {
        id: "certs",
        label: { en: "Certifications", es: "Certificaciones" },
        href: "/certifications",
        description: {
          en: "20 CA-specific certifications with cost and salary impact",
          es: "20 certificaciones de CA con costo e impacto salarial",
        },
        stat: "20 certs",
        icon: Award,
      },
      {
        id: "resources",
        label: { en: "Resources", es: "Recursos" },
        href: "/resources",
        description: {
          en: "18 free/low-cost programs for FQHC professionals",
          es: "18 programas gratuitos para profesionales de FQHC",
        },
        icon: FolderOpen,
      },
      {
        id: "interview",
        label: { en: "Interview Prep", es: "Preparacion Entrevista" },
        href: "/interview-prep",
        description: {
          en: "STAR framework questions and role-specific guidance",
          es: "Preguntas STAR y guia especifica por rol",
        },
        icon: MessageSquare,
      },
      {
        id: "guides",
        label: { en: "Workplace Guides", es: "Guias Laborales" },
        href: "/guides",
        description: {
          en: "9 operational how-to guides for FQHC workflows",
          es: "9 guias operativas para flujos de trabajo FQHC",
        },
        stat: "13 guides",
        icon: BookOpenCheck,
      },
      {
        id: "compare",
        label: { en: "Compare FQHCs", es: "Comparar FQHCs" },
        href: "/compare",
        description: {
          en: "Side-by-side comparison of 2-3 organizations",
          es: "Comparacion lado a lado de 2-3 organizaciones",
        },
        icon: Calculator,
      },
    ],
  },
  {
    id: "data",
    label: { en: "Data", es: "Datos" },
    color: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      dot: "bg-blue-500",
      hoverBg: "hover:bg-blue-100",
      hoverBorder: "hover:border-blue-400",
      lightBg: "bg-blue-100",
    },
    nodes: [
      {
        id: "fqhcs",
        label: { en: "FQHC Directory", es: "Directorio FQHC" },
        href: "/directory",
        description: {
          en: "California FQHC profiles with programs, EHR, Glassdoor, resilience",
          es: "Perfiles FQHC de California con programas, EHR, Glassdoor",
        },
        stat: "220 FQHCs",
        icon: Database,
      },
      {
        id: "jobs",
        label: { en: "Job Listings", es: "Ofertas de Empleo" },
        href: "/jobs",
        description: {
          en: "Open positions across 30+ FQHCs with salary data",
          es: "Posiciones abiertas en 30+ FQHCs con datos salariales",
        },
        stat: "1,000+ jobs",
        icon: Briefcase,
      },
      {
        id: "intel-items",
        label: { en: "Intel Items", es: "Items de Inteligencia" },
        href: "/",
        description: {
          en: "Curated intelligence from primary sources across 8 categories",
          es: "Inteligencia curada de fuentes primarias en 8 categorias",
        },
        stat: "130+ items",
        icon: Lightbulb,
      },
      {
        id: "case-data",
        label: { en: "Case Studies", es: "Casos de Estudio" },
        href: "/strategy/case-studies",
        description: {
          en: "Real FQHC transformation stories with verified outcomes",
          es: "Historias reales de transformacion FQHC con resultados verificados",
        },
        stat: "22 studies",
        icon: FileText,
      },
      {
        id: "research",
        label: { en: "Research Archive", es: "Archivo de Investigacion" },
        href: "/strategy/research",
        description: {
          en: "Academic research across 27 domains with curriculum tracks",
          es: "Investigacion academica en 27 dominios con pistas curriculares",
        },
        stat: "66 entries",
        icon: Users,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  Ring Node (desktop visual)                                         */
/* ------------------------------------------------------------------ */

function RingNode({
  node,
  ring,
  locale,
  isHovered,
  onHover,
  onLeave,
}: {
  node: GraphNode;
  ring: GraphRing;
  locale: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = node.icon;
  return (
    <Link
      href={node.href}
      className={`group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${ring.color.bg} ${ring.color.border} ${ring.color.text} ${ring.color.hoverBg} ${ring.color.hoverBorder} ${isHovered ? "shadow-md scale-105 z-10" : "hover:shadow-sm"}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Icon className="size-3.5 flex-shrink-0" />
      <span className="whitespace-nowrap text-xs sm:text-sm">
        {t(node.label, locale)}
      </span>
      {node.stat && (
        <span className={`ml-1 hidden sm:inline rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${ring.color.lightBg} ${ring.color.text}`}>
          {node.stat}
        </span>
      )}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Tooltip                                                            */
/* ------------------------------------------------------------------ */

function NodeTooltip({
  node,
  ring,
  locale,
}: {
  node: GraphNode;
  ring: GraphRing;
  locale: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none sm:relative sm:inset-auto sm:bottom-auto">
      <div className="mx-auto max-w-sm rounded-xl border border-stone-200 bg-white p-4 shadow-xl sm:absolute sm:-top-2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-full">
        <div className="flex items-center gap-2 mb-2">
          <div className={`size-2 rounded-full ${ring.color.dot}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${ring.color.text}`}>
            {t(ring.label, locale)}
          </span>
        </div>
        <p className="text-sm font-semibold text-stone-900 mb-1">
          {t(node.label, locale)}
        </p>
        <p className="text-xs text-stone-500 leading-relaxed">
          {t(node.description, locale)}
        </p>
        {node.stat && (
          <p className={`mt-2 text-xs font-bold ${ring.color.text}`}>
            {node.stat}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop ring layout                                                */
/* ------------------------------------------------------------------ */

function DesktopRingView({ locale }: { locale: string }) {
  const [hoveredNode, setHoveredNode] = useState<{
    ringId: string;
    nodeId: string;
  } | null>(null);

  const hoveredItem = hoveredNode
    ? (() => {
        const ring = RINGS.find((r) => r.id === hoveredNode.ringId);
        const node = ring?.nodes.find((n) => n.id === hoveredNode.nodeId);
        return ring && node ? { ring, node } : null;
      })()
    : null;

  return (
    <div className="relative">
      {/* Rings — concentric layout */}
      <div className="flex flex-col items-center gap-6">
        {/* Center node */}
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-gradient-to-br from-teal-700 to-teal-900 px-6 py-3 text-white font-bold text-sm shadow-lg">
            FQHC Talent Exchange
          </div>
        </div>

        {/* Each ring */}
        {RINGS.map((ring) => (
          <div key={ring.id} className="w-full">
            {/* Ring label */}
            <div className="flex items-center gap-2 mb-3 justify-center">
              <div className={`size-2.5 rounded-full ${ring.color.dot}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${ring.color.text}`}>
                {t(ring.label, locale)}
              </span>
              <div className={`h-px flex-1 max-w-16 ${ring.color.border} border-t`} />
            </div>

            {/* Nodes */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {ring.nodes.map((node) => (
                <RingNode
                  key={node.id}
                  node={node}
                  ring={ring}
                  locale={locale}
                  isHovered={
                    hoveredNode?.ringId === ring.id &&
                    hoveredNode?.nodeId === node.id
                  }
                  onHover={() =>
                    setHoveredNode({ ringId: ring.id, nodeId: node.id })
                  }
                  onLeave={() => setHoveredNode(null)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip overlay */}
      {hoveredItem && (
        <div className="hidden sm:block absolute top-4 right-4 w-64 z-20">
          <NodeTooltip
            node={hoveredItem.node}
            ring={hoveredItem.ring}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile structured list                                             */
/* ------------------------------------------------------------------ */

function MobileListView({ locale }: { locale: string }) {
  return (
    <div className="space-y-6">
      {RINGS.map((ring) => (
        <div key={ring.id}>
          {/* Ring header */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`size-3 rounded-full ${ring.color.dot}`} />
            <h3 className={`text-sm font-bold uppercase tracking-wider ${ring.color.text}`}>
              {t(ring.label, locale)}
            </h3>
          </div>

          {/* Node list */}
          <div className="space-y-2">
            {ring.nodes.map((node) => {
              const Icon = node.icon;
              return (
                <Link
                  key={node.id}
                  href={node.href}
                  className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${ring.color.bg} ${ring.color.border} ${ring.color.hoverBg}`}
                >
                  <div className={`flex-shrink-0 size-8 rounded-lg ${ring.color.lightBg} flex items-center justify-center`}>
                    <Icon className={`size-4 ${ring.color.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-stone-900">
                        {t(node.label, locale)}
                      </p>
                      {node.stat && (
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${ring.color.lightBg} ${ring.color.text}`}>
                          {node.stat}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                      {t(node.description, locale)}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-stone-400 flex-shrink-0 mt-2" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function KnowledgeGraph() {
  const locale = useLocale();
  const isEs = locale === "es";

  const totalNodes = RINGS.reduce((sum, r) => sum + r.nodes.length, 0);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
          {isEs
            ? "Grafico de Conocimiento Interactivo"
            : "Interactive Knowledge Graph"}
        </h3>
        <p className="text-sm text-stone-500 max-w-xl mx-auto">
          {isEs
            ? `${totalNodes} paginas de contenido organizadas en 4 capas concentricas. Haz clic en cualquier nodo para explorar.`
            : `${totalNodes} content pages organized in 4 concentric layers. Click any node to explore.`}
        </p>
      </div>

      {/* Ring legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {RINGS.map((ring) => (
          <div key={ring.id} className="flex items-center gap-1.5">
            <div className={`size-2.5 rounded-full ${ring.color.dot}`} />
            <span className="text-xs font-medium text-stone-600">
              {t(ring.label, locale)} ({ring.nodes.length})
            </span>
          </div>
        ))}
      </div>

      {/* Desktop: ring visual */}
      <div className="hidden md:block">
        <DesktopRingView locale={locale} />
      </div>

      {/* Mobile: structured list */}
      <div className="md:hidden">
        <MobileListView locale={locale} />
      </div>
    </div>
  );
}
