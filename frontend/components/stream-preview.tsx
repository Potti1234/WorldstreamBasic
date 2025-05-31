'use client'

interface StreamPreviewProps {
  isLive: boolean
}

export function StreamPreview ({ isLive }: StreamPreviewProps) {
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-900 mb-3'>
        Stream Preview
      </h2>
      <div className='relative bg-gray-900 rounded-lg overflow-hidden aspect-video'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white text-center'>
            {isLive ? (
              <>
                <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
                  <div className='w-8 h-8 bg-red-500 rounded-full animate-pulse'></div>
                </div>
                <p className='text-lg font-medium'>You are Live!</p>
                <p className='text-sm text-gray-300'>
                  Your stream is broadcasting
                </p>
              </>
            ) : (
              <>
                <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto'>
                  <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
                </div>
                <p className='text-lg font-medium'>Stream Offline</p>
                <p className='text-sm text-gray-300'>
                  Click "Go Live" to start streaming
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
