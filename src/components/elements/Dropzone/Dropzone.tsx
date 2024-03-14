import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  message?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded, message = "" }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUploaded(acceptedFiles[0]);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #007bff', padding: '60px', textAlign: 'center', cursor: 'pointer' }}>
      <input {...getInputProps()} />
      <p>{message}</p>
      {/* <p>Drop a file here, or click to select the file to get its hash.</p> */}
      <p>The hashing is done locally in your browser. Your file is not uploaded anywhere.</p>
    </div>
  );
};

export default Dropzone;