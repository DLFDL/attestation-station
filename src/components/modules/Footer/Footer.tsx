import { Box, Link, Text } from '@chakra-ui/react'; 

const Footer = () => {
  return (
    <Box as="footer" bg="neutral.100" textAlign="center" w="full" p={4}>
      <Text fontSize="md">
        Powered by{' '}
        <Link href="https://attest.sh/" isExternal color="blue.500">
          Ethereum Attestation Service
        </Link>
      </Text>
      <Text fontSize="md">
        Created with 😄 by DLFDL
      </Text>
    </Box>
  );
};

export default Footer;