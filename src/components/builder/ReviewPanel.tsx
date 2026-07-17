import productsData from '../../data/products.json';
import { useBundle } from '../../hooks/useBundle';
import { Stepper } from '../ui/Stepper';
import { Button } from '../ui/Button';
import type { Product } from '../../types';

const products = productsData as Product[];

const categoriesOrder = [
  { id: 'cameras', label: 'CAMERAS' },
  { id: 'sensors', label: 'SENSORS' },
  { id: 'accessories', label: 'ACCESSORIES' },
  { id: 'plan', label: 'PLAN' },
];

const TruckIcon = <img src="/review-icons/truck-badge.svg" alt="Fast Shipping" className="w-8 h-8 object-contain" />;
const RosetteIcon = <img src="/review-icons/100%-badge.svg" alt="100% Satisfaction Guaranteed" className="w-24 h-24 object-contain" />;

export function ReviewPanel() {
  const { state, dispatch } = useBundle();

  const getCartItemDetails = (cartKey: string) => {
    let product = products.find(p => p.id === cartKey);
    let variant = undefined;
    
    if (!product) {
      product = products.find(p => cartKey.startsWith(p.id + '-'));
      if (product && product.variants) {
        const variantId = cartKey.replace(product.id + '-', '');
        variant = product.variants.find(v => v.id === variantId);
      }
    }
    return { product, variant };
  };

  // Build grouped items
  const allCartItems = Object.entries(state.items)
    .filter(([_, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { product, variant } = getCartItemDetails(key);
      return { key, qty, product: product!, variant };
    });

  const groupedItems = categoriesOrder
    .map(cat => {
      const itemsInThisCategory = allCartItems.filter(item => item.product?.categoryId === cat.id);
      return { ...cat, items: itemsInThisCategory };
    })
    .filter(cat => cat.items.length > 0);


  // Calculate totals
  let currentTotal = 0;
  let originalTotal = 0;

  Object.entries(state.items).forEach(([key, qty]) => {
    if (qty > 0) {
      const { product } = getCartItemDetails(key);
      if (product) {
        currentTotal += product.price * qty;
        originalTotal += (product.compareAtPrice || product.price) * qty;
      }
    }
  });

  // Fast Shipping
  originalTotal += 5.99;
  const savings = originalTotal - currentTotal;

  return (
    <div className="bg-[#f4f5f9] rounded-xl p-6 sm:p-8 sticky top-6">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[10px] tracking-widest text-gray-500 font-bold mb-2 uppercase">
          Review
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your security system
        </h2>
        <p className="text-sm text-gray-600">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Categories & Items */}
      <div className="space-y-6">
        {groupedItems.map(category => (
          <div key={category.id}>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-4 uppercase">
              {category.label}
            </h3>
            <div className="space-y-4">
              {category.items.map(item => (
                <div key={item.key} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-12 h-12 bg-white rounded shadow-sm border border-gray-100 flex items-center justify-center p-1 shrink-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Title & Stepper */}
                  <div className="flex-1 flex justify-between items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm leading-tight">
                      {item.product.title}
                    </span>
                    
                    <div className="shrink-0 scale-90 origin-right">
                      <Stepper 
                        quantity={item.qty}
                        onIncrement={() => dispatch({ type: 'ADD_ITEM', payload: { id: item.key, quantity: item.qty + 1 } })}
                        onDecrement={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.key, quantity: item.qty - 1 } })}
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right shrink-0 w-16">
                    {item.product.compareAtPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ${(item.product.compareAtPrice * item.qty).toFixed(2)}
                      </div>
                    )}
                    <div className={`font-bold text-sm ${item.product.price === 0 ? 'text-[#4f46e5]' : 'text-[#4f46e5]'}`}>
                      {item.product.price === 0 ? 'FREE' : `$${(item.product.price * item.qty).toFixed(2)}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Category separator (except for the last one if we wanted, but Figma shows thin lines. Let's add border to the bottom of the category container instead) */}
            <div className="h-px bg-gray-200 mt-6"></div>
          </div>
        ))}
      </div>

      {/* Shipping Row */}
      <div className="flex items-center justify-between py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {TruckIcon}
          <span className="font-medium text-gray-900 text-sm">Fast Shipping</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 line-through">$5.99</div>
          <div className="font-bold text-sm text-[#4f46e5]">FREE</div>
        </div>
      </div>

      {/* Footer Totals */}
      <div className="flex justify-between items-end mt-6">
        <div>
          {RosetteIcon}
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="bg-[#4f46e5] text-white text-[10px] px-3 py-1 rounded-full mb-1 font-semibold tracking-wide">
            as low as $19.19/mo
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 line-through text-lg font-medium">${originalTotal.toFixed(2)}</span>
            <span className="text-3xl font-extrabold text-[#4f46e5] tracking-tight">${currentTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Section */}
      <div className="text-center mt-6">
        {savings > 0 && (
          <p className="text-[13px] font-bold text-teal-600 mb-4">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        )}
        <Button variant="primary" className="w-full py-4 text-base font-bold shadow-md">
          Checkout
        </Button>
        <button className="mt-4 text-sm text-gray-600 underline hover:text-gray-900 transition-colors">
          Save my system for later
        </button>
      </div>
    </div>
  );
}