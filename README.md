# Attestation Station dApp

## Introduction 🌟

Attestation Station is a decentralized application (dApp) built on the Ethereum blockchain, designed to enable users to create, verify, and revoke attestations for digital documents in a secure manner. Leveraging blockchain technology, it ensures the authenticity and integrity of attested documents are maintained.

## Features 🚀

- **Document Attestation**: Users can attest the authenticity of a document by generating and recording a unique hash of the document on the Ethereum blockchain.
- **Verification**: Allows anyone in possession of the document to verify its authenticity by comparing the document's hash stored on the blockchain.
- **Revocation**: Provides the ability for document attestations to be revoked by the original attester, adding a layer of flexibility and control over the attested documents.

## Getting Started 🏁

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14.x or higher recommended)
- [Metamask](https://metamask.io/) or any Web3 wallet for interacting with the Ethereum blockchain.
- Ethereum available on the Sepolia Testnet (for testing purposes).

### Installation

Follow these steps to set up the project locally on your machine:

1. **Clone the repository:**
   - git clone https://github.com/DLFDL/attestation-station.git
   - cd attestation-station

2. **Install dependencies:**
   - npm install

3. **Start the development server:**
   - npm run dev

### Configuring Metamask

- Ensure Metamask is installed in your browser and set up to connect to the Ethereum Sepolia Testnet.
- Obtain Sepolia ETH from a faucet to cover transaction costs.

## Usage 🔍

### Making an Attestation 

- Connect your Web3 wallet to the dApp.
- Navigate to the "Home" section within the dApp.
- Upload the document you wish to attest.
- Confirm the transaction in your Web3 wallet to complete the attestation.

### Verifying a Document

- Access the "Attestation" section of the dApp.
- Select the specific attestation you wish to verify.
- Upload or drag the document into the designated area for verification.
- The application will automatically verify the document's authenticity and display the verification result.

## Contributing

We welcome contributions from the community!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- @DLFDL
- Project Link: https://github.com/DLFDL/attestation-station
- Project Website: www.attestationstation.org