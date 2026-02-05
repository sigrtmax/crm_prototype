export type TaskStatus = "backlog" | "in_progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  clientCreated?: boolean;
  sprint?: string;
};

export type KanbanColumn = {
  id: TaskStatus;
  title: string;
  description: string;
  tasks: Task[];
};

export type DocumentVersion = {
  version: string;
  date: string;
  author: string;
  summary: string;
  isCurrent: boolean;
};

export type ActivityEntry = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  scope: "project" | "task" | "document" | "chat" | "security";
};

export type NotificationItem = {
  id: string;
  type: "chat" | "deadline" | "document" | "alert";
  message: string;
  date: string;
  mvp: boolean;
};

export type GanttMilestone = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  status: "planned" | "in_progress" | "done";
};

export type ChatPreview = {
  id: string;
  title: string;
  unreadCount: number;
  lastMessage: {
    author: string;
    text: string;
    timestamp: string;
  };
};

export type AccessModel = {
  registrationFlow: string;
  roles: {
    id: string;
    name: string;
    permissions: string[];
  }[];
  securityPractices: string[];
  auditControls: string[];
};

export type TechStackLayer = {
  name: string;
  description: string;
  state: "ready" | "in_progress" | "planned";
};

export type PwaFeature = {
  id: string;
  title: string;
  description: string;
  ready: boolean;
};

export type IntegrationPlan = {
  id: string;
  name: string;
  description: string;
  status: "enabled" | "planned";
};

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  quarter: string;
  mvp: boolean;
};

export type ProjectSummary = {
  id: string;
  name: string;
  status: string;
  phase: string;
  progress: number;
  dueDate: string;
  manager: string;
  clientCompany: string;
  overview: string;
  upcomingMilestone: string;
  mvpFocus: string[];
};

export type Project = ProjectSummary & {
  highlights: string[];
  tasks: Task[];
  kanban: KanbanColumn[];
  documents: DocumentVersion[];
  gantt: GanttMilestone[];
  notifications: NotificationItem[];
  activity: ActivityEntry[];
  chat: ChatPreview[];
  blockers: string[];
  velocity: string;
  securityNotes: string;
  accessModel: AccessModel;
  techStack: TechStackLayer[];
  pwaFeatures: PwaFeature[];
  integrationPlans: IntegrationPlan[];
  roadmap: RoadmapItem[];
  aiInitiatives: string[];
};

const buildKanban = (tasks: Task[]): KanbanColumn[] => {
  const template: Record<TaskStatus, KanbanColumn> = {
    backlog: {
      id: "backlog",
      title: "Бэклог",
      description: "Задачи ожидают проработки или подтверждения",
      tasks: [],
    },
    in_progress: {
      id: "in_progress",
      title: "В работе",
      description: "Команда активно выполняет задачи",
      tasks: [],
    },
    review: {
      id: "review",
      title: "На проверке",
      description: "Задачи проходят тестирование или ревью",
      tasks: [],
    },
    done: {
      id: "done",
      title: "Готово",
      description: "Выполненные задачи, ожидают подтверждения клиента",
      tasks: [],
    },
  };

  tasks.forEach((task) => {
    template[task.status].tasks.push(task);
  });

  return Object.values(template);
};

const alphaTasks: Task[] = [
  {
    id: "ALPHA-101",
    title: "Редизайн карточек проектов по новому гайду",
    status: "in_progress",
    assignee: "Дмитрий Савин",
    dueDate: "2026-02-20",
    priority: "high",
    sprint: "Sprint 18",
  },
  {
    id: "ALPHA-114",
    title: "Версия ТЗ v1.2 — обновить требования к уведомлениям",
    status: "review",
    assignee: "Ирина Морозова",
    dueDate: "2026-02-07",
    priority: "medium",
    sprint: "Sprint 17",
  },
  {
    id: "ALPHA-089",
    title: "Добавить drag & drop в Канбан",
    status: "backlog",
    assignee: "Андрей Громов",
    dueDate: "2026-03-01",
    priority: "medium",
    clientCreated: true,
  },
  {
    id: "ALPHA-071",
    title: "Интеграция push-уведомлений с сервис-воркером",
    status: "in_progress",
    assignee: "Марина Котова",
    dueDate: "2026-02-28",
    priority: "high",
    sprint: "Sprint 18",
  },
  {
    id: "ALPHA-056",
    title: "Обновить PWA-манифест и иконки",
    status: "done",
    assignee: "Егор Николаев",
    dueDate: "2026-01-30",
    priority: "low",
  },
];

