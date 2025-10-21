import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/home" className={cn("flex items-center gap-2 text-foreground", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="currentColor"
        />
        <path
          d="M12 6C9.24 6 7 8.24 7 11C7 12.76 7.93 14.28 9.31 15.15L14.85 9.19C14.07 7.39 12.5 6 12 6Z"
          fill="currentColor"
          className="text-destructive/80"
        />
        <path
          d="M14.69 8.85L9.15 14.81C9.93 16.61 11.5 18 12 18C14.76 18 17 15.76 17 13C17 11.24 16.07 9.72 14.69 8.85Z"
          fill="currentColor"
          className="text-success/80"
        />
      </svg>
      <span className="font-headline text-xl font-bold tracking-tight hidden group-data-[state=expanded]:inline">
        PreferencePulse
      </span>
    </Link>
  );
}
