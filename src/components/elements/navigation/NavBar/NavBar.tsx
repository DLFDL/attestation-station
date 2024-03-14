import { HStack, Flex } from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import NAV_LINKS from './paths';
import { ColorModeButton } from 'components/elements';
import { Profile } from 'components/elements/Profile/Profile';

const NavBar = () => {
  return (
    <>
    <Flex align="center" justify="space-between">
      <HStack gap={'15px'}>
        <HStack gap={'15px'}>
          {NAV_LINKS.map((link) => (
            <NavItem key={`link-${link.label}`} {...link} />
          ))}
        </HStack>
        <HStack gap={'15px'}>
          <Profile />
          <ColorModeButton />
        </HStack>
      </HStack>
      </Flex>
    </>
  );
};

export default NavBar;