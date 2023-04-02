import React from 'react'
import { Group, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import { useFlashlightRef } from '../FlashlightProvider'

const ThemeSwitch: React.FC = () => {
  const theme = useMantineTheme()
  const { toggleColorScheme } = useMantineColorScheme()
  const flashlightRef = useFlashlightRef()

  const handleSwitchClick = (e: React.MouseEvent<HTMLInputElement>) => {
    flashlightRef?.current?.handleToggleFlashlight?.(e.nativeEvent)
    toggleColorScheme()
  }

  return (
    <Group position="center">
      <Switch
        size="md"
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
        onClick={handleSwitchClick}
      />
    </Group>
  )
}

export default ThemeSwitch
