import React, { useState } from 'react';
import './App.css';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
            alert('Error uploading file!');
        }
    };

    return (
        <div className="container">
            <div className="banner">
                <h1>Potatector</h1>
            </div>
            <div className="upload-section">
                <h2>Upload Your File</h2>
                <form onSubmit={handleSubmit}>
                    <div className="file-input">
                        <input type="file" onChange={onFileChange} />
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
            {response && (
                <div className="response-section">
                    <h2>Result:</h2>
                    <div className="result">
                        <p><strong>Class:</strong> {response.class}</p>
                        <p><strong>Confidence:</strong> {response.confidence}</p>
                        <p><strong>Name:</strong> {response.name}</p>
                        <p><strong>Causes:</strong> {response.causes}</p>
                        <p><strong>Symptoms:</strong> {response.symptoms}</p>
                        <p><strong>Treatment:</strong> {response.treatment}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
