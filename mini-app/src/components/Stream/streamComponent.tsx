'use client'

import React, { useState, useEffect, useRef } from 'react'
import { WebRTCAdaptor as WebRTCAdaptorType } from '@antmedia/webrtc_adaptor' // Alias the type
import { Button } from '@/components/ui/button'
import { createStream, deleteStream } from '@/lib/api-stream'
import { toast } from 'sonner'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const StreamComponent = () => {
  const [session, setSession] = useState<any>(null) // Add state for session
  const [publishing, setPublishing] = useState(false)
  const [websocketConnected, setWebsocketConnected] = useState(false)
  const [streamId, setStreamId] = useState('') // Initialize with empty string
  const webRTCAdaptor = useRef<WebRTCAdaptorType | null>(null) // Use aliased type
  const publishingStream = useRef<string | null>(null)

  const handleCreateStream = async () => {
    const newStream = await createStream(streamId)
    if (newStream) {
      toast.success(
        `Stream created with ID: ${newStream.id} and StreamId: ${newStream.streamId}`
      )
    } else {
      toast.error('Failed to create stream.')
    }
  }

  const handleDeleteStream = async () => {
    const success = await deleteStream(streamId)
    if (success) {
      toast.success(`Stream with StreamId: ${streamId} deleted successfully.`)
    } else {
      toast.error(`Failed to delete stream with StreamId: ${streamId}.`)
    }
  }

  const handlePublish = () => {
    setPublishing(true)
    publishingStream.current = streamId
    if (webRTCAdaptor.current) {
      webRTCAdaptor.current.publish(streamId)
      handleCreateStream()
    }
  }

  const handleStopPublishing = () => {
    setPublishing(false)
    if (webRTCAdaptor.current && publishingStream.current) {
      // Assuming stop can be used for publishing as well, or specific unpublish method if available
      webRTCAdaptor.current.stop(publishingStream.current)
      handleDeleteStream()
    }
  }

  const handleStreamIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamId(event.target.value)
  }

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth()
      if (!sessionData) {
        redirect('/')
      } else {
        setSession(sessionData)
        setStreamId(sessionData.user.username) // Set streamId after session is fetched
      }
    }
    fetchSession()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure this runs only on client-side
      import('@antmedia/webrtc_adaptor').then(({ WebRTCAdaptor }) => {
        if (
          webRTCAdaptor.current === undefined ||
          webRTCAdaptor.current === null
        ) {
          webRTCAdaptor.current = new WebRTCAdaptor({
            websocket_url:
              'wss://ams-30774.antmedia.cloud:5443/LiveApp/websocket', // Replace with your WebSocket URL
            mediaConstraints: {
              video: true,
              audio: true
            },
            peerconnection_config: {
              iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }]
            },
            sdp_constraints: {
              OfferToReceiveAudio: false, // Usually false for publishing
              OfferToReceiveVideo: false // Usually false for publishing
            },
            localVideoId: 'localVideo', // Changed from remoteVideoId
            callback: (info: any) => {
              if (info === 'initialized') {
                setWebsocketConnected(true)
              }
              if (info === 'publish_started') {
                setPublishing(true)
                console.log('publish started')
              } else if (info === 'publish_finished') {
                setPublishing(false)
                console.log('publish finished')
              }
            },
            callbackError: function (error: any, message: any) {
              console.error('error callback: ' + JSON.stringify(error))
              console.error('error message: ' + message)
              // Re-try mechanism can be implemented here
              if (error === 'publishTimeoutError') {
                // You can try to republish.
              }
              setPublishing(false)
            }
          })
        }
      })
    }
  }, [])

  return (
    <div className='container mx-auto text-center p-4'>
      <div className='mb-4'>
        <div className='flex justify-center'>
          <video
            id='localVideo' // Changed from remoteVideo
            controls
            autoPlay
            muted={true} // Local video is often muted to avoid feedback
            playsInline={true}
            style={{
              width: '70vw',
              height: '75vh',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          ></video>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex justify-center'>
          {!publishing ? (
            <Button
              variant='default'
              disabled={!websocketConnected}
              onClick={handlePublish}
            >
              Start Streaming
            </Button>
          ) : (
            <Button variant='destructive' onClick={handleStopPublishing}>
              Stop Streaming
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default StreamComponent
