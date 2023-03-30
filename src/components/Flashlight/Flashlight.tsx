import styled from '@emotion/styled'
import { useMantineColorScheme } from '@mantine/core'
import { useEffect, useState } from 'react'

interface SpotlightProps {
  top?: number
  left?: number
  isShow: boolean
}
const Spotlight = styled.div<SpotlightProps>`
  position: fixed;
  display: ${(props) => (props.isShow ? 'inline' : 'none')};
  top: ${(props) => props.top + 'px' ?? '50%'};
  left: ${(props) => props.left + 'px' ?? '50%'};
  width: 300px;
  height: 300px;
  z-index: 1;
  box-shadow: 0 0 0 2560px rgba(0, 0, 0, 0.92), 0 0 20px 0px #000 inset;
  border-radius: 100%;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
`

const Flashlight = () => {
  const { colorScheme } = useMantineColorScheme()
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (colorScheme === 'light' || isMobile) {
      setIsShow(false)
      return
    } else {
      setIsShow(true)
    }
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.clientX, top: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [colorScheme])

  return <Spotlight top={position.top} left={position.left} isShow={isShow} />
}

export default Flashlight
