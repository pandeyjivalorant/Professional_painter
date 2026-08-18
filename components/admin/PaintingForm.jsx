'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPainting, updatePainting, deleteCloudinaryImage } from '@/app/actions/admin';
import CloudinaryUploader from '@/components/admin/CloudinaryUploader';
import { Trash2, GripVertical, Check } from 'lucide-react';
import Image from 'next/image';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#0f172a',
  surface: '#1e293b',
  border: '#334155',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  accent: '#3b82f6',
  accentLight: '#60a5fa',
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function PaintingForm({ initialData, categories = [] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    story: initialData?.story || '',
    price: initialData?.price || '',
    originalPrice: initialData?.originalPrice || '',
    currency: initialData?.currency || 'INR',
    year: initialData?.year || new Date().getFullYear(),
    status: initialData?.status || 'AVAILABLE',
    isPublished: initialData?.isPublished ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    displayOrder: initialData?.displayOrder || 0,
    style: initialData?.style || '',
    medium: initialData?.medium || '',
    materials: initialData?.materials || '',
    width: initialData?.width || '',
    height: initialData?.height || '',
    unit: initialData?.unit || 'inches',
    isFramed: initialData?.isFramed ?? false,
    categoryId: initialData?.categoryId || '',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const [images, setImages] = useState(initialData?.images || []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSlugify = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleUploadSuccess = (result) => {
    setImages((prev) => [
      ...prev,
      {
        url: result.url,
        cloudinaryPublicId: result.publicId,
        width: result.width,
        height: result.height,
        format: result.format,
        sizeBytes: result.bytes,
        isMain: prev.length === 0,
        displayOrder: prev.length,
      },
    ]);
  };

  const removeImage = async (index) => {
    const img = images[index];
    if (!window.confirm('Remove this image? This will also delete it from Cloudinary.')) return;
    if (img.cloudinaryPublicId) await deleteCloudinaryImage(img.cloudinaryPublicId);
    setImages((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      if (img.isMain && next.length > 0) next[0] = { ...next[0], isMain: true };
      return next;
    });
  };

  const setMainImage = (index) =>
    setImages((prev) => prev.map((img, i) => ({ ...img, isMain: i === index })));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        year: formData.year ? parseInt(formData.year) : null,
        width: formData.width ? parseFloat(formData.width) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        displayOrder: parseInt(formData.displayOrder) || 0,
        images: images.map((img, i) => ({ ...img, displayOrder: i })),
        categoryId: formData.categoryId || null,
      };
      const res = initialData
        ? await updatePainting(initialData.id, JSON.stringify(payload))
        : await createPainting(JSON.stringify(payload));
      if (res.success) {
        router.push('/admin/paintings');
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
      style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '1100px' }}
    >
      <style>{`
        @media (max-width: 767px) {
          .painting-form-grid { grid-template-columns: 1fr !important; }
          .painting-details-grid { grid-template-columns: 1fr !important; }
          .painting-dims-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

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

      <div
        className="painting-form-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* ── Left Column ──────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Basic Info */}
          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Basic Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Slug *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input required type="text" name="slug" value={formData.slug} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
                  <button
                    type="button"
                    onClick={handleSlugify}
                    style={{
                      padding: '10px 14px',
                      background: '#1e293b',
                      border: `1px solid ${C.border}`,
                      borderRadius: '8px',
                      color: C.textMuted,
                      fontSize: '13px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="" style={{ background: '#1e293b' }}>None</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div>
                <label style={labelStyle}>Story / Inspiration</label>
                <textarea name="story" value={formData.story} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Artwork Details</h2>

            <div className="painting-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {[
                { label: 'Medium', name: 'medium', placeholder: 'e.g., Oil on Canvas' },
                { label: 'Style', name: 'style', placeholder: 'e.g., Impressionism' },
                { label: 'Year', name: 'year', type: 'number' },
                { label: 'Materials', name: 'materials', placeholder: 'e.g., Linen, Cadmium' },
              ].map(({ label, name, type = 'text', placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder || ''} style={inputStyle} />
                </div>
              ))}
            </div>

            <div className="painting-dims-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Width</label>
                <input type="number" step="0.1" name="width" value={formData.width} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Height</label>
                <input type="number" step="0.1" name="height" value={formData.height} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Unit</label>
                <select name="unit" value={formData.unit} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="inches" style={{ background: '#1e293b' }}>Inches</option>
                  <option value="cm" style={{ background: '#1e293b' }}>Centimeters</option>
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" name="isFramed" checked={formData.isFramed} onChange={handleChange} style={{ width: '16px', height: '16px' }} />
              <span style={{ color: C.textMuted, fontSize: '14px' }}>Is Framed</span>
            </label>
          </div>

          {/* Images */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: `1px solid ${C.border}` }}>
              <h2 style={{ ...sectionTitle, margin: 0, padding: 0, border: 'none' }}>Images</h2>
              <CloudinaryUploader folder="paintings" onUploadSuccess={handleUploadSuccess} maxFiles={5} />
            </div>

            {images.length === 0 ? (
              <p style={{ color: C.textDim, textAlign: 'center', padding: '32px 0', fontSize: '14px' }}>
                No images uploaded yet. Click &ldquo;Upload Images&rdquo; above.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {images.map((img, i) => (
                  <div
                    key={i}
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
                    <GripVertical size={18} color={C.textDim} style={{ flexShrink: 0, cursor: 'grab' }} />

                    <div style={{ width: '52px', height: '52px', borderRadius: '6px', overflow: 'hidden', position: 'relative', flexShrink: 0, background: '#1e293b' }}>
                      <Image src={img.url} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                    </div>

                    <p style={{ flex: 1, color: C.textMuted, fontSize: '12px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {img.url.split('/').pop()}
                    </p>

                    <button
                      type="button"
                      onClick={() => setMainImage(i)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        background: img.isMain ? 'rgba(52,211,153,0.12)' : 'transparent',
                        color: img.isMain ? '#34d399' : C.textMuted,
                        borderColor: img.isMain ? 'rgba(52,211,153,0.3)' : C.border,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {img.isMain && <Check size={12} />}
                      Main
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      style={{ padding: '6px', borderRadius: '6px', border: 'none', background: 'transparent', color: C.danger, cursor: 'pointer', display: 'inline-flex' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.12)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column ─────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Status & Pricing */}
          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Status & Pricing</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Status', name: 'status', options: [['AVAILABLE', 'Available'], ['RESERVED', 'Reserved'], ['SOLD', 'Sold'], ['NOT_FOR_SALE', 'Not for Sale']] },
                { label: 'Currency', name: 'currency', options: [['INR', 'INR ₹'], ['USD', 'USD $'], ['EUR', 'EUR €'], ['GBP', 'GBP £']] },
              ].map(({ label, name, options }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <select name={name} value={formData[name]} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                    {options.map(([v, l]) => (
                      <option key={v} value={v} style={{ background: '#1e293b' }}>{l}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div>
                <label style={labelStyle}>Price</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Original Price (if discounted)</label>
                <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Visibility</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Publish', desc: 'Make visible on public site', name: 'isPublished' },
                { label: 'Featured', desc: 'Show on homepage featured section', name: 'isFeatured' },
              ].map(({ label, desc, name }) => (
                <label
                  key={name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    border: `1px solid ${C.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: formData[name] ? 'rgba(59,130,246,0.08)' : 'transparent',
                  }}
                >
                  <div>
                    <p style={{ color: C.text, fontSize: '14px', fontWeight: 500, margin: 0 }}>{label}</p>
                    <p style={{ color: C.textDim, fontSize: '12px', margin: '2px 0 0 0' }}>{desc}</p>
                  </div>
                  <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: C.accent }} />
                </label>
              ))}
              <div style={{ marginTop: '8px' }}>
                <label style={labelStyle}>Display Order</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </div>
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
          {loading ? 'Saving…' : 'Save Painting'}
        </button>
      </div>
    </form>
  );
}
