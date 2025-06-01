'use client'

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react'
import { Bank, Home, User } from 'iconoir-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
/**
 * This component uses the UI Kit to navigate between pages
 * Bottom navigation is the most common navigation pattern in Mini Apps
 * We require mobile first design patterns for mini apps
 * Read More: https://docs.world.org/mini-apps/design/app-guidelines#mobile-first
 */

export const Navigation = () => {
  const [value, setValue] = useState('home')
  const router = useRouter()
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabItem
        value='home'
        icon={<Home />}
        label='Home'
        onClick={() => router.push('/home')}
      />
      <TabItem
        value='streams'
        icon={<Home />}
        label='Streams'
        onClick={() => router.push('/streams')}
      />
      <TabItem
        value='your-stream'
        icon={<Home />}
        label='Your Stream'
        onClick={() => router.push('/your-stream')}
      />
    </Tabs>
  )
}
