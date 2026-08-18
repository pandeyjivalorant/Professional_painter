'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Upload } from 'lucide-react';
import { useState } from 'react';

export default function CloudinaryUploader({
  folder = 'paintings',
  onUploadSuccess,
  maxFiles = 1,
}) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: folder,
        maxFiles: maxFiles,
        resourceType: 'image',
        clientAllowedFormats: ['jpeg', 'png', 'webp', 'jpg'],
        maxFileSize: 10000000,
        multiple: maxFiles > 1,
      }}
      onSuccess={(result) => {
        setIsUploading(false);
        if (onUploadSuccess && result?.info) {
          onUploadSuccess({
            url: result.info.secure_url,
            publicId: result.info.public_id,
            width: result.info.width,
            height: result.info.height,
            format: result.info.format,
            bytes: result.info.bytes,
          });
        }
      }}
      onUpload={() => setIsUploading(true)}
      onError={() => setIsUploading(false)}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          disabled={isUploading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: '8px',
            color: '#60a5fa',
            fontSize: '13px',
            fontWeight: 500,
            cursor: isUploading ? 'not-allowed' : 'pointer',
            opacity: isUploading ? 0.6 : 1,
            transition: 'all 0.15s',
          }}
        >
          <Upload size={16} />
          {isUploading ? 'Uploading…' : 'Upload Images'}
        </button>
      )}
    </CldUploadWidget>
  );
}
