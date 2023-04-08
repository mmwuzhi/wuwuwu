import React, { useState } from 'react'
import { type ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'

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
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MantineThemeProvider
