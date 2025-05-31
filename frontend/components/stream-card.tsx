import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

interface Stream {
  id: string
  title: string
  streamerName: string
  viewerCount: number
  thumbnail: string
  isLive: boolean
}

interface StreamCardProps {
  stream: Stream
}

export function StreamCard({ stream }: StreamCardProps) {
  return (
    <Link href={`/stream/${stream.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={stream.thumbnail || "/placeholder.svg"}
            alt={stream.title}
            width={300}
            height={200}
            className="w-full h-40 object-cover"
          />
          {stream.isLive && (
            <Badge variant="destructive" className="absolute top-2 left-2 bg-red-500">
              LIVE
            </Badge>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {stream.viewerCount.toLocaleString()}
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{stream.title}</h3>
          <p className="text-xs text-gray-600">{stream.streamerName}</p>
        </div>
      </div>
    </Link>
  )
}
