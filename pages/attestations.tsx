import { useEffect, useState } from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useAccount } from 'wagmi';
import { Default } from 'components/layouts/Default';
import { getEllipsisTxt } from 'utils/format';
import { useRouter } from 'next/router';
import { Spinner, Center, Text } from '@chakra-ui/react';
import { modifyHex } from 'helpers/helpers';

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [secondData, setSecondData] = useState<any>(null);
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const {address: attesterAddress} = useAccount();
  const router = useRouter();
  const [itemOffset, setItemOffset] = useState(0);
  const [secondItemOffset, setSecondItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const secondEndOffset = secondItemOffset + itemsPerPage;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handlePageClickSecondData = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % secondData.length;
    setSecondItemOffset(newOffset);
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
            attestations(where: { 
              schemaId: { equals: "${schemaUID}" },
              attester: { equals:"${attesterAddress}"} }, orderBy: [{ timeCreated: desc }]) {
              id
              attester
              recipient
              refUID
              time
              revocable
              revocationTime
              expirationTime
              data
              txid
            }
            attestationsAsRecipient: attestations(where: { 
              schemaId : { equals: "${schemaUID}" },
              recipient: { equals:"${attesterAddress}"} }, orderBy: [{ timeCreated: desc }]) {
              id
              attester
              recipient
              refUID
              time
              revocable
              revocationTime
              expirationTime
              data
              txid
            }
          }`,
        }),
      });

      const responseData = await results.json();

      const transformedData = [
        ...responseData.data.attestations.map((attestation: any) => ({
          id: attestation.id,
          documentID: attestation.data,
          creationTime: attestation.time,
          attester: attestation.attester,
          expirationTime: attestation.expirationTime,
          contentHash: attestation.data,
          revocable: attestation.revocable,
          recipient: attestation.recipient,
          txid: attestation.txid,
        })),
      ];

      const transformedData2 = [
        ...responseData.data.attestationsAsRecipient.map((attestation: any) => ({
          id: attestation.id,
          documentID: attestation.data,
          creationTime: attestation.time,
          attester: attestation.attester,
          expirationTime: attestation.expirationTime,
          contentHash: attestation.data,
          revocable: attestation.revocable,
          recipient: attestation.recipient,
          txid: attestation.txid,
        })),
      ];

      setData(transformedData);
      setSecondData(transformedData2);
    }

    fetchData();
  }, []);

  const handleRedirect = (id: string, txid: string) => {
    router.push({
      pathname: `attestations/view/${id}`,
      query: { txid },
    });
  };

  if (!data) {
    return (
      <Center flexDirection="column" height="100vh">
        <Spinner size="xl" />
        <Text mt="4">Loading your data, please wait...</Text>
      </Center>
    );
  }

  return (
    <Default pageName="Attestations">
      <Box p={5}>
        <Heading size="md" marginBottom={10} textAlign="center">
          Attestations
        </Heading>
        <Tabs>
          <TabList>
            <Tab>My Attestations</Tab>
            <Tab>Received Attestations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {data && data.length > 0 ? (
                (() => {
                  const currentItems = data.slice(itemOffset, endOffset);
                  const pageCount = Math.ceil(data.length / itemsPerPage);
                  return (
                    <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
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
                            {currentItems?.map((item: any, id: number) => {
                              const documentID = modifyHex(item.documentID);
                              return (
                                <Tr
                                  key={id}
                                  _hover={{ bgColor: hoverTrColor }}
                                  cursor="pointer"
                                  onClick={() => handleRedirect(item.id, item.txid)}
                                >
                                  <Td>{documentID.length > 0 ? documentID : 'Not Provided'}</Td>
                                  <Td>{new Date(item.creationTime * 1000).toLocaleString()}</Td>
                                  <Td>{getEllipsisTxt(item.attester)}</Td>
                                  <Td>
                                    {item.recipient !== '0x0000000000000000000000000000000000000000'
                                      ? getEllipsisTxt(item.recipient)
                                      : 'No recipient'}
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <Flex color="white" justifyContent="end" mt={5}>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel={<Button colorScheme="blue">Next</Button>}
                          className="pagination"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={10}
                          pageCount={pageCount}
                          previousLabel={<Button colorScheme="blue">Previous</Button>}
                          renderOnZeroPageCount={null}
                          pageClassName="page-count"
                        />
                      </Flex>
                    </Box>
                  );
                })()
              ) : (
                <Text textAlign="center" mt={5}>
                  Looks like you do not have any attestations.
                </Text>
              )}
            </TabPanel>
            <TabPanel>
              {secondData && secondData.length > 0 ? (
                (() => {
                  const currentItems2 = secondData.slice(secondItemOffset, secondEndOffset);
                  return (
                    <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
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
                            {currentItems2?.map((item: any, id: number) => {
                              const documentID = modifyHex(item.documentID);
                              return (
                                <Tr
                                  key={id}
                                  _hover={{ bgColor: hoverTrColor }}
                                  cursor="pointer"
                                  onClick={() => handleRedirect(item.id, item.txid)}
                                >
                                  <Td>{documentID.length > 0 ? documentID : 'Not Provided'}</Td>
                                  <Td>{new Date(item.creationTime * 1000).toLocaleString()}</Td>
                                  <Td>{getEllipsisTxt(item.attester)}</Td>
                                  <Td>
                                    {item.recipient !== '0x0000000000000000000000000000000000000000'
                                      ? getEllipsisTxt(item.recipient)
                                      : 'No recipient'}
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <Flex color="white" justifyContent="end" mt={5}>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel={<Button colorScheme="blue">Next</Button>}
                          className="pagination"
                          onPageChange={handlePageClickSecondData}
                          pageRangeDisplayed={12}
                          pageCount={0}
                          previousLabel={<Button colorScheme="blue">Previous</Button>}
                          renderOnZeroPageCount={null}
                          pageClassName="page-count"
                        />
                      </Flex>
                    </Box>
                  );
                })()
              ) : (
                <Text textAlign="center" mt={5}>
                  Looks like you do not have any attestations.
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Default>
  );
}