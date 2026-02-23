import { cn } from "@/lib/utils";

export default function SectionLabel({ children, color = "coral", className = "" }) {
  const colors = { coral: "text-coral", purple: "text-violet", lavender: "text-lavender" };
  return (
    <p className={cn("text-xs font-syne font-bold tracking-[0.15em] uppercase mb-4", colors[color], className)}>
      {children}
    </p>
  );
}
