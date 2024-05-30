import React, { useState } from 'react';
import axios from 'axios';
import '../styling/ImageClassifierStyle.css'; 

const ImageClassifier = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [apiResponse, setApiResponse] = useState('');
  const [fileName, setFileName] = useState('');

  const readURL = async (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = async function (e) {
        setImagePreview(e.target.result);
        document.querySelector('.image-upload-wrap').style.display = 'none'; 
        document.querySelector('.file-upload-image').setAttribute('src', e.target.result); 
        document.querySelector('.file-upload-content').style.display = 'block'; 
        setFileName(input.files[0].name); 
        
        const formData = new FormData();
        formData.append('file', input.files[0]);

        try {
          const response = await axios.post('http://localhost:8001/predict', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setApiResponse(response.data.label);
        } catch (error) {
          console.error('Error sending image:', error);
        }
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  };

  const removeUpload = () => {
    setImagePreview(null);
    document.querySelector('.file-upload-input').value = ''; 
    document.querySelector('.file-upload-content').style.display = 'none'; 
    document.querySelector('.image-upload-wrap').style.display = 'block'; 
    setApiResponse(''); 
    setFileName(''); 
  };

  const handleDragOver = () => {
    document.querySelector('.image-upload-wrap').classList.add('image-dropping');
  };

  const handleDragLeave = () => {
    document.querySelector('.image-upload-wrap').classList.remove('image-dropping');
  };

  return (
    <div className='main_div'>
    <div className="file-upload">
      <button className="file-upload-btn" type="button" onClick={() => document.querySelector('.file-upload-input').click()}>Add Image</button>

      <div className="image-upload-wrap" onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <input className="file-upload-input" type='file' onChange={(e) => readURL(e.target)} accept="image/*" />
        <div className="drag-text">
          <h3>Drag and drop a file or select add Image to classify it</h3>
        </div>
      </div>
      <div className="file-upload-content" style={{ display: imagePreview ? 'block' : 'none' }}>
        <img className="file-upload-image" src={imagePreview} alt="uploaded image" />
        <div className="image-title-wrap">
          <button type="button" onClick={removeUpload} className="remove-image">Remove Uploaded Image</button>
          <span className="image-title">{fileName}</span>
        </div>
      </div>
      
      

    </div>

    {apiResponse && (
        <div className="api-response-box">
        
          <textarea readOnly value={apiResponse} />
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;
