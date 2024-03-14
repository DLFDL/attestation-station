import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ColorModeButton, Logo } from 'components/elements';
import { Profile } from '../../elements/Profile/Profile';
import { MenuList, MenuButton, Menu, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavItem } from '../../elements/navigation/NavItem';
import { Show } from '@chakra-ui/react';
import NAV_LINKS from '../../elements/navigation/NavBar/paths';
import Link from 'next/link';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <Logo />
          <Show below="lg">
            <HStack>
              <Menu>
                <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
                <MenuList>
                  {NAV_LINKS.map((link, index) => (
                    <MenuItem key={index}>
                      <Link href={link.href ? link.href : ''}>{link.label}</Link>
                    </MenuItem>
                  ))}
                  <MenuItem key="profile">
                    <div>
                      <Profile />
                    </div>
                  </MenuItem>
                  <MenuItem key="color-mode">
                    <ColorModeButton />
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Show>
          <Show above="lg">
            <HStack gap={'15px'}>
              {NAV_LINKS.map((link) => (
                <NavItem key={`link-${link.label}`} {...link} />
              ))}
            </HStack>
          </Show>
          <Show above="lg">
            <HStack gap={'15px'}>
              <Profile />
              <ColorModeButton />
            </HStack>
          </Show>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;