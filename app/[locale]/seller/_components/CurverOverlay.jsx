export default function CurvedOverlay({ className = "", ...props }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} {...props}>
      <svg
        viewBox="0 0 1440 390"
        preserveAspectRatio="none"
        className="!w-full !h-full"
      >
        <path
          d="M 0,400 L 0,0 C 245,37.5 490,75 730,75 C 970,75 1205,37.5 1440,0 L 1440,400 L 0,400 Z"
          fill="#eb144c"
        />
      </svg>
    </div>
  );
}
