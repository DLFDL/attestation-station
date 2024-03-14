/* eslint-disable */
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import Dropzone from '../Dropzone/Dropzone';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ButtonGroup, Button, Input, FormControl, FormLabel, Text, Textarea, Box, Flex } from '@chakra-ui/react';
import { Profile } from '../Profile/Profile';
import { getEllipsisTxt } from 'utils/format';
import dynamic from 'next/dynamic';

const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
const schemaUID = '0x6a52486eac5d4a1d0bc8cfd1b512c67cc72c7a92cfe706fb3e298f197b8efc7b';

const EASAttest: React.FC = () => {
  const router = useRouter();
  const [fileHash, setFileHash] = useState('');
  const [documentID, setDocumentID] = useState('');
  const [note, setNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [isRevocable, setIsRevocable] = useState<boolean | null>(null);
  const [refUID, setRefUID] = useState('');
  const [showRevocableReminder, setShowRevocableReminder] = useState(false);
  const [showAttestationReminder, setShowAttestationReminder] = useState(false);
  const [error, setError] = useState('');
  const [recipientError, setRecipientError] = useState('');
  const [documentIDError, setDocumentIDError] = useState('');
  const [UIDError, setUIDError] = useState('');
  const [NoteError, setNoteError] = useState('');
  const { connect, isPending, connectors } = useConnect();
  const { address } = useAccount();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const handleFileUpload = async (uploadedFile: File) => {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = `0x${hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')}`;
    setFileHash(hashHex);
    setShowAttestationReminder(false);
  };

  const performAttestation = async () => {
    if (fileHash === null || fileHash === '') {
      console.log('File hash is not calculated yet.');
      setShowAttestationReminder(true);
      return;
    }
    setShowAttestationReminder(false);

    if (isRevocable === null) {
      console.log('Please select if the attestation is revocable.');
      setShowRevocableReminder(true);
      return;
    }
    setShowRevocableReminder(false);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const expirationTimestamp = expirationTime ? Math.floor(new Date(expirationTime).getTime() / 1000) : 0;

      const eas = new EAS(EASContractAddress);
      await eas.connect(signer);

      const schemaEncoder = new SchemaEncoder('bytes32 contentHash,bytes32 documentID,string note');

      const encodedData = schemaEncoder.encodeData([
        { name: 'contentHash', value: fileHash, type: 'bytes32' },
        { name: 'documentID', value: documentID, type: 'bytes32' },
        { name: 'note', value: note, type: 'string' },
      ]);

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: recipient || '0x0000000000000000000000000000000000000000',
          expirationTime: expirationTimestamp,
          revocable: isRevocable === true,
          data: encodedData,
          refUID: refUID || undefined,
        },
      });

      const newAttestationUID = await tx.wait();
      console.log('New attestation UID:', newAttestationUID);

      if (newAttestationUID) {
        router.push(`/attestations/view/${newAttestationUID}`);
      }
    } catch (error) {
      setError('User denied transaction signature.');
    }
  };

  const handleRecipientAddress = (string: string) => {
    const regex = /^0x[a-fA-F0-9]{40}$/.test(string);
    setRecipient(string);
    if (!regex && string.length > 0) {
      setRecipientError('Address is not valid. Please enter a valid Ethereum address.');
    } else {
      setRecipientError('');
    }
  };

  const handleDocumentID = (inputString: string) => {
    setDocumentID(inputString);
    if (inputString.length > 31) {
      setDocumentIDError('Document ID is too long. Please use a shorter identifier.');
    } else {
      setDocumentIDError('');
    }
  };

  const handleUIDAddress = (string: string) => {
    const regex = /^0x[a-fA-F0-9]{64}$/.test(string);
    setRefUID(string);
    if (!regex && string.length > 0) {
      setUIDError('UID is not valid. Please enter a valid UID before submitting.');
    } else {
      setUIDError('');
    }
  };

  const handleNote = (inputString: string) => {
    setNote(inputString);
    if (inputString.length > 550) {
      setNoteError('Note is too long. Please use a shorter note.');
    } else {
      setNoteError('');
    }
  };

  return (
    <div>
      {!isSSR && (
        <>
          <FormControl>
            <FormLabel style={{ fontWeight: 'bold', marginTop: '15px' }} htmlFor="recipient">
              RECIPIENT (OPTIONAL)
            </FormLabel>
            <Text fontSize="sm" color="gray.600" marginBottom="1">
              Ethereum address of the recipient.
            </Text>
            <Input
              id="recipient"
              placeholder="Example: 0x3afE794FD0F5403bBb6d6F1445Dbd3150e65D57a"
              value={recipient}
              onChange={(e) => handleRecipientAddress(e.target.value)}
              style={{ marginBottom: '15px' }}
            />
            {recipientError.length > 0 && (
              <Text color="red.500" mt="2">
                {recipientError}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: '1px' }} htmlFor="documentID">
              DOCUMENT ID (OPTIONAL)
            </FormLabel>
            <Text fontSize="sm" color="gray.600" marginBottom="1">
              A unique identifier referencing a specific file.
            </Text>
            <Input
              id="documentID"
              placeholder="Example: doc007"
              value={documentID}
              onChange={(e) => handleDocumentID(e.target.value)}
              style={{ marginBottom: '15px' }}
            />
            {documentIDError.length > 0 && (
              <Text color="red.500" mt="2">
                {documentIDError}
              </Text>
            )}
          </FormControl>
          {fileHash && (
            <div style={{ marginBottom: '15px', marginTop: '15px' }}>
              <label style={{ fontWeight: 'bold' }}>FILE HASH:</label>
              <input
                type="text"
                value={fileHash}
                readOnly
                style={{
                  marginLeft: '0px',
                  textAlign: 'left',
                  width: '90%',
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>
          )}
          <Box mt="2">
            <Dropzone
              onFileUploaded={handleFileUpload}
              message="Drop a file here, or click to select the file to get its hash."
            />
          </Box>
          <FormControl>
            <FormLabel style={{ fontWeight: 'bold', marginTop: '15px' }} htmlFor="expirationTime">
              EXPIRATION TIME (OPTIONAL)
            </FormLabel>
            <Text fontSize="sm" color="gray.600" marginBottom="1">
              Set the expiration time of the attestation. If not set, the attestation will not expire.
            </Text>
            <Input
              id="expirationTime"
              size="md"
              type="datetime-local"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
              placeholder="Set the expiration time of the attestation. If not set, the attestation will not expire."
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel fontWeight="bold">REFERENCED ATTESTATION (OPTIONAL)</FormLabel>
            <Text fontSize="sm" color="gray.600" marginBottom="1">
              Type in the UID of an attestation you want to reference.
            </Text>
            <Input
              placeholder="Example: 0x6b8dbc93d28f61af8acf737ce10b9bc2c93a9774f0587bbedbf9a8b6642c8687"
              value={refUID}
              onChange={(e) => handleUIDAddress(e.target.value)}
              style={{ marginBottom: '15px' }}
            />
            {UIDError.length > 0 && (
              <Text color="red.500" mt="2">
                {UIDError}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel style={{ fontWeight: 'bold', marginTop: '15px' }} htmlFor="note">
              NOTE (OPTIONAL)
            </FormLabel>
            <Text fontSize="sm" color="gray.600" marginBottom="1">
              A brief comment or annotation.
            </Text>
            <Textarea
              id="note"
              placeholder="Enter your note here..."
              value={note}
              onChange={(e) => handleNote(e.target.value)}
              size="sm"
            />
            {NoteError.length > 0 && (
              <Text color="red.500" mt="2">
                {NoteError}
              </Text>
            )}
          </FormControl>
          <FormControl display="flex" flexDirection="column" alignItems="start" marginTop="4">
            <FormLabel fontWeight="bold">IS REVOCABLE</FormLabel>
            <Text fontSize="sm" color="gray.600" mb="1">
              Allows the attestation to be revoked in the future.
            </Text>
            <ButtonGroup isAttached variant="outline" style={{ width: '100%' }}>
              <Button
                colorScheme={isRevocable === true ? 'green' : 'gray'}
                onClick={() => {
                  setShowRevocableReminder(false);
                  setIsRevocable(true);
                }}
                width="50%"
              >
                Yes
              </Button>
              <Button
                colorScheme={isRevocable === false ? 'red' : 'gray'}
                onClick={() => {
                  setShowRevocableReminder(false);
                  setIsRevocable(false);
                }}
                width="50%"
              >
                No
              </Button>
            </ButtonGroup>
            {showRevocableReminder && (
              <Text color="red.500" mt="2">
                Please select if the attestation is revocable.
              </Text>
            )}
            {showAttestationReminder && (
              <Text color="red.500" mt="2">
                Please select a file to proceed. You may also drag and drop the file in the designated area.
              </Text>
            )}
          </FormControl>
          <div>
            {address ? (
              <div>
                <Button
                  size="md"
                  onClick={performAttestation}
                  isDisabled={Boolean(
                    recipientError.length > 0 || showRevocableReminder || documentIDError || UIDError || NoteError,
                  )}
                  colorScheme="blue"
                  margin="30px 15px"
                  float="right"
                >
                  Make Attestation
                </Button>
              </div>
            ) : (
              <div>
                {...connectors.map((connector) => (
                  <Button
                    size="md"
                    colorScheme="blue"
                    margin="30px 15px"
                    float="right"
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                  >
                    Connect Wallet
                  </Button>
                ))}
              </div>
            )}
          </div>
          {error.length > 0 && (
            <Text color="red.500" mt="2">
              {error}
            </Text>
          )}
        </>
      )}
    </div>
  );
};

export default EASAttest;
