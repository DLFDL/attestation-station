import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@chakra-ui/react';
import { injected } from 'wagmi/connectors'
import { getEllipsisTxt } from 'utils/format';

export const Profile = () => {
  const { address } = useAccount();
  const { connect, isPending, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return <div>loading...</div>;
  }

  if (address) {
    return (
      <>
        <Button
          size="sm"
          colorScheme="blue"
          className="d-flex justify-content-center align-items-center vh-100"
          style={{
            maxWidth: '200px',
            overflow: 'hidden',
          }}
          onClick={() => disconnect()}
        >
          <div className="text-center">
            <p>{getEllipsisTxt(address)}</p>
          </div>
        </Button>
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <p>Connecting...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {!address ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Button size="sm" colorScheme="blue" onClick={() => connect({ connector: injected() })}>
            {connectors.length > 0 ? 'Connect Wallet' : 'Wallet not installed'}
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          colorScheme="blue"
          className="d-flex justify-content-center align-items-center vh-100"
          style={{
            maxWidth: '200px',
            overflow: 'hidden',
          }}
          onClick={() => disconnect()}
        >
          <div className="text-center">
            <p>{getEllipsisTxt(address)}</p>
          </div>
        </Button>
      )}
    </>
  );
};