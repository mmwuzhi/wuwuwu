import React, { createContext } from 'react'
import Flashlight from './Flashlight'
import EventEmitter, { BaseEvents } from '@/utils/EventEmitter'
import useEventEmitter from '@/hooks/useEventEmitter'

interface Props {
  children: React.ReactElement
}

interface FlashlightEvents extends BaseEvents {
  toggle: [{ left: number; top: number }]
}

const FlashlightRefContext = createContext<EventEmitter<FlashlightEvents>>(null as any)

const FlashlightProvider: React.FC<Props> = ({ children }) => {
  return (
    <FlashlightRefContext.Provider value={new EventEmitter<FlashlightEvents>()}>
      <Flashlight />
      {children}
    </FlashlightRefContext.Provider>
  )
}

export const useFlashlightEventEmitter = () => useEventEmitter(FlashlightRefContext)
export default FlashlightProvider
