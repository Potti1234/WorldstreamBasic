'use client'

import { useState } from 'react'
import { Chat } from '@/components/chat'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import StreamComponent from '@/components/streamComponent'

export default function YourStreamPage () {
  const [streamTitle, setStreamTitle] = useState('My Awesome Stream')
  const [streamDescription, setStreamDescription] = useState(
    'Welcome to my stream!'
  )

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <div className='container mx-auto px-4 py-4'>
        {/* Stream Controls */}
        <div className='bg-white rounded-lg p-4 mb-4 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-bold text-gray-900'>Your Stream</h1>
          </div>

          <div className='space-y-4 mb-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Stream Title
              </label>
              <Input
                value={streamTitle}
                onChange={e => setStreamTitle(e.target.value)}
                placeholder='Enter your stream title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <Textarea
                value={streamDescription}
                onChange={e => setStreamDescription(e.target.value)}
                placeholder='Tell viewers what your stream is about'
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Stream Preview */}
        <div className='mb-4'>
          <StreamComponent />
        </div>

        {/* Chat */}
        <div className='bg-white rounded-lg shadow-sm'>
          <Chat streamId='your-stream' isStreamer={true} />
        </div>
      </div>
    </div>
  )
}
