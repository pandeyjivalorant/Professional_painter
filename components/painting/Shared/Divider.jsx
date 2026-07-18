export default function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
      <span className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}
