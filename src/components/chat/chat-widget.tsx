"use client"

import { useState } from "react"
import { MessageCircleIcon, SendIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

type Message = {
  id: string
  author: string
  text: string
  timestamp: string
  isClient: boolean
}

const mockMessages: Message[] = [
  {
    id: "1",
    author: "Дмитрий Савин",
    text: "Добрый день! Отправил превью обновлённого дашборда.",
    timestamp: "2026-02-05T09:14:00+03:00",
    isClient: false,
  },
  {
    id: "2",
    author: "Вы",
    text: "Спасибо, посмотрю в течение часа",
    timestamp: "2026-02-05T09:20:00+03:00",
    isClient: true,
  },
  {
    id: "3",
    author: "Алина Егорова",
    text: "Напоминаю про демо 25 февраля. Подтвердите участие, пожалуйста.",
    timestamp: "2026-02-05T10:05:00+03:00",
    isClient: false,
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages] = useState<Message[]>(mockMessages)
  const unreadCount = 2

  const handleSend = () => {
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircleIcon className="size-6" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="border-border/70 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/50 pb-4">
                <div>
                  <CardTitle className="text-base font-semibold">Чат проекта</CardTitle>
                  <CardDescription className="text-xs">Проект Alpha — общий канал</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col gap-1 ${msg.isClient ? "items-end" : "items-start"}`}
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{msg.author}</span>
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                            msg.isClient
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t border-border/50 p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Написать сообщение..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                      className="min-h-[44px] max-h-[120px] resize-none"
                      rows={1}
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!message.trim()}
                      className="shrink-0"
                    >
                      <SendIcon className="size-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    WebSocket-чат · Push-уведомления включены
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
