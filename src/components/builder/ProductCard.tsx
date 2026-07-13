import type { Product } from '../../types';
import { useBundle } from '../../hooks/useBundle';
import { Badge } from '../ui/Badge';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Stepper } from '../ui/Stepper';
import { VariantSelector } from '../ui/VariantSelector';

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useBundle();

  // 1. Determine active variant
  const hasVariants = product.variants && product.variants.length > 0;
  const activeVariantId = hasVariants
    ? state.activeVariants[product.id] || product.variants![0].id
    : undefined;

  // 2. Determine cart key and quantity
  const cartKey = hasVariants ? `${product.id}-${activeVariantId}` : product.id;
  const quantity = state.items[cartKey] || 0;

  // 3. Handlers
  const handleVariantClick = (variantId: string) => {
    dispatch({
      type: 'SET_ACTIVE_VARIANT',
      payload: { productId: product.id, variantId },
    });
  };

  const handleIncrement = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: cartKey, quantity: quantity + 1 },
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: cartKey, quantity: quantity - 1 },
    });
  };

  // Styling based on selection
  const isSelected = quantity > 0;
  const cardBorder = isSelected 
    ? 'border-[#4f46e5] bg-[#4f46e5]/5' 
    : 'border-gray-200 bg-white hover:border-gray-300';

  return (
    <div className={`relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 ${cardBorder}`}>
      {/* Badge Top Left */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge text={product.badge} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-row gap-4 flex-1">
        {/* Left: Image (Push down slightly if badge exists) */}
        <div className={`w-1/3 flex items-center justify-center ${product.badge ? 'pt-8' : ''}`}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-auto object-contain max-h-32"
          />
        </div>

        {/* Right: Info */}
        <div className="w-2/3 flex flex-col justify-start">
          <h3 className="font-bold text-gray-900 mb-1">{product.title}</h3>
          
          {product.description && (
            <p className="text-xs text-gray-600 leading-relaxed mb-1">
              {product.description}
            </p>
          )}
                    
          <a href="#" className="text-xs text-[#4f46e5] font-semibold hover:underline mb-3 inline-block">
            Learn More
          </a>

          {/* Variants */}
          {hasVariants && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {product.variants!.map((variant) => (
                <VariantSelector
                  key={variant.id}
                  name={variant.name}
                  swatchUrl={variant.swatchUrl}
                  isSelected={activeVariantId === variant.id}
                  onClick={() => handleVariantClick(variant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Area: Stepper & Price */}
      <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-100">
        <Stepper 
          quantity={quantity} 
          onIncrement={handleIncrement} 
          onDecrement={handleDecrement} 
        />

        <PriceDisplay 
          price={product.price} 
          compareAtPrice={product.compareAtPrice} 
        />
      </div>
    </div>
  );
}
