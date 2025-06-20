// src/components/ui/Badge.tsx

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
}) => {
  const variantClasses = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    success:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    warning:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    danger: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    info: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
};
