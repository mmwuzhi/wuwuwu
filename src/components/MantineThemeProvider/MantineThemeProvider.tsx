import React, { useState } from 'react'
import { type ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import FlashlightProvider from '../FlashlightProvider'

interface Props {
  children: React.ReactElement
}

const MantineThemeProvider: React.FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <FlashlightProvider>{children}</FlashlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MantineThemeProvider
