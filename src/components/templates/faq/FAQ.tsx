import React from 'react';
import { Box, Heading, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link } from '@chakra-ui/react';

const FAQ = () => {
  return (
    <Box p={5}>
      <Heading size="md" marginBottom={10} textAlign="center">
        Frequently Asked Questions
      </Heading>
      <VStack spacing={5} align="stretch">
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How does Attestation Station certify documents?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            We use the SHA-256 cryptographic algorithm to create a unique hash of your file, which is then recorded on the Sepolia Ethereum blockchain. 
            This process provides a secure and immutable certification of your document's existence at the time of attestation.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                What is SHA-256?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            SHA-256, short for Secure Hash Algorithm 256-bit, is a cryptographic hash function from the SHA-2 family. 
            It plays a critical role in cryptography and is essential for operating contemporary technologies like blockchain systems. 
            This algorithm produces a unique, fixed-size 256-bit (32-byte) hash, making it a standard for data integrity verification across various digital platforms and applications.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                What is a hash, and how does it function?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            A hash function, such as SHA256, processes an input and generates a fixed-size string of bytes, known as a 'digest'. 
            This digest is uniquely associated with its specific input. 
            Remarkably, altering just a minor detail of the input – such as a single letter or a pixel – results in a significantly different digest, a phenomenon known as the avalanche effect. 
            This characteristic of hashing makes it an invaluable mechanism for confirming the integrity of data, ensuring that any modifications to the original input can be reliably detected.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                Is it possible to recover the original content of a file using its hash?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            No, retrieving the original content of a file from its hash is impossible. 
            Hash functions are designed to be one-way, making it infeasible to reverse-engineer the original file from its hash, much like you cannot reconstruct fruits from a smoothie. 
            Our hash algorithm generates a 32-byte output, represented as a 64-character hexadecimal string. 
            This results in 2<sup>256</sup> — approximately 1.1579209 × 10<sup>77</sup> — (115 792 089 237 316 195 423 570 985 008 687 907 853 269 984 665 640 564 039 457 584 007 913 129 639 936) 
            possible hash values, making it virtually impossible to calculate any input that would produce a specific predetermined hash output.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What types of files can I certify?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            An Attestation Station can certify all digital files, including PDFs, images, videos, and text documents. 
            Our platform ensures that the integrity and ownership of your digital assets are verifiably maintained.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Is my document stored on the blockchain?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            No, only the hash of your document is stored on the blockchain. 
            This ensures your privacy and security while enabling the verification of your document's authenticity and timestamp.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What happened to my file, and where was it sent?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Your file is securely hashed within your browser, ensuring it never leaves your device. 
          We transmit the file's metadata, precisely its hash, to the Ethereum Attestation Service and Sepolia Ethereum Blockchain. 
          This means only the digital fingerprint of your file is shared, preserving the confidentiality of the actual content.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How can others verify my document?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Verifiers can use the Attestation Station to compare the blockchain hash with the current document's hash. 
            If the hashes match, it confirms the document's authenticity and the exact state at attestation.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Can I edit an attestation after it's been made?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          No, attestations are designed to be immutable to ensure their integrity and reliability. 
          If modifications are needed, the standard procedure involves the issuer revoking the original attestation and issuing a new one to reflect the changes.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Why is it crucial to maintain the original state of an attested document?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Maintaining an unmodified record of each document version that has been attested is paramount. 
          Ensuring you have a securely stored copy of the document as it existed at the moment of attestation is crucial. 
          This practice is essential for future verification of the document's integrity and authenticity. 
          Any alterations made to the document after its attestation can be identified by comparing the current version with the stored initially hashed version.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What is a Referenced Attestation?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          A Referenced Attestation is a Unique Identifier (UID) of an existing attestation. 
          This feature lets you connect one attestation to another, creating a linked chain of attestations. 
          By referencing a previous attestation’s UID when creating a new one, you establish a direct relationship between them, 
          which can be helpful in tracking a sequence of related attestations or adding context to the current attestation. 
          This linkage enhances the clarity and integrity of the attestation process.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Can attestations be revoked?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Yes, attestations can be revoked if the issuer selects the revocation option at the time of attestation creation. 
          The Attestation Station supports the functionality to revoke an attestation, which alters its status to "revoked" in the system. 
          However, it's important to note that the attestation is not deleted from the blockchain but remains permanently recorded.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                What does it mean to make an attestation revocable?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            When you make an attestation revocable, you have the option to invalidate or cancel it at a later time. 
            This flexibility allows you to retract the attestation if circumstances change, 
            such as new information emerging that affects the accuracy or relevance of the attested information.
            </AccordionPanel>
          </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              How can I connect to the Attestation Station?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          To access the Attestation Station, a digital wallet is required. 
          For a seamless experience, we suggest using {' '}
          <Link href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask/" isExternal color="blue.500">
          MetaMask</Link>, a widely recognised and user-friendly option.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Which network should I choose?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Currently, our services are exclusively available on the Sepolia testnet. 
          Sepolia is a Proof-of-Stake (PoS) testnet that offers developers a cost-free environment to deploy and test smart contracts, 
          making it an ideal choice for development and testing purposes.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Where else can I check my attestations?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          You can verify your attestations using the Sepolia Ethereum Attestation Service Scanner at {' '} 
          <Link href="https://sepolia.easscan.org/" isExternal color="blue.500">
          https://sepolia.easscan.org. </Link> 
          The Sepolia Testnet Etherscan, available at 
          {' '} <Link href="https://sepolia.etherscan.io/" isExternal color="blue.500">
          https://sepolia.etherscan.io</Link>, is another resource for reviewing your attestations.  
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What are the costs associated with using an Attestation Station?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Attestation Station is a free service. However, users should be aware that executing attestations involves network gas fees. 
          These fees fluctuate depending on the current network congestion and the attestation's complexity. 
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Where can I obtain gas for attesting my files?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          You can use resources such as Sepolia faucets to obtain the required gas for transactions. One such faucet is{' '}
          <Link href="https://sepolia-faucet.pk910.de/" isExternal color="blue.500">
            Sepolia PoW Faucet </Link> where you can easily acquire the necessary gas for your transactions. 
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What can I do with leftover or unwanted ETH?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          If you find yourself with unwanted ETH, one productive option is to contribute to developing future projects or support ongoing ones. 
          As a developer, I'm always working on new and exciting features that could benefit from additional resources. 
          If you're interested in supporting this development directly, you can send your leftover ETH to the following address: 0x3afE794FD0F5403bBb6d6F1445Dbd3150e65D57a. 
          Your contributions are greatly appreciated and will be utilised to enhance and develop our offerings further. 
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                What makes Attestation Station different from traditional services?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Unlike traditional services, Attestation Station leverages blockchain technology for digital attestation. 
            This provides higher security, transparency, and efficiency, making it easier to certify and verify documents without needing physical presence or paper-based processes.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Can I use the Attestation Station for legal documents?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, Attestation Station can be used to certify and verify the authenticity of legal documents. 
            However, we recommend consulting with legal professionals regarding accepting digital attestation in your jurisdiction.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              What should I do if my question isn't listed here?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          If you haven't found the answer to your question in our FAQ, we encourage you to visit our application's "How It Works" section. 
          This tab provides detailed information and guidance that might address your query. For additional support or specific inquiries, 
          please get in touch with us directly by emailing C00292057--at--setu--dot--ie. We're here to help!
          </AccordionPanel>
        </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default FAQ;