interface HorizontalDividerProps {
  width?: number;
  className?: string;
}

export default function HorizontalDivider({ width = 280, className = "" }: HorizontalDividerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/horizontal.png"
        alt=""
        style={{ width: width, height: 'auto', maxWidth: '100%' }}
        className="block"
      />
    </div>
  );
}