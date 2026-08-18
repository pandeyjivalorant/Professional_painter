'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCertificate, deleteCloudinaryImage } from '@/app/actions/admin';
import CloudinaryUploader from '@/components/admin/CloudinaryUploader';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

// ─── Design tokens (same as PaintingForm) ─────────────────────────────────────
const C = {
  bg: '#0f172a',
  surface: '#1e293b',
  border: '#334155',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  accent: '#3b82f6',
  danger: '#f87171',
  input: '#0f172a',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  background: C.input,
  border: `1px solid ${C.border}`,
  borderRadius: '8px',
  color: C.text,
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  color: C.textMuted,
  fontSize: '12px',
  fontWeight: 600,
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const sectionStyle = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: '12px',
  padding: '24px',
};

const sectionTitle = {
  color: C.text,
  fontSize: '15px',
  fontWeight: 600,
  margin: '0 0 20px 0',
  paddingBottom: '12px',
  borderBottom: `1px solid ${C.border}`,
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CertificateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issuedBy: '',
    issueDate: '',
    displayOrder: 0,
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSuccess = (result) => {
    setUploadedImage({
      url: result.url,
      publicId: result.publicId,
    });
  };

  const removeImage = async () => {
    if (!window.confirm('Remove this image? It will be deleted from Cloudinary.')) return;
    if (uploadedImage?.publicId) await deleteCloudinaryImage(uploadedImage.publicId);
    setUploadedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      setError('Please upload a certificate image.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...formData,
        imageUrl: uploadedImage.url,
        cloudinaryPublicId: uploadedImage.publicId,
        displayOrder: parseInt(formData.displayOrder) || 0,
        issueDate: formData.issueDate || null,
      };
      const res = await createCertificate(JSON.stringify(payload));
      if (res.success) {
        router.push('/admin/certificates');
        router.refresh();
      } else {
        setError(res.error || 'Something went wrong');
      }
    } catch {
      setError('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '680px' }}
    >
      {error && (
        <div
          style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: 'rgba(248,113,113,0.12)',
            border: '1px solid rgba(248,113,113,0.3)',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Basic Info */}
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Certificate Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Best Artwork Award 2024"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Issued By</label>
              <input
                type="text"
                name="issuedBy"
                value={formData.issuedBy}
                onChange={handleChange}
                placeholder="e.g., National Art Council"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                style={{ ...inputStyle, colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of this certificate..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div style={sectionStyle}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <h2 style={{ ...sectionTitle, margin: 0, padding: 0, border: 'none' }}>
              Certificate Image *
            </h2>
            {!uploadedImage && (
              <CloudinaryUploader
                folder="certificates"
                onUploadSuccess={handleUploadSuccess}
                maxFiles={1}
              />
            )}
          </div>

          {uploadedImage ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                background: '#0f172a',
                border: `1px solid ${C.border}`,
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '52px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  background: '#1e293b',
                }}
              >
                <Image src={uploadedImage.url} alt="Certificate preview" fill style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ flex: 1, color: C.textMuted, fontSize: '12px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {uploadedImage.url.split('/').pop()}
              </p>
              <button
                type="button"
                onClick={removeImage}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'transparent',
                  color: C.danger,
                  cursor: 'pointer',
                  display: 'inline-flex',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <p style={{ color: C.textDim, textAlign: 'center', padding: '32px 0', fontSize: '14px' }}>
              No image uploaded yet. Click &ldquo;Upload Images&rdquo; above.
            </p>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          paddingTop: '24px',
          marginTop: '8px',
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            padding: '10px 22px',
            borderRadius: '8px',
            border: `1px solid ${C.border}`,
            background: 'transparent',
            color: C.textMuted,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 22px',
            borderRadius: '8px',
            border: 'none',
            background: loading ? '#1d4ed8' : C.accent,
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.75 : 1,
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Saving…' : 'Save Certificate'}
        </button>
      </div>
    </form>
  );
}
