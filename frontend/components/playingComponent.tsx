'use client'

import React, { useState, useEffect, useRef } from 'react'
import { WebRTCAdaptor as WebRTCAdaptorType } from '@antmedia/webrtc_adaptor'
import { Button } from '@/components/ui/button'

interface PlayingComponentProps {
  streamId: string
}

const PlayingComponent = ({ streamId }: PlayingComponentProps) => {
  const [playing, setPlaying] = useState(false)
  const [websocketConnected, setWebsocketConnected] = useState(false)
  const webRTCAdaptor = useRef<WebRTCAdaptorType | null>(null)
  const playingStream = useRef<string | null>(null)

  const handlePlay = () => {
    setPlaying(true)
    playingStream.current = streamId
    if (webRTCAdaptor.current) {
      webRTCAdaptor.current.play(streamId)
    }
  }

  const handleStopPlaying = () => {
    setPlaying(false)
    if (webRTCAdaptor.current && playingStream.current) {
      webRTCAdaptor.current.stop(playingStream.current)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@antmedia/webrtc_adaptor').then(({ WebRTCAdaptor }) => {
        if (
          webRTCAdaptor.current === undefined ||
          webRTCAdaptor.current === null
        ) {
          webRTCAdaptor.current = new WebRTCAdaptor({
            websocket_url:
              'wss://ams-30774.antmedia.cloud:5443/LiveApp/websocket',
            mediaConstraints: {
              video: false,
              audio: false
            },
            peerconnection_config: {
              iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }]
            },
            sdp_constraints: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true // Set to true to receive video
            },
            remoteVideoId: 'remoteVideo',
            callback: (info: any) => {
              if (info === 'initialized') {
                setWebsocketConnected(true)
              }
            },
            callbackError: function (error: any, message: any) {
              console.log(error, message)
              if (error === 'no_stream_exist') {
                handleStopPlaying()
                setPlaying(false)
                alert(error)
              }
            }
          })
        }
      })
    }
  }, [])

  return (
    <div className='container mx-auto text-center p-4'>
      <h1 className='text-3xl font-bold mb-8'>Play Page</h1>

      <div className='mb-4'>
        <div className='flex justify-center'>
          <video
            id='remoteVideo'
            controls
            autoPlay
            muted={true}
            playsInline={true}
            style={{
              width: '40vw',
              height: '60vh',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          ></video>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='mb-3 w-full max-w-md'></div>
        <div className='flex justify-center'>
          {!playing ? (
            <Button
              variant='default'
              disabled={!websocketConnected}
              onClick={handlePlay}
            >
              Start Playing
            </Button>
          ) : (
            <Button variant='destructive' onClick={handleStopPlaying}>
              Stop Playing
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayingComponent
