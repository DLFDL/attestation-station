import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const About = () => {
  return (
    <Box p={5}>
      <Heading size="md" marginBottom={10} textAlign="center">Welcome to Attestation Station: Empowering Trust through Blockchain</Heading>
      <Text mt={4}>
        In today’s digital age, the authenticity and ownership of digital files are paramount. Attestation Station harnesses the Ethereum Attestation Service's (EAS) power to offer an unparalleled solution for certifying and verifying the existence and possession of any file. Our platform leverages blockchain technology to provide a secure, immutable, and transparent document authentication and verification method.
      </Text>
      <Heading size="ms" mt={6}>Why Choose Attestation Station?</Heading>
      <List spacing={3} mt={4}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Immutable Certification: Securely certify the existence of any document or file at a specific point in time, leveraging Ethereum's blockchain for undeniable proof.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Transparent Verification: Easily verify the authenticity and possession of documents, ensuring trust and integrity in digital transactions.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Decentralised Security: With the Ethereum blockchain, enjoy a decentralised framework that protects your documents against tampering and fraud.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          User-Friendly Interface: Our platform is designed with simplicity, making it easy for anyone to certify and verify documents in just a few clicks.
        </ListItem>
      </List>
      <Heading size="ms" mt={6}>Our Technology</Heading>
      <Text mt={4}>
        Our service is built on the principle of hashing files—a process that generates a unique digital fingerprint for each file. This hash is then attested on the Sepolia Ethereum blockchain, providing a tamper-proof record of the file's existence at a specific time. Whether you're a content creator seeking to protect your intellectual property or a business aiming to secure contractual agreements, Attestation Station offers the transparency, security, and reliability you need.
      </Text>
      <Heading size="ms" mt={6}>How It Works</Heading>
      <List spacing={3} mt={4}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Certify: Upload your file to generate a unique digital fingerprint (hash). This hash and your attestation are securely recorded on the Sepolia Ethereum blockchain.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Verify: Any stakeholder can verify the authenticity and timestamp of your document by comparing the blockchain-stored hash with the file’s current hash.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Trust: Build and maintain trust with transparent, verifiable records of your documents' authenticity and ownership.
        </ListItem>
      </List>
      <Heading size="ms" mt={6}>Join Attestation Station Today</Heading>
      <Text mt={4}>
        Embrace the future of document authentication with Attestation Station. Whether you’re looking to protect intellectual property, certify legal documents, or ensure the authenticity of your digital files, our platform provides the tools you need to establish trust in a trustless world.
      </Text>
    </Box>
  );
};

export default About;