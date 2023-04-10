import React from 'react'
import { Group, Header as MantineHeader, Text } from '@mantine/core'
import Link from 'next/link'
import HeaderButtonGroup from './HeaderButtonGroup'

const Header: React.FC = () => {
  return (
    <MantineHeader height="3rem">
      <Group position="apart" p="xs">
        <Link href="/" passHref aria-label="go to homepage">
          <Text>wuwuwu.cc</Text>
        </Link>
        <HeaderButtonGroup />
      </Group>
    </MantineHeader>
  )
}

export default Header
