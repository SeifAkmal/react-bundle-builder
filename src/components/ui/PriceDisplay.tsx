export function PriceDisplay({ 
  price, 
  compareAtPrice 
}: { 
  price: number; 
  compareAtPrice?: number; 
}) {
  return (
    <div className="flex flex-row items-center gap-1 lg:gap-2 text-sm">
      {compareAtPrice && (
        <span className="text-[#D8392B] line-through">
          ${compareAtPrice.toFixed(2)}
        </span>
      )}
      <span className="text-[#575757] font-bold">
        {price === 0 ? 'FREE' : `$${price.toFixed(2)}`}
      </span>
    </div>
  );
}
