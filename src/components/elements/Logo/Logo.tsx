import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === 'dark' ? '/Logo-DarkBG.svg' : '/Logo-LightBG.svg'}
      height={45}
      width={150}
      alt="Attestation Station"
    />
  );
};

export default Logo;