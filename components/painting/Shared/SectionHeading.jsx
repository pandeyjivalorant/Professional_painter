export default function SectionHeading({ 
  eyebrow, 
  title, 
  subtitle,
  align = 'left',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p className="text-gold uppercase tracking-[0.25em] text-xs mb-4 font-sans">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-5xl text-ivory leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-warm-white/60 text-lg font-sans max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
