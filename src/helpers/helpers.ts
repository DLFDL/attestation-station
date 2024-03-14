import { ethers } from 'ethers';
export const sliceElements = (data: string) => {
  if (!data || data.length < 194) {
    throw new Error('Data string too short or undefined.');
  }

  const firstElement = data.substring(0, 66);
  let currentIndex = 66;
  const secondElement = '0x' + data.substring(currentIndex, currentIndex + 64);
  currentIndex += 64;

  const stringLengthHex = data.substring(currentIndex, currentIndex + 64);
  const stringLength = parseInt(stringLengthHex, 16);
  currentIndex += 64;
  const thirdElement = '0x' + data.substring(currentIndex, currentIndex + stringLength * 2);

  return [firstElement, secondElement, thirdElement];
};
export const openTxDetails = (txid: string) => {
  const detailsUrl = `https://sepolia.etherscan.io/tx/${txid}`;
  window.open(detailsUrl, '_blank');
};

export const removeFirstChars = (str: any, charsCount: any) => {
  return str.slice(charsCount);
};

export const splitStringInto64Chars = (string: any) => {
  const regex = /.{1,64}/g;
  return string.match(regex);
};

export const bytes32ToString = (bytes32: string) => {
  if (bytes32.startsWith('0x')) {
    bytes32 = bytes32.slice(2);
  }

  let str = '';
  for (let i = 0; i < bytes32.length; i += 2) {
    let charCode = parseInt(bytes32.substr(i, 2), 16);
    if (charCode !== 0) {
      str += String.fromCharCode(charCode);
    }
  }

  return str;
};

export const modifyString = (string: any) => {
  const stringWithZeroX = `0x${string}`;
  const stringWithoutLastTwo = stringWithZeroX.slice(0, -2);
  return stringWithoutLastTwo;
};

export const decodeData = (value: string) => {
  if (value.slice(0, 2) === '0x' && value.length === 64) {
    console.log(11111)
    const padded = ethers.utils.hexZeroPad(value, 32);
    const parsed = ethers.utils.parseBytes32String(padded);
    return parsed;
  }
  return 'Not Provided';
};

const decodeDataLong = (value: string) => {
  try {
    console.log(22222)
    return ethers.utils.parseBytes32String(value);
  } catch (error) {
    console.error('Error decoding data:', error);
    return value;
  }
};

export const shortenString = (string: string) => {
  if (string.length > 130) {
    const documentID = string.slice(66, 130);
    return documentID;
  }
  return null;
};

export const modifyHex = (string: string) => {
  const shortString = removeFirstChars(string, 66);
  const modifiedString = splitStringInto64Chars(shortString)
  const decodedData = bytes32ToString(modifiedString[0]);
  return decodedData;
};