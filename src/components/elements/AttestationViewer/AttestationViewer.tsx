/* eslint-disable */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { EAS } from '@ethereum-attestation-service/eas-sdk';
import { useRouter } from 'next/router';
import Dropzone from '../Dropzone/Dropzone';
import { Spinner, Center, Text } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';
import ReactPaginate from 'react-paginate';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  useColorModeValue,
  TableContainer,
  Button,
  Flex,
} from '@chakra-ui/react';
import {
  sliceElements,
  openTxDetails,
  removeFirstChars,
  splitStringInto64Chars,
  bytes32ToString,
} from 'helpers/helpers';

const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';

const decodeData = (value: string) => {
  try {
    return ethers.utils.parseBytes32String(value);
  } catch (error) {
    console.error('Error decoding data:', error);
    return value;
  }
};

const AttestationViewer = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const router = useRouter();
  const {id} = router.query;
  const [attestation, setAttestation] = useState<any>();
  const [contentHash, setContentHash] = useState('');
  const [documentID, setDocumentID] = useState('');
  const [loading, setLoading] = useState(true);
  const idToString = id?.toString() ?? '';
  const [fileHash, setFileHash] = useState('');
  const [revokeLoading, setRevokeLoading] = useState(false);
  const [revokeStatus, setRevokeStatus] = useState('');
  const [isFileAuthentic, setIsFileAuthentic] = useState(false);
  const [referencedAttestations, setReferencedAttestations] = useState<any>();
  const {colorMode} = useColorMode();
  const [txid, setTxid] = useState<any>();
  const isDark = colorMode === 'dark';
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % referencedAttestations.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const style = {
    container: {
      padding: '20px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      backgroundColor: isDark ? '#333' : '#f9f9f9',
      borderRadius: '8px',
      boxShadow: isDark ? '0 2px 4px rgba(255,255,255,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '20px auto',
      color: isDark ? '#f9f9f9' : '#333',
    },
    header: {
      marginBottom: '20px',
      fontWeight: 'normal',
      color: isDark ? '#f9f9f9' : '#333',
    },
    label: {
      fontWeight: 'bold',
      color: isDark ? '#4da8da' : '#0056b3',
    },
    row: {
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: isDark ? '#424242' : '#fff',
      borderRadius: '4px',
      color: isDark ? '#f9f9f9' : '#333',
    },
    link: {
      color: isDark ? '#4da8da' : '#0056b3',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    async function fetchData() {
      const schemaUID = '0x6a52486eac5d4a1d0bc8cfd1b512c67cc72c7a92cfe706fb3e298f197b8efc7b';

      const results = await fetch('https://sepolia.easscan.org/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            attestations(where: { refUID: { equals: "${id}" }},
            orderBy: [{ timeCreated: desc }]
            ) {
              refUID
              id
              data
              decodedDataJson
              timeCreated
              attester
              recipient
            }
          }`,
        }),
      });
      const responseData = await results.json();

      if (responseData && responseData.data && responseData.data.attestations) {
        setReferencedAttestations(responseData.data.attestations);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (attestation && attestation.data) {
      const elements = sliceElements(attestation.data);

      setContentHash(elements[0]);
      setDocumentID(decodeData(elements[1]) || '');
    }
  }, [attestation]);

  const handleFileUpload = async (uploadedFile: File) => {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = `0x${hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')}`;
    setFileHash(hashHex);

    performVerification(hashHex);
  };

  const performVerification = async (fileHash: string) => {
    setLoading(true);
    if (!attestation || !contentHash) {
      console.error('Attestation data or document hash is not available for verification.');
      setLoading(false);
      return;
    }
    if (fileHash === contentHash) {
      console.log('Verification Successful: The document is authentic.');
      setIsFileAuthentic(true);
    } else {
      setIsFileAuthentic(false);
      console.log("Verification Failed: The document's hash does not match the attestation.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchAttestation = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const eas = new EAS(EASContractAddress);
        await eas.connect(provider);

        if (id) {
          const attestationData = await eas.getAttestation(idToString);

          if (attestationData) {
            setAttestation(attestationData);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
      setLoading(false);
    };

    fetchAttestation();
  }, [id]);

  useEffect(() => {
    if (router.query.txid) {
      setTxid(router.query.txid);
    }
  }, [router.query]);

  const handleRevoke = async () => {
    if (!id || !attestation) {
      console.error('Attestation UID is missing or attestation data is not loaded.');
      return;
    }
    setRevokeLoading(true);
    setRevokeStatus('');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const eas = new EAS(EASContractAddress);
      await eas.connect(signer);

      const revocationResponse = await eas.revoke(
        {
          schema: attestation.schema,
          data: { uid: idToString },
        },
        {},
      );

      await revocationResponse.wait();
      setRevokeStatus('Attestation has been successfully revoked.');
    } catch (error) {
      console.error('Error revoking attestation:', error);
      setRevokeStatus('Failed to revoke attestation. Please try again.');
    } finally {
      setRevokeLoading(false);
    }
  };

  const handleRedirect = (id: string, txid: string) => {
    router.push({
      pathname: `${id}`,
      query: { txid },
    });
  };

  if (!attestation) {
    return (
      <Center flexDirection="column" height="50vh">
        <Spinner size="xl" />
        <Text mt="4">Loading attestation, please wait...</Text>
      </Center>
    );
  }

  const hex = removeFirstChars(attestation.data, 130);
  let decodedString = bytes32ToString(hex);
  const convertedNote = decodedString.replace(/[^a-zA-Z ]/g, '');

  return (
    <Box p={5}>
      <Heading size="md" marginBottom={10} textAlign="center">
        Attestation Details
      </Heading>
      {attestation.revocationTime > 0 && (
        <div
          style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center' }}
        >
          This attestation was revoked on {new Date(attestation.revocationTime * 1000).toLocaleString()}
        </div>
      )}
      <div style={style.container}>
        <div style={style.row}>
          <span style={style.label}>UID:</span> {attestation.uid}
        </div>
        <div style={style.row}>
          <span style={style.label}>Document ID:</span> {documentID || 'Not Provided'}
        </div>
        <div style={style.row}>
          <span style={style.label}>File Hash:</span> {contentHash}
        </div>
        <div style={style.row}>
          <span style={style.label}>Note:</span> {convertedNote || 'Not Provided'}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <Dropzone
            onFileUploaded={handleFileUpload}
            message="Drop a file here, or click to select the file to verify its hash."
          />
        </div>
        {fileHash.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
            {isFileAuthentic !== null && (
              <p style={{ color: isFileAuthentic ? 'green' : 'red' }}>
                {isFileAuthentic
                  ? 'Verification Successful: The document is authentic.'
                  : "Verification Failed: The document's hash does not match the attestation."}
              </p>
            )}
          </div>
        )}
        <div style={style.row}>
          <span style={style.label}>Creatied:</span> {new Date(attestation.time * 1000).toLocaleString()}
        </div>
        <div style={style.row}>
          <span style={style.label}>Expiration:</span>{' '}
          {attestation.expirationTime > 0 ? new Date(attestation.expirationTime * 1000).toLocaleString() : 'Never'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Revocable:</span> {attestation.revocable ? 'Yes' : 'No'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Revoked:</span> {attestation.revocationTime > 0 ? 'Yes' : 'No'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Recipient: </span>
          {attestation.recipient && attestation.recipient !== '0x0000000000000000000000000000000000000000'
            ? attestation.recipient
            : 'No recipient'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Attester:</span> {attestation.attester}
        </div>
        <div style={style.row}>
          <span style={style.label}>Referenced Attestation: </span>
          {attestation.refUID &&
          attestation.refUID !== '0x0000000000000000000000000000000000000000000000000000000000000000'
            ? attestation.refUID
            : 'No reference'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Referencing Attestations: </span>
          {referencedAttestations && referencedAttestations.length + ' attestations referencing this one'}
        </div>
        <div style={style.row}>
          <span style={style.label}>Transaction ID:</span>{' '}
          <span style={style.link} onClick={() => openTxDetails(txid)}>
            {txid}
          </span>
        </div>
        <div style={style.row}>
          <span style={style.label}>Raw Data:</span>
          <div
            style={{
              maxHeight: '100px',
              overflowY: 'scroll',
            }}
          >
            {attestation.data}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
          marginBottom: '30px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {attestation && attestation.revocable && attestation.revocationTime._hex === '0x00' && (
          <Button
            colorScheme="red"
            isLoading={revokeLoading}
            onClick={handleRevoke}
            disabled={revokeLoading || attestation.revocationTime > 0}
          >
            Revoke Attestation
          </Button>
        )}
        {revokeStatus && <p style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>{revokeStatus}</p>}
      </div>
      {referencedAttestations &&
        referencedAttestations.length > 0 &&
        (() => {
          const currentItems = referencedAttestations.slice(itemOffset, endOffset);
          const pageCount = Math.ceil(referencedAttestations.length / itemsPerPage);

          return (
            <div style={style.container}>
              <div style={style.row}>
                <span style={style.label}>Latest Referencing Attestations: </span>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Document ID</Th>
                        <Th>Creation Time</Th>
                        <Th>Attester</Th>
                        <Th>Recipient</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {currentItems.map((item: any, index: number) => {
                        const data = sliceElements(item.data);
                        return (
                          <Tr
                            key={index}
                            _hover={{ bgColor: hoverTrColor }}
                            cursor="pointer"
                            onClick={() => handleRedirect(item.id, item.txid)}
                          >
                            <Td>{decodeData(data[1])}</Td>
                            <Td>{new Date(item.timeCreated * 1000).toLocaleString()}</Td>
                            <Td>{getEllipsisTxt(item.attester)}</Td>
                            <Td>{getEllipsisTxt(item.recipient)}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex color="white" justifyContent='end' mt={2}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<Button colorScheme="blue">Next</Button>}
                    className="pagination"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={6}
                    pageCount={pageCount}
                    previousLabel={<Button colorScheme="blue">Previous</Button>}
                    renderOnZeroPageCount={null}
                    pageClassName="page-count"
                  />
                </Flex>
              </div>
            </div>
          );
        })()}
    </Box>
  );
};

export default AttestationViewer;