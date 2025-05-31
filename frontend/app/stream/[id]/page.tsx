import { StreamViewer } from "@/components/stream-viewer"
import { Chat } from "@/components/chat"
import { DonationButton } from "@/components/donation-button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

// Mock stream data
const getStreamData = (id: string) => ({
  id,
  title: "Gaming Session - Exploring New Worlds",
  streamerName: "GamerPro123",
  viewerCount: 1247,
  isLive: true,
  description: "Join me as I explore this amazing new world! Don't forget to follow and subscribe!",
})

export default function StreamPage({ params }: { params: { id: string } }) {
  const stream = getStreamData(params.id)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-4">
        {/* Stream Video */}
        <div className="mb-4">
          <StreamViewer streamId={stream.id} />
        </div>

        {/* Stream Info */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="bg-red-500">
                LIVE
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                {stream.viewerCount.toLocaleString()}
              </div>
            </div>
            <DonationButton streamerName={stream.streamerName} />
          </div>

          <h1 className="text-lg font-semibold text-gray-900 mb-1">{stream.title}</h1>
          <p className="text-sm text-gray-600 mb-2">by {stream.streamerName}</p>
          <p className="text-sm text-gray-700">{stream.description}</p>
        </div>

        {/* Chat */}
        <div className="bg-white rounded-lg shadow-sm">
          <Chat streamId={stream.id} />
        </div>
      </div>
    </div>
  )
}
