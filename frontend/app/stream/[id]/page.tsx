'use client'

import { Chat } from '@/components/chat'
import { DonationButton } from '@/components/donation-button'
import { Badge } from '@/components/ui/badge'
import { Eye } from 'lucide-react'
import { getStreamById, Stream } from '@/lib/api-stream'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import PlayingComponent from '@/components/playingComponent'

export default function StreamPage () {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [stream, setStream] = useState<Stream | null>(null)

  useEffect(() => {
    const fetchStream = async () => {
      const streamData = await getStreamById(id)
      setStream(streamData)
      console.log(streamData)
    }
    if (id) {
      fetchStream()
    }
  }, [id])

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <div className='container mx-auto px-4 py-4'>
        {!stream || !stream.id ? (
          <div className='text-center py-8'>
            <p className='text-lg text-gray-700'>Stream could not be found</p>
          </div>
        ) : (
          <>
            {/* Stream Video */}
            <div className='mb-4'>
              <PlayingComponent streamId={stream.streamId} />
            </div>

            {/* Stream Info */}
            <div className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <Badge variant='destructive' className='bg-red-500'>
                    LIVE
                  </Badge>
                  <div className='flex items-center gap-1 text-sm text-gray-600'>
                    <Eye className='w-4 h-4' />
                    {0}
                  </div>
                </div>
                <DonationButton streamerName={stream.streamer} />
              </div>

              <h1 className='text-lg font-semibold text-gray-900 mb-1'>
                {stream.title}
              </h1>
              <p className='text-sm text-gray-600 mb-2'>by {stream.streamer}</p>
            </div>

            {/* Chat */}
            <div className='bg-white rounded-lg shadow-sm'>
              <Chat streamId={stream.id} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
