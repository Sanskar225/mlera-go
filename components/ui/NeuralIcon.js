"use client";

export default function NeuralIcon({ size = 48, className = "" }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="nglow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#nglow)" opacity="0.9">
        <line x1="20" y1="16" x2="60" y2="32" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="20" y1="16" x2="40" y2="48" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="60" y1="32" x2="40" y2="48" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="60" y1="32" x2="20" y2="64" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="40" y1="48" x2="20" y2="64" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="40" y1="48" x2="60" y2="64" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="20" y1="64" x2="60" y2="80" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="60" y1="64" x2="60" y2="80" stroke="url(#ng)" strokeWidth="1.8" />
        <line x1="20" y1="64" x2="40" y2="80" stroke="url(#ng)" strokeWidth="1.8" />
      </g>
      <g filter="url(#nglow)">
        {[[20,16],[60,32],[40,48],[20,64],[60,64],[40,80],[60,80]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5.5" fill="url(#ng)" />
        ))}
      </g>
    </svg>
  );
}
