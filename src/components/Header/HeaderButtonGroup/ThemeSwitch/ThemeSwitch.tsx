import React from 'react'
import {
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
  type ColorScheme,
} from '@mantine/core'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const ThemeSwitch: React.FC = () => {
  const theme = useMantineTheme()
  const { toggleColorScheme } = useMantineColorScheme()

  const themeIcon: Record<ColorScheme, React.ReactNode> = {
    light: <MdOutlineLightMode />,
    dark: <MdOutlineDarkMode />,
  }

  return (
    <Tooltip label="切换主题">
      <ActionIcon
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        variant="default"
        size="md"
        onClick={() => toggleColorScheme()}
      >
        {themeIcon[theme.colorScheme]}
      </ActionIcon>
    </Tooltip>
  )
}

export default ThemeSwitch
