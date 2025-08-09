// src/components/ads/AdTemplateBuilder.js
import { useState } from 'react';
import ImageUploader from '../forms/ImageUploader';
import WizardButton from '../common/WizardButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AdTemplateBuilder({ adData, onChange, onBack, onNext }) {
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDescriptionChange = (value) => {
    onChange({ description: value });
  };

  const handleImagesChange = (images) => {
    onChange({ images });
  };

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  // Quill editor formats configuration
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  return (
    <div className="details-step-container">
      <div className="details-form-wrapper">
        {preview ? (
          <div className="ad-preview">
            <h2>{adData.title || 'Your Ad Title'}</h2>
            <div className="preview-images">
              {adData.images.length > 0 ? (
                adData.images.map((img, i) => (
                  <img key={i} src={img} alt={`Preview ${i}`} />
                ))
              ) : (
                <div className="no-images">No images added</div>
              )}
            </div>
            <div 
              className="preview-description"
              dangerouslySetInnerHTML={{ __html: adData.description || 'Your detailed description will appear here' }}
            />
            <WizardButton 
              type="secondary"
              onClick={() => setPreview(false)}
            >
              Back to Editing
            </WizardButton>
          </div>
        ) : (
          <form className="details-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={adData.title}
                onChange={handleChange}
                placeholder="Enter ad title"
                maxLength="60"
                required
              />
            </div>
            
            <div className="form-group rich-text-group">
              <label>Description</label>
              <ReactQuill
                value={adData.description || ''}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}
                placeholder="Describe your item/service in detail"
                className="rich-text-editor"
              />
            </div>
            
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={adData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <ImageUploader 
              images={adData.images}
              onChange={handleImagesChange}
              maxCount={5}
            />
            
            <div className="form-actions">
              <WizardButton type="secondary" onClick={onBack}>
                Back
              </WizardButton>
              <div className="action-buttons-right">
                <WizardButton 
                  type="secondary" 
                  onClick={() => setPreview(true)}
                >
                  Preview
                </WizardButton>
                <WizardButton 
                  type="primary" 
                  onClick={onNext}
                  disabled={!adData.title || !adData.description}
                >
                  Continue
                </WizardButton>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdTemplateBuilder;