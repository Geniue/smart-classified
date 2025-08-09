// src/components/forms/ImageUploader.js
import { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';

function ImageUploader({ images, onChange, maxCount }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > maxCount) {
      alert(`You can upload maximum ${maxCount} images`);
      return;
    }
    
    // In a real app, we would upload to a server
    // For now, we'll just use object URLs
    const newImages = files.map(file => URL.createObjectURL(file));
    onChange([...images, ...newImages]);
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="image-uploader">
      <label>Images (Max {maxCount})</label>
      
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaUpload className="upload-icon" />
        <p>Drag & drop images here or click to browse</p>
        <input 
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="browse-button">
          Browse Files
        </label>
      </div>
      
      <div className="image-preview-grid">
        {images.map((img, index) => (
          <div key={index} className="image-preview">
            <img src={img} alt={`Preview ${index}`} />
            <button onClick={() => handleRemove(index)} className="remove-button">
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;