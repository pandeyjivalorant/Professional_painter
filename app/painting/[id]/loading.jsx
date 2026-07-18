import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 text-gold animate-spin" />
      <p className="mt-4 text-gold uppercase tracking-[0.2em] text-xs">
        Preparing gallery
      </p>
    </div>
  );
}
