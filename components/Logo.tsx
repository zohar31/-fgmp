import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-wa shadow-glow">
        <div className="absolute inset-0 grid place-items-center font-display font-extrabold text-white text-lg leading-none">
          F
        </div>
      </div>
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        FGMP
      </span>
    </div>
  );
}
