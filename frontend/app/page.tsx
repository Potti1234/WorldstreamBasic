import { StreamCard } from "@/components/stream-card"

// Mock data for active streams
const activeStreams = [
  {
    id: "1",
    title: "Gaming Session - Exploring New Worlds",
    streamerName: "GamerPro123",
    viewerCount: 1247,
    thumbnail: "/placeholder.svg?height=200&width=300",
    isLive: true,
  },
  {
    id: "2",
    title: "Cooking with Chef Maria",
    streamerName: "ChefMaria",
    viewerCount: 856,
    thumbnail: "/placeholder.svg?height=200&width=300",
    isLive: true,
  },
  {
    id: "3",
    title: "Music Production Live",
    streamerName: "BeatMaker",
    viewerCount: 432,
    thumbnail: "/placeholder.svg?height=200&width=300",
    isLive: true,
  },
  {
    id: "4",
    title: "Art & Design Workshop",
    streamerName: "ArtistAnna",
    viewerCount: 298,
    thumbnail: "/placeholder.svg?height=200&width=300",
    isLive: true,
  },
]

export default function StreamListPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Streams</h1>
          <p className="text-gray-600">{activeStreams.length} streams currently live</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </div>
  )
}
