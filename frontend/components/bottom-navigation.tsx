"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { List, Video } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "Stream List",
      icon: List,
      active: pathname === "/",
    },
    {
      href: "/your-stream",
      label: "Your Stream",
      icon: Video,
      active: pathname === "/your-stream",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                item.active ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
