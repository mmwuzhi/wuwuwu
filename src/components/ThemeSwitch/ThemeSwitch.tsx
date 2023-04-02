import React from 'react'
import {
  ActionIcon,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  type ColorScheme,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import { useFlashlightRef } from '../FlashlightProvider'

const ThemeSwitch: React.FC = () => {
  const theme = useMantineTheme()
  const { toggleColorScheme } = useMantineColorScheme()
  const flashlightRef = useFlashlightRef()

  const handleSwitchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    flashlightRef?.current?.handleToggleFlashlight?.(e.nativeEvent)
    toggleColorScheme()
  }

  const themeIcon: Record<ColorScheme, React.ReactNode> = {
    light: <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />,
    dark: <IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />,
  }

  return (
    <Group position="right">
      <ActionIcon
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        variant="default"
        size="md"
        onClick={handleSwitchClick}
      >
        {themeIcon[theme.colorScheme]}
      </ActionIcon>
    </Group>
  )
}

export default ThemeSwitch
