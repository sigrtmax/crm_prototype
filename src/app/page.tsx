"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import {
  ActivityIcon,
  BellIcon,
  Loader2Icon,
  MessageCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"

import type { Project, ProjectSummary } from "@/data/mockProjects"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ProjectDetails } from "@/components/dashboard/project-details"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetcher } from "@/lib/fetcher"

type ProjectsResponse = {
  projects: ProjectSummary[]
  generatedAt: string
}

type ProjectResponse = {
  project: Project
  generatedAt: string
}

export default function DashboardPage() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const { data: projectsData, isLoading: projectsLoading } = useSWR<ProjectsResponse>("/api/projects", fetcher)

  const resolvedActiveProjectId = useMemo(() => {
    if (activeProjectId) {
      return activeProjectId
    }

    if (projectsData?.projects.length) {
      return projectsData.projects[0].id
    }

    return null
  }, [activeProjectId, projectsData])

  const { data: projectDetail, isLoading: projectLoading } = useSWR<ProjectResponse>(
    resolvedActiveProjectId ? `/api/projects/${resolvedActiveProjectId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (!activeProjectId && projectsData?.projects.length) {
      setActiveProjectId(projectsData.projects[0].id)
    }
  }, [activeProjectId, projectsData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-100 px-4 py-10 text-foreground sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <HeroPanel />

        <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <ScrollArea className="max-w-full rounded-3xl border border-border/60 bg-white p-4 shadow-lg">
            <header className="flex items-center justify-between gap-3 px-2 pb-3">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Проекты клиента</p>
                <p className="text-lg font-semibold">Дашборд портфеля</p>
              </div>
              <Badge variant="secondary" className="border-transparent text-xs uppercase">
                MVP scope
              </Badge>
            </header>
            <div className="space-y-4">
              {projectsLoading ? (
                <ProjectListSkeleton />
              ) : (
                projectsData?.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setActiveProjectId}
                    active={project.id === resolvedActiveProjectId}
                    index={projectsData.projects.indexOf(project)}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          <div className="space-y-6">
            {projectLoading && (
              <Card className="flex h-32 items-center justify-center border-border/60 text-muted-foreground">
                <Loader2Icon className="size-5 animate-spin" />
                <span className="ml-2 text-sm">Загружаем детали проекта…</span>
              </Card>
            )}
            {projectDetail?.project ? <ProjectDetails project={projectDetail.project} /> : null}
            <SpecificationHighlights />
          </div>
        </section>
      </div>
      <ChatWidget />
    </div>
  )
}

function HeroPanel() {
  return (
    <section className="max-w-full rounded-3xl border border-border/60 bg-white/90 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-dashed border-primary/60 text-primary">
              Клиентский кабинет · PWA
            </Badge>
            <Badge variant="secondary" className="border-transparent bg-emerald-100 text-emerald-800">
              Моки API
            </Badge>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Мониторинг проектов, Kanban, чат и версионность ТЗ в одном окне
          </h1>
          <p className="text-base text-muted-foreground">
            Прототип повторяет ключевые требования спецификации: дашборд проектов, подробные страницы
            с Kanban-доской, журналом изменений, встроенными чатами и уведомлениями, а также поддержку
            адаптивного PWA-интерфейса с push-оповещениями.
          </p>
        </div>
        <div className="grid flex-shrink-0 gap-3 sm:grid-cols-2">
          <HeroStat
            icon={<ShieldCheckIcon className="size-4" />}
            label="Безопасный доступ"
            value="Роли и подтверждение админа"
          />
          <HeroStat
            icon={<MessageCircleIcon className="size-4" />}
            label="Коммуникации"
            value="WebSocket чат + push"
          />
        </div>
      </div>
    </section>
  )
}

function HeroStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="border-border/70 bg-gradient-to-br from-slate-50 to-white">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
          {icon}
          {label}
        </div>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

function ProjectListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-border/60 bg-muted/40 p-5">
          <div className="h-4 w-1/2 rounded-full bg-muted" />
          <div className="mt-3 h-3 w-3/4 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  )
}

function SpecificationHighlights() {
  const items = [
    {
      icon: <BellIcon className="size-4" />,
      title: "Push-уведомления и email",
      description: "Система уведомляет о чат-сообщениях, изменениях задач и дедлайнах.",
    },
    {
      icon: <ActivityIcon className="size-4" />,
      title: "Журнал действий",
      description: "Каждое действие фиксируется для аудита и прозрачности.",
    },
    {
      icon: <SparklesIcon className="size-4" />,
      title: "Готовность к AI и интеграциям",
      description: "Архитектура рассчитана на календарь встреч и AI-сводки.",
    },
  ]

  return (
    <Card className="border-border/70 bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Точки контроля из спецификации</CardTitle>
        <CardDescription>Отражаем требования MVP и следующего этапа</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 p-4">
            <div className="mb-2 flex size-9 items-center justify-center rounded-full bg-muted text-primary">
              {item.icon}
            </div>
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
