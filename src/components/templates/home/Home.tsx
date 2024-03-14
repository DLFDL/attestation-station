import { Heading, VStack } from '@chakra-ui/react';
import { EASAttest } from 'components/elements/EASAttest';


const Home = () => {
  return (
    <VStack w={'full'}>
      <Heading size="md" marginBottom={10} textAlign="center">
      Certify and Verify any Files with the Blockchain-based Attestation Station
      </Heading>
      <EASAttest />
    </VStack>
  );
};

export default Home;