const betaTasks: Task[] = [
  {
    id: "BETA-022",
    title: "Подготовить диаграмму Ганта для следующего квартала",
    status: "in_progress",
    assignee: "Владислав Лебедев",
    dueDate: "2026-02-18",
    priority: "medium",
    sprint: "Sprint 5",
  },
  {
    id: "BETA-041",
    title: "Внедрить журнал доступа к API",
    status: "review",
    assignee: "Наталья Крылова",
    dueDate: "2026-02-09",
    priority: "high",
  },
  {
    id: "BETA-017",
    title: "Клиентский чат: шаблоны быстрых ответов",
    status: "backlog",
    assignee: "Иван Жуков",
    dueDate: "2026-03-10",
    priority: "medium",
  },
  {
    id: "BETA-038",
    title: "Автоэкспорт лога в S3",
    status: "done",
    assignee: "Любовь Федорова",
    dueDate: "2026-01-15",
    priority: "high",
  },
];

export const mockProjects: Project[] = [
  {
    id: "alpha",
    name: "Кабинет клиента Alpha",
    status: "Идет разработка",
    phase: "Разработка",
    progress: 62,
    dueDate: "2026-03-15",
    manager: "Алина Егорова",
    clientCompany: "Orion Systems",
    overview:
      "MVP личного кабинета с Kanban, версионностью ТЗ, встроенным чатом и PWA-поддержкой для проекта Alpha.",
    upcomingMilestone: "Бета-демо 25 февраля",
    mvpFocus: [
      "Дашборд проектов",
      "Kanban для задач",
      "Чат и логирование",
      "Версионность ТЗ",
    ],
    highlights: [
      "PWA ready: офлайн кэш и установка на устройства",
      "Мультиарендный доступ с подтверждением администратора",
      "WebSocket-чат с push-уведомлениями",
    ],
    tasks: alphaTasks,
    kanban: buildKanban(alphaTasks),
    documents: [
      {
        version: "v1.2",
        date: "2026-01-29",
        author: "Ирина Морозова",
        summary: "Расширен раздел уведомлений и уточнены SLA ответов в чате.",
        isCurrent: true,
      },
      {
        version: "v1.1",
        date: "2025-12-15",
        author: "Максим Литов",
        summary: "Добавлены требования к диаграмме прогресса и Kanban-ролям.",
        isCurrent: false,
      },
      {
        version: "v1.0",
        date: "2025-11-02",
        author: "Клиент Orion Systems",
        summary: "Базовая спецификация MVP кабинета.",
        isCurrent: false,
      },
    ],
    gantt: [
      {
        id: "alpha-g1",
        label: "Аналитика",
        startDate: "2025-11-01",
        endDate: "2025-11-28",
        status: "done",
      },
      {
        id: "alpha-g2",
        label: "UI/UX дизайн",
        startDate: "2025-12-01",
        endDate: "2025-12-20",
        status: "done",
      },
      {
        id: "alpha-g3",
        label: "Разработка MVP",
        startDate: "2025-12-21",
        endDate: "2026-02-25",
        status: "in_progress",
      },
      {
        id: "alpha-g4",
        label: "Стабилизация и тестирование",
        startDate: "2026-02-26",
        endDate: "2026-03-15",
        status: "planned",
      },
    ],
    notifications: [
      {
        id: "alpha-n1",
        type: "chat",
        message: "Новое сообщение в канале «Проект Alpha – чат» от Дмитрия",
        date: "2026-02-05T09:15:00+03:00",
        mvp: true,
      },
      {
        id: "alpha-n2",
        type: "document",
        message: "Версия ТЗ v1.2 загружена и ожидает подтверждения клиента",
        date: "2026-02-04T18:40:00+03:00",
        mvp: true,
      },
      {
        id: "alpha-n3",
        type: "deadline",
        message: "Срок задачи ALPHA-114 наступает через 2 дня",
        date: "2026-02-05T08:00:00+03:00",
        mvp: false,
      },
    ],
    activity: [
      {
        id: "alpha-log1",
        timestamp: "2026-02-05T10:11:00+03:00",
        actor: "Марина Котова",
        action: "обновила статус задачи ALPHA-071 → В работе",
        scope: "task",
      },
      {
        id: "alpha-log2",
        timestamp: "2026-02-04T18:41:00+03:00",
        actor: "Ирина Морозова",
        action: "загрузила новую версию ТЗ v1.2",
        scope: "document",
      },
      {
        id: "alpha-log3",
        timestamp: "2026-02-04T17:12:00+03:00",
        actor: "Система",
        action: "отправила push-уведомление клиенту о новом сообщении",
        scope: "chat",
      },
      {
        id: "alpha-log4",
        timestamp: "2026-02-03T12:22:00+03:00",
        actor: "Администратор",
        action: "подтвердил нового пользователя клиента",
        scope: "security",
      },
    ],
    chat: [
      {
        id: "alpha-chat-main",
        title: "Проект Alpha — общий канал",
        unreadCount: 3,
        lastMessage: {
          author: "Дмитрий Савин",
          text: "Отправил превью обновлённого дашборда.",
          timestamp: "2026-02-05T09:14:00+03:00",
        },
      },
      {
        id: "alpha-chat-design",
        title: "Alpha — UX вопросы",
        unreadCount: 0,
        lastMessage: {
          author: "Клиент Orion",
          text: "Подтверждаю вариант с тёмной темой.",
          timestamp: "2026-02-04T16:05:00+03:00",
        },
      },
    ],
    blockers: [
      "Ожидаем approval клиента на обновление SLA уведомлений",
      "Нужно согласовать использование push-уведомлений в корпоративной MDM",
    ],
    velocity: "14 задач за последние 7 дней",
    securityNotes:
      "Проверка 2FA для клиентов в процессе. Логи доступа хранятся в отдельном кластере.",
    accessModel: {
      registrationFlow:
        "Самостоятельная регистрация клиента с последующим подтверждением администратором компании.",
      roles: [
        {
          id: "client",
          name: "Клиент",
          permissions: [
            "доступ только к проектам своей организации",
            "просмотр задач и статусов",
            "комментирование и загрузка документов",
          ],
        },
        {
          id: "teammate",
          name: "Сотрудник",
          permissions: [
            "управление задачами и Kanban",
            "добавление документов и версий ТЗ",
            "участие во всех чатах проекта",
          ],
        },
        {
          id: "admin",
          name: "Администратор",
          permissions: [
            "подтверждение пользователей",
            "управление ролями и организациями",
            "просмотр журнала действий по всем проектам",
          ],
        },
      ],
      securityPractices: [
        "HTTPS и шифрование трафика",
        "ограничение доступа к данным по организациям (tenant isolation)",
        "настройка idle-timeout и авто-logout",
      ],
      auditControls: [
        "логирование успешных и неуспешных входов",
        "история изменений задач и документов",
        "админ-интерфейс для поиска по журналу действий",
      ],
    },
    techStack: [
      {
        name: "Frontend (SPA + PWA)",
        description: "Next.js + React, Tailwind, shadcn/ui, сервис-воркер для offline/push",
        state: "ready",
      },
      {
        name: "Backend / API",
        description: "REST API (в перспективе GraphQL), модульность для микросервисов",
        state: "in_progress",
      },
      {
        name: "Realtime / Чат",
        description: "WebSocket слой + Redis Pub/Sub для масштабирования",
        state: "in_progress",
      },
      {
        name: "Уведомления",
        description: "Push через сервис-воркер + Email; расширенный роутинг в пост-MVP",
        state: "planned",
      },
    ],
    pwaFeatures: [
      {
        id: "install",
        title: "Установка на устройство",
        description: "Пользователь может установить кабинет как приложение (Add to Home Screen).",
        ready: true,
      },
      {
        id: "offline-dashboard",
        title: "Offline-доступ к дашборду",
        description: "Кэш последних данных проекта для просмотра без сети.",
        ready: false,
      },
      {
        id: "push",
        title: "Push-уведомления",
        description: "Нативные уведомления о чатах, задачах и документах.",
        ready: true,
      },
    ],
    integrationPlans: [
      {
        id: "slack-webhook",
        name: "Slack / Teams вебхуки",
        description: "Дублирование уведомлений о статусах задач в корпоративные мессенджеры.",
        status: "planned",
      },
      {
        id: "jira-sync",
        name: "Jira / таск-трекер",
        description: "Синхронизация Kanban-статусов с внутренней Jira команды.",
        status: "planned",
      },
      {
        id: "calendar",
        name: "Календарь встреч",
        description: "Интеграция с Google/Outlook Calendar для демо и ревью.",
        status: "enabled",
      },
    ],
    roadmap: [
      {
        id: "mvp-dashboard",
        title: "MVP дашборд и Kanban",
        description: "Карточки проектов, Kanban-доска, логирование и чат.",
        quarter: "Q1 2026",
        mvp: true,
      },
      {
        id: "postmvp-gantt",
        title: "Интерактивная диаграмма Ганта",
        description: "Редактирование зависимостей и экспорт в PDF.",
        quarter: "Q2 2026",
        mvp: false,
      },
      {
        id: "ai-meetings",
        title: "AI-сводки встреч",
        description: "Автопротоколы по Zoom/Teams с транскриптами.",
        quarter: "Q3 2026",
        mvp: false,
      },
    ],
    aiInitiatives: [
      "Автосводки встреч с распознаванием речи",
      "Умные уведомления о рисках срыва сроков",
      "Чат-бот, отвечающий на вопросы из данных проекта",
    ],
  },
  {
    id: "beta",
    name: "Портал клиента Beta",
    status: "Дизайн утверждён",
    phase: "Планирование",
    progress: 38,
    dueDate: "2026-04-30",
    manager: "Михаил Кравцов",
    clientCompany: "Delta Energy",
    overview:
      "Портал с уклоном в аудит логов, интеграции и будущие AI-сводки встреч. Нынешний фокус — документация и журнал действий.",
    upcomingMilestone: "Подготовка интеграций к 10 марта",
    mvpFocus: ["Документооборот", "Журнал действий", "Диаграмма Ганта"],
    highlights: [
      "Расширенная диаграмма Ганта с зависимостями",
      "Ранняя интеграция с брокером событий для логов",
    ],
    tasks: betaTasks,
    kanban: buildKanban(betaTasks),
    documents: [
      {
        version: "v0.9",
        date: "2026-01-25",
        author: "Светлана Трофимова",
        summary: "Добавлен модуль календаря встреч и требования к AI-сводкам.",
        isCurrent: true,
      },
      {
        version: "v0.8",
        date: "2025-12-05",
        author: "Delta Energy PMO",
        summary: "Уточнены ролевые модели и требования к логам.",
        isCurrent: false,
      },
    ],
    gantt: [
      {
        id: "beta-g1",
        label: "Сбор требований",
        startDate: "2025-11-10",
        endDate: "2025-12-20",
        status: "done",
      },
      {
        id: "beta-g2",
        label: "Прототипирование интерфейса",
        startDate: "2026-01-05",
        endDate: "2026-02-14",
        status: "in_progress",
      },
      {
        id: "beta-g3",
        label: "Интеграция логов и уведомлений",
        startDate: "2026-02-15",
        endDate: "2026-03-30",
        status: "planned",
      },
    ],
    notifications: [
      {
        id: "beta-n1",
        type: "alert",
        message: "Необходимо подтвердить архивную копию логов за январь",
        date: "2026-02-05T07:45:00+03:00",
        mvp: true,
      },
      {
        id: "beta-n2",
        type: "deadline",
        message: "Диаграмма Ганта Sprint 6 ожидается через 5 дней",
        date: "2026-02-05T09:00:00+03:00",
        mvp: false,
      },
    ],
    activity: [
      {
        id: "beta-log1",
        timestamp: "2026-02-04T20:30:00+03:00",
        actor: "Наталья Крылова",
        action: "обновила правила доступа к API",
        scope: "security",
      },
      {
        id: "beta-log2",
        timestamp: "2026-02-03T15:10:00+03:00",
        actor: "Клиент Delta",
        action: "оставил комментарий к задаче BETA-017",
        scope: "task",
      },
    ],
    chat: [
      {
        id: "beta-chat-main",
        title: "Beta – общий поток",
        unreadCount: 1,
        lastMessage: {
          author: "Менеджер проекта",
          text: "Загрузил PDF с обновлёнными KPI.",
          timestamp: "2026-02-05T10:02:00+03:00",
        },
      },
    ],
    blockers: ["Ожидаем макеты для блока AI-сводок от дизайн-команды"],
    velocity: "8 задач за последние 7 дней",
    securityNotes:
      "Все администраторские действия логируются в отдельный канал SIEM.",
    accessModel: {
      registrationFlow:
        "Только инвайтами: администратор Delta отправляет приглашения представителям клиента.",
      roles: [
        {
          id: "observer",
          name: "Наблюдатель",
          permissions: ["чтение проектов", "просмотр логов", "комментарии в чате"],
        },
        {
          id: "manager",
          name: "Менеджер проекта",
          permissions: [
            "редактирование задач",
            "управление календарем встреч",
            "создание документов и версий",
          ],
        },
        {
          id: "admin",
          name: "Администратор",
          permissions: [
            "создание организаций и проектов",
            "назначение ролей и интеграций",
            "доступ к SIEM/логам",
          ],
        },
      ],
      securityPractices: [
        "VPN-доступ для сотрудников",
        "журналирование всех API-запросов",
        "ежедневные резервные копии БД и документов",
      ],
      auditControls: [
        "экспорт логов в SIEM",
        "уведомления об административных действиях",
        "двухфакторная аутентификация на этапе пост-MVP",
      ],
    },
    techStack: [
      {
        name: "Frontend",
        description: "Next.js SPA, Tailwind, компоненты shadcn/ui, подготовка тёмной темы",
        state: "ready",
      },
      {
        name: "Backend",
        description: "Модульная архитектура с разделением Project/Chat/Docs/Notifications",
        state: "in_progress",
      },
      {
        name: "AI / ML",
        description: "Подготовка пайплайна для транскрипции встреч и анализа тональности",
        state: "planned",
      },
      {
        name: "Integrations",
        description: "Открытый API + вебхуки (Slack, Jira, календарь)",
        state: "planned",
      },
    ],
    pwaFeatures: [
      {
        id: "pwa-beta-install",
        title: "Установка и офлайн-режим",
        description: "Кэширование страниц дашборда и Kanban при авторизованном доступе.",
        ready: true,
      },
      {
        id: "pwa-beta-push",
        title: "Push и email настройки",
        description: "Гибкая настройка каналов уведомлений для разных типов событий.",
        ready: false,
      },
    ],
    integrationPlans: [
      {
        id: "delta-siem",
        name: "SIEM экспорт логов",
        description: "Поток событий безопасности в корпоративную систему Delta Energy.",
        status: "enabled",
      },
      {
        id: "calendar-ai",
        name: "Календарь + AI",
        description: "Интеграция митингов с автоматическими резюме.",
        status: "planned",
      },
    ],
    roadmap: [
      {
        id: "beta-mvp-logs",
        title: "Журнал действий и документация",
        description: "Логи всех событий + версионность ТЗ.",
        quarter: "Q1 2026",
        mvp: true,
      },
      {
        id: "beta-gantt",
        title: "Диаграмма Ганта 2.0",
        description: "Полноценные зависимости и экспорты.",
        quarter: "Q2 2026",
        mvp: false,
      },
      {
        id: "beta-ai-recaps",
        title: "AI-сводки встреч",
        description: "Загрузка аудиозаписей и автопротоколы.",
        quarter: "Q3 2026",
        mvp: false,
      },
    ],
    aiInitiatives: [
      "Анализ тональности переписки с клиентом",
      "Автогенерация конспектов митингов",
      "Рекомендации по приоритетам задач",
    ],
  },
];

export const getProjectSummaries = (): ProjectSummary[] =>
  mockProjects.map(
    ({
      id,
      name,
      status,
      phase,
      progress,
      dueDate,
      manager,
      clientCompany,
      overview,
      upcomingMilestone,
      mvpFocus,
    }) => ({
      id,
      name,
      status,
      phase,
      progress,
      dueDate,
      manager,
      clientCompany,
      overview,
      upcomingMilestone,
      mvpFocus,
    }),
  );

export const findProject = (projectId: string): Project | undefined =>
  mockProjects.find((project) => project.id === projectId);
