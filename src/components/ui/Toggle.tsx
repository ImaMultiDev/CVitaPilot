// src/components/ui/Toggle.tsx

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors ${
            checked
              ? "bg-blue-600 dark:bg-blue-500"
              : "bg-gray-300 dark:bg-gray-600"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div
            className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
              checked ? "transform translate-x-4" : ""
            }`}
          />
        </div>
      </div>
      {label && (
        <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      )}
    </label>
  );
};
