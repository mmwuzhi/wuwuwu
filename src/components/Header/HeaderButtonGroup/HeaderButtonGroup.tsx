import { Group } from '@mantine/core'
import React from 'react'
import FlashlightSwitch from './FlashlightSwitch'
import ThemeSwitch from './ThemeSwitch'

const HeaderButtonGroup: React.FC = () => {
  return (
    <Group>
      <FlashlightSwitch />
      <ThemeSwitch />
    </Group>
  )
}

export default HeaderButtonGroup
