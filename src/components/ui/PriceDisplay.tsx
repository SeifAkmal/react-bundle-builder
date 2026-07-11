export function PriceDisplay({ 
  price, 
  compareAtPrice 
}: { 
  price: number; 
  compareAtPrice?: number; 
}) {
  return (
    <div className="flex flex-col lg:flex-row items-end lg:items-center gap-1 lg:gap-2 text-sm">
      {compareAtPrice && (
        <span className="text-gray-400 line-through">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
      <span className="text-gray-900 font-bold">
        ${price.toFixed(2)}
      </span>
    </div>
  );
}
