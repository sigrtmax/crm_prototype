"use client"

import { MotionValue, motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"
import { CalendarIcon, ChevronRightIcon, UserIcon } from "lucide-react"

import type { ProjectSummary } from "@/data/mockProjects"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const gradients = [
  "from-indigo-500/15 via-transparent to-transparent",
  "from-emerald-500/15 via-transparent to-transparent",
  "from-rose-500/15 via-transparent to-transparent",
]

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value))

type ProjectCardProps = {
  project: ProjectSummary
  onSelect: (id: string) => void
  active: boolean
  index: number
}

export function ProjectCard({ project, onSelect, active, index }: ProjectCardProps) {
  const progress = useSpring(project.progress, { bounce: 0, stiffness: 120, damping: 20 })

  useEffect(() => {
    progress.set(project.progress)
  }, [project.progress, progress])

  return (
    <Card
      role="button"
      onClick={() => onSelect(project.id)}
      className="relative overflow-hidden border-border/60 transition hover:border-primary/60"
      data-active={active}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
      />
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
        <CardDescription className="text-muted-foreground/90">
          {project.overview}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="border-transparent bg-white/70 text-xs uppercase tracking-wide">
            {project.status}
          </Badge>
          <span className="inline-flex items-center gap-1">
            <UserIcon className="size-4 text-muted-foreground/70" />
            {project.manager}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarIcon className="size-4 text-muted-foreground/70" />
            До {formatDate(project.dueDate)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-xs uppercase text-muted-foreground">
              <span>Прогресс</span>
              <span>{project.progress}%</span>
            </div>
            <AnimatedProgress progress={progress} />
          </div>
          <motion.div
            className="hidden rounded-full border border-border/60 p-2 text-muted-foreground md:block"
            animate={{ rotate: active ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronRightIcon className="size-4" />
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.mvpFocus.map((item) => (
            <Badge key={item} variant="outline" className="border-dashed border-muted text-xs font-medium">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AnimatedProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, (value) => `${value}%`)

  return (
    <motion.div
      className="rounded-full bg-muted"
      style={{ height: 8, position: "relative", overflow: "hidden" }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/60"
        style={{ width }}
      />
    </motion.div>
  )
}
