import React, { createContext, useContext, useRef } from 'react'
import Flashlight, { type FlashlightHandlers } from './Flashlight'

interface Props {
  children: React.ReactElement
}

const FlashlightRefContext = createContext<React.RefObject<FlashlightHandlers> | null>(null)

const FlashlightProvider: React.FC<Props> = ({ children }) => {
  const flashlightRef = useRef<FlashlightHandlers>(null)

  return (
    <FlashlightRefContext.Provider value={flashlightRef}>
      <Flashlight ref={flashlightRef} />
      {children}
    </FlashlightRefContext.Provider>
  )
}

export const useFlashlightRef = () => useContext(FlashlightRefContext)
export default FlashlightProvider
