import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function SavedCVsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner
          size="lg"
          text="Cargando mis CVs..."
          className="min-h-screen"
        />
      </div>
    </div>
  );
}
