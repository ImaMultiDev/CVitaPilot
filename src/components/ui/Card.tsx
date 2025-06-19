// src/components/ui/Card.tsx

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = true,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${
        padding ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
