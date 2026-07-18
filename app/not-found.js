export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
      <p className="font-display text-6xl text-gold/20 mb-4">404</p>
      <h1 className="font-display text-3xl text-ivory mb-3">Page Not Found</h1>
      <a href="/" className="text-gold text-sm tracking-widest underline-offset-4 hover:underline">Return Home</a>
    </div>
  );
}
