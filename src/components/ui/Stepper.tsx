export function Stepper({ 
  quantity, 
  onIncrement, 
  onDecrement,
  min = 0 
}: { 
  quantity: number; 
  onIncrement: () => void; 
  onDecrement: () => void;
  min?: number;
}) {
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
      <button 
        onClick={onDecrement}
        disabled={quantity <= min}
        className="px-3 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        -
      </button>
      <div className="px-3 py-1 text-sm font-medium min-w-[32px] text-center border-l border-r border-gray-300">
        {quantity}
      </div>
      <button 
        onClick={onIncrement}
        className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
      >
        +
      </button>
    </div>
  );
}
