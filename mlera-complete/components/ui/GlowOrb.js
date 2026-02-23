export default function GlowOrb({ color = "purple", size = 400, top, left, right, bottom, opacity = 0.14, blur = 80, className = "" }) {
  const colors = { purple: "139,92,246", coral: "255,107,107", lavender: "192,132,252" };
  const rgb = colors[color] || colors.purple;
  return (
    <div aria-hidden="true" className={`absolute pointer-events-none z-0 ${className}`}
      style={{
        width: size, height: size,
        background: `rgba(${rgb},${opacity})`,
        filter: `blur(${blur}px)`,
        borderRadius: "50%",
        ...(top !== undefined && { top }),
        ...(left !== undefined && { left }),
        ...(right !== undefined && { right }),
        ...(bottom !== undefined && { bottom }),
      }}
    />
  );
}
