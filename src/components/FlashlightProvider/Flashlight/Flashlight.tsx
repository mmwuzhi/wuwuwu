import styled from '@emotion/styled'
import {
  forwardRef,
  type ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

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
  z-index: 999;
  box-shadow: 0 0 0 2560px rgba(0, 0, 0, 0.92), 0 0 20px 0px #000 inset;
  border-radius: 100%;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
`

export interface FlashlightHandlers {
  handleToggleFlashlight: (event: MouseEvent) => void
}

const Flashlight: ForwardRefRenderFunction<FlashlightHandlers> = (_, ref) => {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [isShow, setIsShow] = useState(false)

  const handleToggleFlashlight = useCallback((e: MouseEvent) => {
    setPosition({ left: e.clientX, top: e.clientY })
    setIsShow((prev) => !prev)
  }, [])

  useImperativeHandle(ref, () => ({ handleToggleFlashlight }))

  useEffect(() => {
    if (!isShow) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.clientX, top: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isShow])

  return <Spotlight top={position.top} left={position.left} isShow={isShow} />
}

export default forwardRef(Flashlight)
