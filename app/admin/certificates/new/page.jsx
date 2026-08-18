import CertificateForm from '@/components/admin/CertificateForm';

export const metadata = {
  title: 'Add Certificate | Admin',
};

export default function NewCertificatePage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full font-sans">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 m-0">Add New Certificate</h1>
        <p className="text-slate-400 mt-1 text-sm md:text-base">
          Upload and configure a new certificate or award.
        </p>
      </div>
      <CertificateForm />
    </div>
  );
}
