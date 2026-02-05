"use client"

import { format } from "date-fns"
import { ru } from "date-fns/locale"

import type {
  KanbanColumn,
  Project,
  Task,
  TaskPriority,
} from "@/data/mockProjects"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PRIORITY_STYLES: Record<
  TaskPriority,
  { badge: string; label: string }
> = {
  high: {
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    label: "Высокий",
  },
  medium: {
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    label: "Средний",
  },
  low: {
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    label: "Низкий",
  },
}

const formatDate = (value: string) =>
  format(new Date(value), "dd MMM", { locale: ru })

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <Card className="border-border/70">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold">{project.name}</CardTitle>
            <CardDescription>
              {project.clientCompany} · {project.phase} · Менеджер {project.manager}
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/40 text-primary">
            {project.status}
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-xs uppercase text-muted-foreground">
              <span>Общий прогресс</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="mt-2 h-2" />
          </div>
          <div className="rounded-xl border border-dashed border-border/70 p-4">
            <p className="text-xs uppercase text-muted-foreground">Ближайший этап</p>
            <p className="text-base font-semibold text-foreground">{project.upcomingMilestone}</p>
            <p className="text-sm text-muted-foreground">Дедлайн: {formatDate(project.dueDate)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.mvpFocus.map((item) => (
            <Badge key={item} variant="outline" className="border-dashed">
              MVP · {item}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="overview">
          <TabsList
            variant="line"
            className="mx-4 mb-0 flex w-auto gap-1 overflow-x-auto border-b border-border/50 bg-transparent px-0 pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-6 md:gap-2"
          >
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="docs">Документы</TabsTrigger>
            <TabsTrigger value="comms">Коммуникации</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="architecture">Архитектура</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="px-6">
            <OverviewSection project={project} />
          </TabsContent>
          <TabsContent value="tasks" className="px-2">
            <KanbanSection kanban={project.kanban} />
          </TabsContent>
          <TabsContent value="docs" className="px-6">
            <DocumentsSection
              documents={project.documents}
              gantt={project.gantt}
              blockers={project.blockers}
            />
          </TabsContent>
          <TabsContent value="comms" className="px-6">
            <CommunicationsSection
              notifications={project.notifications}
              chat={project.chat}
              activity={project.activity}
              securityNotes={project.securityNotes}
            />
          </TabsContent>
          <TabsContent value="security" className="px-6">
            <SecuritySection accessModel={project.accessModel} />
          </TabsContent>
          <TabsContent value="architecture" className="px-6">
            <ArchitectureSection
              techStack={project.techStack}
              pwaFeatures={project.pwaFeatures}
              integrationPlans={project.integrationPlans}
              roadmap={project.roadmap}
              aiInitiatives={project.aiInitiatives}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function OverviewSection({ project }: { project: Project }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Ключевые акценты</CardTitle>
          <CardDescription>Что влияет на успех проекта прямо сейчас</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm text-foreground"
            >
              {highlight}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Метрические показатели</CardTitle>
          <CardDescription>На основе описания из спецификации MVP</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Metric label="Фаза" value={project.phase} />
          <Metric label="Срок" value={formatDate(project.dueDate)} />
          <Metric label="Velocity" value={project.velocity} />
          <Metric label="Компания" value={project.clientCompany} />
        </CardContent>
      </Card>
      <Card className="border-border/60 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Блокеры</CardTitle>
          <CardDescription>Важные риски, требующие внимания клиента</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {project.blockers.map((blocker) => (
            <div key={blocker} className="flex items-start gap-3 rounded-lg bg-rose-50/60 p-3 text-sm text-rose-900">
              <div className="mt-1 size-2 rounded-full bg-rose-500" />
              <p>{blocker}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function SecuritySection({ accessModel }: { accessModel: Project["accessModel"] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Регистрация и роли</CardTitle>
          <CardDescription>{accessModel.registrationFlow}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {accessModel.roles.map((role) => (
            <div key={role.id} className="rounded-xl border border-border/60 p-3">
              <p className="text-sm font-semibold">{role.name}</p>
              <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
                {role.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Практики безопасности</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {accessModel.securityPractices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Аудит & логирование</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {accessModel.auditControls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ArchitectureSection({
  techStack,
  pwaFeatures,
  integrationPlans,
  roadmap,
  aiInitiatives,
}: Pick<Project, "techStack" | "pwaFeatures" | "integrationPlans" | "roadmap" | "aiInitiatives">) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Технологические слои</CardTitle>
            <CardDescription>Отражает архитектуру из спецификации</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {techStack.map((layer) => (
              <div key={layer.name} className="rounded-xl border border-border/60 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{layer.name}</span>
                  <Badge variant="outline" className="text-[11px] uppercase">
                    {layer.state === "ready"
                      ? "готово"
                      : layer.state === "in_progress"
                        ? "в работе"
                        : "план"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{layer.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">PWA & интеграции</CardTitle>
            <CardDescription>Установка, офлайн, push и внешний периметр</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground">PWA</p>
              <div className="mt-2 space-y-2">
                {pwaFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-start justify-between rounded-xl border border-border/60 p-3">
                    <div>
                      <p className="text-sm font-semibold">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    <Badge variant={feature.ready ? "secondary" : "outline"} className="text-[11px]">
                      {feature.ready ? "готово" : "план"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Интеграции</p>
              <div className="mt-2 space-y-2">
                {integrationPlans.map((integration) => (
                  <div key={integration.id} className="rounded-xl border border-border/60 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">{integration.name}</span>
                      <Badge variant="outline" className="text-[11px] uppercase">
                        {integration.status === "enabled" ? "включено" : "план"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Дорожная карта</CardTitle>
          <CardDescription>Связь между MVP и дальнейшим развитием</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-3">
          {roadmap.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/60 p-4">
              <p className="text-xs uppercase text-muted-foreground">{item.quarter}</p>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Badge variant={item.mvp ? "secondary" : "outline"} className="mt-2 text-[11px] uppercase">
                {item.mvp ? "MVP" : "Post-MVP"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Инициативы с AI</CardTitle>
          <CardDescription>Будущие автоматизации по спецификации</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {aiInitiatives.map((initiative) => (
              <li key={initiative}>{initiative}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 p-4">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}

function KanbanSection({ kanban }: { kanban: KanbanColumn[] }) {
  return (
    <ScrollArea className="h-[480px] px-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kanban.map((column) => (
          <div key={column.id} className="rounded-2xl border border-border/50 bg-muted/30 p-4">
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground">{column.title}</p>
              <p className="text-xs text-muted-foreground">{column.description}</p>
            </div>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {column.tasks.length === 0 && (
                <p className="text-xs text-muted-foreground">Задачи не назначены</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

function TaskCard({ task }: { task: Task }) {
  const style = PRIORITY_STYLES[task.priority]

  return (
    <div className="rounded-xl border border-border/60 bg-background p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-foreground">{task.title}</p>
        <Badge variant="outline" className={style.badge}>
          {style.label}
        </Badge>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Исполнитель: {task.assignee}</span>
        <span>Срок: {formatDate(task.dueDate)}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {task.clientCreated ? "Создано клиентом" : task.sprint ? `Спpинт: ${task.sprint}` : null}
      </div>
    </div>
  )
}

function DocumentsSection({
  documents,
  gantt,
  blockers,
}: Pick<Project, "documents" | "gantt" | "blockers">) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Версионность ТЗ</CardTitle>
          <CardDescription>Реализация требований по документации и журналу версий</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((document) => (
            <div key={document.version} className="rounded-xl border border-border/60 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{document.version}</p>
                {document.isCurrent ? (
                  <Badge variant="secondary" className="border-transparent text-xs">
                    Актуальная версия
                  </Badge>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(document.date)} · {document.author}
              </p>
              <p className="mt-2 text-sm text-foreground">{document.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Диаграмма Ганта (MVP)</CardTitle>
          <CardDescription>Базовое представление этапов и статусов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {gantt.map((milestone) => (
            <div key={milestone.id} className="rounded-xl border border-border/50 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{milestone.label}</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {milestone.status === "in_progress"
                    ? "В работе"
                    : milestone.status === "done"
                      ? "Завершено"
                      : "Запланировано"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(milestone.startDate)} – {formatDate(milestone.endDate)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function CommunicationsSection({
  notifications,
  chat,
  activity,
  securityNotes,
}: Pick<Project, "notifications" | "chat" | "activity" | "securityNotes">) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Уведомления</CardTitle>
          <CardDescription>Push/email сигналы из MVP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="rounded-xl border border-border/60 p-3">
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{formatDate(notification.date)}</span>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                  {notification.type}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-foreground">{notification.message}</p>
              {!notification.mvp ? (
                <p className="text-xs text-muted-foreground">Пост-MVP</p>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Чаты и ленты</CardTitle>
          <CardDescription>Встроенная коммуникация проекта</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {chat.map((thread) => (
            <div key={thread.id} className="flex items-start justify-between rounded-xl border border-border/60 p-3">
              <div>
                <p className="font-semibold text-foreground">{thread.title}</p>
                <p className="text-xs text-muted-foreground">
                  {thread.lastMessage.author}: {thread.lastMessage.text}
                </p>
              </div>
              {thread.unreadCount > 0 ? (
                <Badge variant="secondary" className="text-xs">
                  {thread.unreadCount}
                </Badge>
              ) : null}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-3 text-sm text-muted-foreground">
            {securityNotes}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/60 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Журнал действий</CardTitle>
          <CardDescription>Прозрачность и аудит изменений</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activity.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-1 rounded-xl border border-border/50 bg-background/80 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{entry.actor}</p>
                <p className="text-sm text-muted-foreground">{entry.action}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {format(new Date(entry.timestamp), "dd MMM HH:mm", { locale: ru })}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
