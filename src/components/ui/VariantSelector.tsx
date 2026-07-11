export function VariantSelector({
  name,
  swatchUrl,
  isSelected,
  onClick
}: {
  name: string;
  swatchUrl: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const baseClasses = "flex items-center gap-2 px-3 py-1.5 rounded border transition-colors cursor-pointer text-sm font-medium";
  
  const stateClasses = isSelected 
    ? "border-green-500 bg-green-50 text-gray-900" 
    : "border-gray-200 hover:border-gray-300 text-gray-600";

  return (
    <button 
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${stateClasses}`}
    >
      <span 
        className="block w-4 h-4 rounded-full border border-gray-200 shadow-sm"
        style={{ backgroundColor: swatchUrl }}
      />
      {name}
    </button>
  );
}
