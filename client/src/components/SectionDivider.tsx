export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-16 ${className}`}>
      <svg
        className="absolute bottom-0 w-full h-16"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C150,50 350,20 600,40 C850,60 1050,30 1200,50 L1200,100 L0,100 Z"
          fill="currentColor"
          className="text-white"
        />
      </svg>
    </div>
  );
}
