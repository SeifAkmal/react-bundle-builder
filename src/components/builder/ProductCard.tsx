import type { Product } from '../../types';
import { useBundle } from '../../hooks/useBundle';
import { Badge } from '../ui/Badge';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Stepper } from '../ui/Stepper';
import { VariantSelector } from '../ui/VariantSelector';

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useBundle();


  const hasVariants = product.variants && product.variants.length > 0;
  const activeVariantId = hasVariants
    ? state.activeVariants[product.id] || product.variants![0].id
    : undefined;


  const cartKey = hasVariants ? `${product.id}-${activeVariantId}` : product.id;
  const quantity = state.items[cartKey] || 0;


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


  const isSelected = quantity > 0;
  const cardBorder = isSelected 
    ? 'border-[#4E2FD2] bg-white' 
    : 'border-gray-200 bg-white hover:border-gray-300';

  return (
    <div className={`relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 h-full ${cardBorder}`}>

      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge text={product.badge} />
        </div>
      )}


      <div className={`w-full flex items-center justify-center mb-3 ${product.badge ? 'pt-8' : ''}`}>
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-auto object-contain max-h-32"
        />
      </div>


      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-[15px] mb-1 leading-tight">{product.title}</h3>
        
        <p className="text-[12px] text-gray-600 leading-snug mb-2">
          {product.description && <span>{product.description} </span>}
          <a href="#" className="text-[#4E2FD2] font-semibold hover:underline">
            Learn More
          </a>
        </p>


        {hasVariants && (
          <div className="flex flex-wrap gap-2 mb-3 mt-auto">
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
        

        <div className="flex items-center justify-between gap-1 mt-auto flex-wrap">
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
    </div>
  );
}
