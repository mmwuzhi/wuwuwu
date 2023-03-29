import styled from '@emotion/styled'
import { useMantineColorScheme } from '@mantine/core'
import { useEffect, useState } from 'react'

interface SpotlightProps {
  top?: number
  left?: number
}
const Spotlight = styled.div<SpotlightProps>`
  position: absolute;
  display: ${(props) => (props.theme.colorScheme === 'dark' ? 'inline' : 'none')};
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
  useEffect(() => {
    if (colorScheme === 'light') return
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.clientX, top: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [colorScheme])
  return <Spotlight top={position.top} left={position.left} />
}

export default Flashlight
