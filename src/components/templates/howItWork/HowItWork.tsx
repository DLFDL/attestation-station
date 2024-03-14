import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  OrderedList,
  UnorderedList
} from '@chakra-ui/react';

const HowItWorks = () => {
  return (
    <Box p={5}>
      <Heading size="md" marginBottom={10} textAlign="center">How to Make an Attestation?</Heading>
      <Text mb={4}>
        Beginning your attestation journey with Attestation Station requires a basic understanding of blockchain technology,
        the functionality of digital wallets, the process of mining cryptocurrencies, and navigating our decentralised application.
        You may be already familiar with some of these concepts. However, we've compiled a comprehensive tutorial to ensure
        you're fully equipped to make your first attestation seamlessly. This guide will walk you through everything you need
        to know in five straightforward steps, making the process accessible and manageable for everyone, regardless of prior experience.
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Step 1: Get a Wallet
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text mb={2}>
              The first step in making your attestation with Attestation Station involves securing a non-custodial wallet. 
              This digital wallet lets you interact with blockchain applications and engage with the web3 ecosystem. 
              MetaMask stands out as a globally trusted choice, renowned for its security and ease of use.
            </Text>
            <Text mb={2}>
              MetaMask is a digital wallet extension for your web browser, simplifying interactions with decentralised applications (dApps) across Ethereum and other blockchains. 
              Acting as a bridge between your browser and dApps, MetaMask integrates seamlessly, making the decentralised web more accessible right from your favourite browsers. 
              Supported by major browsers like Firefox, Chrome, Opera, Edge, and Brave, MetaMask plays a pivotal role in democratising access to the dApp landscape.
            </Text>
            <Text mb={2}>
              If you're new to MetaMask, don't worry. We've prepared a user-friendly guide for setting up your wallet, focusing on the Firefox extension in this example. 
              The installation process is designed to be straightforward and very intuitive.
            </Text>
            <Text mb={2} marginBottom={8} marginTop={8} textAlign="center">
            <strong>Setting Up Your MetaMask Wallet: A Step-by-Step Guide</strong>
            </Text>
            <List spacing={2}>
              <ListItem>1. <strong>Begin by Visiting MetaMask:</strong> Navigate to the <Link href="https://metamask.io/download/" isExternal color="blue.500">official MetaMask website</Link> to get started.</ListItem>
              <ListItem>2. <strong>Install MetaMask Extension:</strong> Select “Install MetaMask for Firefox.” Follow the prompt by clicking “Continue to installation” to proceed.</ListItem>
              <ListItem>3. <strong>Add the MetaMask Extension:</strong> Click “Add” to integrate MetaMask into your browser. This action will redirect you to the MetaMask welcome page automatically.</ListItem>
              <ListItem>4. <strong>Accept the Terms:</strong> Review and agree to the Terms of Use, then opt to “Create a New Wallet.”</ListItem>
              <ListItem>5. <strong>Secure Your Wallet:</strong> Generate a strong password with a minimum of eight characters to secure your wallet, and click “Create a New Wallet.” 
                                    Remember, this password is crucial for accessing and interacting with the blockchain.</ListItem>
              <ListItem>6. <strong>Learn About Wallet Safety:</strong> Watch the provided short video before diving in to understand your Secret Recovery Phrase and the importance of wallet security. After viewing, select “Secure My Wallet” to proceed.</ListItem>
              <ListItem>7. <strong>Verify Your Recovery Phrase:</strong> Accurately input the words from your Secret Recovery Phrase in their given order and click “Confirm.”</ListItem>
              <ListItem>8. <strong>Complete Setup:</strong> You’ll see a congratulatory message upon successful verification. Click on “Got it” to finish the setup.</ListItem>
              <ListItem>9. <strong>Access MetaMask Easily:</strong> Pin MetaMask to your browser’s toolbar for quick access. Look for the MetaMask fox icon in your browser’s extension area at the top right corner.</ListItem>
            </List>
            <Text mt={4}>Congratulations! You've successfully set up your MetaMask wallet, paving the way for secure and seamless interactions with the blockchain.</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <h2>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                    Step 2: Connect to the Sepolia Network
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
        <AccordionPanel pb={4}>
            <Text mb={2}>
            Once your wallet is set up, the next crucial step is to integrate it with the Sepolia Network. 
            Endorsed as the preferred testnet for dApps development by Ethereum's core developers, Sepolia offers a robust environment for testing, and currently, our services operate exclusively on the Sepolia testnet.
            </Text>
            <List spacing={2}>
            <ListItem>1. <strong>Access Your Wallet:</strong> Click on the MetaMask fox icon in the top right corner of your browser.</ListItem>
            <ListItem>2. <strong>Navigate to Networks:</strong> Select the “Ethereum Mainnet” button at the top left of the MetaMask extension.</ListItem>
            <ListItem>3. <strong>Enable Test Networks:</strong> Find and click on “Show test networks.” Make sure to toggle this option on.</ListItem>
            <ListItem>4. <strong>Select Sepolia:</strong> From the list of test networks, choose “Sepolia” to connect.</ListItem>
            <ListItem>5. <strong>Verify the Network Change:</strong> Your wallet’s main display should now indicate SepoliaETH instead of ETH, confirming that you are connected to the Sepolia testnet.</ListItem>
            </List>
            <Text mt={4}>
            By following these steps, your MetaMask wallet is now correctly configured to interact with the Sepolia network, enabling you to interact with the blockchain and Attestation Station.
            </Text>
        </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <h2>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                    Step 3: Claim Sepolia ETH
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <Text mb={2}>
                Interacting with the Ethereum network requires having Ethers specific to it. 
                On testnets like Sepolia, you can obtain these tokens for free from dedicated faucets. 
                This step guides you through acquiring Sepolia ETH, essential for interaction with Attestation Station dApp.
                </Text>
                <List spacing={2}>
                <ListItem>1. <strong>Copy Your Wallet Address:</strong> Locate and copy the address of your wallet.</ListItem>
                <ListItem>
                    2. <strong>Visit the Sepolia Faucet:</strong> Navigate to <Link href="https://sepolia-faucet.pk910.de/" isExternal color="blue.500">https://sepolia-faucet.pk910.de/</Link>. 
                    Input your wallet address, complete the reCAPTCHA, and select “Start Mining”. 
                    This Sepolia PoW Faucet exchanges a small mining effort for Sepolia ETH.
                </ListItem>
                <ListItem>
                    3. <strong>Mine and Claim Rewards:</strong> Engage in mining to earn Sepolia ETH. When ready, choose “Stop Mining & Claim Rewards”. 
                    Note that a minimum of 0.05 Sepolia ETH is required to claim rewards. The mining duration may vary, typically around 20 minutes, depending on your computer's performance and network congestion.
                </ListItem>
                <ListItem>4. <strong>Receive Your Sepolia ETH:</strong> Click “Claim Rewards” to transfer the earned Sepolia ETH into your wallet.</ListItem>
                </List>
                <Text mt={4}>
                Alternatively, Sepolia ETH is available from Alchemy, Chainlink, QuickNode, and Infura faucets, which do not require mining but may need registration.
                </Text>
             </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
            <h2>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                    Step 4: Make an Attestation
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
        <AccordionPanel pb={4}>
            <Text mb={4}>
            Embark on creating your attestation with these straightforward steps:
            </Text>
        <OrderedList spacing={2}>
        <ListItem>
            <Text><strong>Connect Your Wallet:</strong></Text>
            <UnorderedList>
            <ListItem>Start on the Home page of our application.</ListItem>
            <ListItem>Click “Connect Wallet”, located in the top right corner.</ListItem>
            <ListItem>MetaMask will prompt you to sign in. Follow the instructions and ensure you're connected to the Sepolia Testnet.</ListItem>
            </UnorderedList>
        </ListItem>
        <ListItem>
            <Text><strong>Prepare Your Attestation:</strong></Text>
            <UnorderedList>
            <ListItem>Please navigate to the attestation form on our platform.</ListItem>
            <ListItem>Fill in all the required fields, such as the document ID.</ListItem>
            <ListItem>Upload or drag and drop the document you wish to attest into the designated drop zone. 
                This action will automatically generate a unique hash for your document, setting the stage for the attestation.</ListItem>
            </UnorderedList>
        </ListItem>
        <ListItem>
            <Text><strong>Initiate Attestation:</strong></Text>
            <UnorderedList>
            <ListItem>Scroll to the bottom of the form to find the “Make Attestation” button.</ListItem>
            <ListItem>Click on it to proceed. A MetaMask window will appear, prompting you to confirm the transaction by selecting “Confirm”. 
                Remember, all transactions on the blockchain require a gas fee, which varies based on network activity and the complexity of the attestation.</ListItem>
            </UnorderedList>
        </ListItem>
        <ListItem>
            <Text><strong>Confirmation and Details:</strong></Text>
            <UnorderedList>
            <ListItem>After confirming the transaction, allow some time for it to be fully processed and finalised on the blockchain. This may vary depending on current network conditions.</ListItem>
            <ListItem>Upon completion, you'll be automatically directed to the Attestation Details page, where you can review the specifics of your attestation.</ListItem>
            </UnorderedList>
        </ListItem>
        </OrderedList>
        <Text mt={4}>
        By following these steps, you can seamlessly create attestations, leveraging blockchain technology's security and transparency to validate the authenticity of your document.
        </Text>
        </AccordionPanel>
    </AccordionItem>
        <AccordionItem>
            <h2>
                <AccordionButton>
                <Box flex="1" textAlign="left">
                    Step 5: File Verification
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
        <AccordionPanel pb={4}>
            <Text mb={4}>
            Verifying a file's authenticity is a straightforward process:
            </Text>
            <OrderedList spacing={2}>
            <ListItem>
                <Text><strong>Access Verification:</strong></Text>
                <UnorderedList>
                <ListItem>Go to the Attestations tab on our website.</ListItem>
                <ListItem>Select the specific attestation you wish to verify.</ListItem>
                </UnorderedList>
            </ListItem>
            <ListItem>
                <Text><strong>Upload for Verification:</strong></Text>
                <UnorderedList>
                <ListItem>Upload or drag the file you want to verify into the designated drop zone. 
                    This should be the same file that was attested initially.</ListItem>
                </UnorderedList>
            </ListItem>
            <ListItem>
                <Text><strong>Authentication Process:</strong></Text>
                <UnorderedList>
                <ListItem>The system will then generate a hash from the uploaded file for comparison.</ListItem>
                <ListItem>If the file remains unchanged from its initial attestation, it will produce an identical hash, affirming its authenticity.</ListItem>
                <ListItem>A hash mismatch suggests modifications have been made to the file or the wrong file has been uploaded.</ListItem>
                </UnorderedList>
            </ListItem>
            </OrderedList>
            <Text mt={4}>
            This verification process ensures the document's integrity, offering a reliable means to confirm its authenticity through blockchain technology.
            </Text>
        </AccordionPanel>
    </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default HowItWorks;