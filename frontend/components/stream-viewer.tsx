'use client'

interface StreamViewerProps {
  streamId: string
}

export function StreamViewer ({ streamId }: StreamViewerProps) {
  return (
    <div className='relative bg-black rounded-lg overflow-hidden aspect-video'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-white text-center'>
          <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
            <div className='w-8 h-8 bg-red-500 rounded-full animate-pulse'></div>
          </div>
          <p className='text-lg font-medium'>Live Stream</p>
          <p className='text-sm text-gray-300'>Stream ID: {streamId}</p>
        </div>
      </div>
    </div>
  )
}
