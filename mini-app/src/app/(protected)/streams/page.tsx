'use client'

import { StreamCard } from '@/components/Stream/stream-card'
import { getAllStreams, Stream } from '@/lib/api-stream'
import { useEffect, useState } from 'react'

export default function StreamListPage () {
  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    const fetchStreams = async () => {
      const fetchedStreams = await getAllStreams()
      setStreams(fetchedStreams)
    }
    fetchStreams()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <div className='container mx-auto px-4 py-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            Live Streams
          </h1>
        </div>

        {streams.length === 0 ? (
          <p className='text-center text-gray-500 text-xl'>
            Currently no one is live
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {streams.map(stream => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
