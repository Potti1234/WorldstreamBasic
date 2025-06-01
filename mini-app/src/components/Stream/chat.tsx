"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
}

interface ChatProps {
  streamId: string
  isStreamer?: boolean
}

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    username: "Viewer123",
    message: "Great stream!",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    username: "GamerFan",
    message: "How long have you been playing this?",
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: "3",
    username: "StreamLover",
    message: "This is so cool! 🔥",
    timestamp: new Date(Date.now() - 10000),
  },
]

export function Chat({ streamId, isStreamer = false }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: isStreamer ? "Streamer" : "You",
      message: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="h-80 flex flex-col">
      <div className="border-b border-gray-200 p-3">
        <h3 className="font-medium text-gray-900">Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((message) => (
          <div key={message.id} className="text-sm">
            <span className={`font-medium ${message.username === "Streamer" ? "text-blue-600" : "text-gray-900"}`}>
              {message.username}:
            </span>
            <span className="ml-2 text-gray-700">{message.message}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
