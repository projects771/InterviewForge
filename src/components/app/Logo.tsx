import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand ring-1 ring-white/20 shadow-[0_8px_24px_-8px_oklch(0.72_0.22_295/60%)]">
        <span className="text-sm font-black text-primary-foreground">IF</span>
      </span>
      <span className="text-base font-semibold tracking-tight">
        Interview<span className="text-gradient">Forge</span>
      </span>
    </Link>
  );
}
