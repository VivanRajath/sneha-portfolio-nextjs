type P = { className?: string; style?: React.CSSProperties; fill?: string };

export function Star({ className, style, fill = '#D2FF3C' }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <path
        d="M50 4 L61 37 L96 38 L68 59 L78 94 L50 73 L22 94 L32 59 L4 38 L39 37 Z"
        fill={fill}
        stroke="#111110"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
