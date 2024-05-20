interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }
  
  export default function Button({ onClick, className, children }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${className}`}
      >
        {children}
      </button>
    );
  }
  