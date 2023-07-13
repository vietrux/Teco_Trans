import React, { useState } from 'react';

const App = () => {

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      // Upload the file to the server
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Local Resource URL
      // Set the URL of the uploaded file
      setFileUrl(data.filePath);
      console.log(data.filePath);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileUrl && <embed type='application/pdf' src={fileUrl} width="100%" height="600px" />}
    </div>
  );
};

export default App;
