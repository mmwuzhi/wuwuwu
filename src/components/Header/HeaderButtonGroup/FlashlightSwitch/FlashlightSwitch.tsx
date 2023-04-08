import React from 'react'
import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { MdOutlineFlashlightOff, MdOutlineFlashlightOn } from 'react-icons/md'
import { useFlashlightEventEmitter } from '@/components/FlashlightProvider'
import { useToggle } from '@mantine/hooks'

type SpotlightStatus = 'on' | 'off'

const FlashlightSwitch: React.FC = () => {
  const [spotlightStatus, toggle] = useToggle<SpotlightStatus>(['off', 'on'])
  const theme = useMantineTheme()
  const { emit } = useFlashlightEventEmitter()

  const handleSwitchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle()
    emit('toggle', { left: e.nativeEvent.clientX, top: e.nativeEvent.clientY })
  }

  const spotlightIcon: Record<SpotlightStatus, React.ReactNode> = {
    on: <MdOutlineFlashlightOn />,
    off: <MdOutlineFlashlightOff />,
  }

  return (
    <Tooltip label="开启/关闭手电筒">
      <ActionIcon
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        variant="default"
        size="md"
        onClick={handleSwitchClick}
      >
        {spotlightIcon[spotlightStatus]}
      </ActionIcon>
    </Tooltip>
  )
}

export default FlashlightSwitch
