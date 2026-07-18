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
  const { state, dispatch, saveForLater } = useBundle();

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


  originalTotal += 5.99;
  const savings = originalTotal - currentTotal;

  return (
    <div className="bg-[#f4f5f9] rounded-xl py-[35px] px-4 sm:px-[61px]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        

        <div className="flex-1">

          <div className="mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your security system
            </h2>
            <p className="text-sm text-gray-600">
              Review your personalized protection system designed to keep what matters most safe.
            </p>
          </div>


          <div className="space-y-6">
            {groupedItems.map(category => (
              <div key={category.id}>
                <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-4 uppercase">
                  {category.label}
                </h3>
                <div className="space-y-4">
                  {category.items.map(item => (
                    <div key={item.key} className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-white rounded shadow-sm border border-gray-100 flex items-center justify-center p-1 shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      

                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm leading-tight">
                          {item.product.title}
                          {item.variant && <span className="text-gray-500 font-normal block sm:inline"> ({item.variant.name})</span>}
                        </span>
                        
                        <div className="shrink-0 scale-90 origin-left sm:origin-right mt-1 sm:mt-0">
                          <Stepper 
                            quantity={item.qty}
                            onIncrement={() => dispatch({ type: 'ADD_ITEM', payload: { id: item.key, quantity: item.qty + 1 } })}
                            onDecrement={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.key, quantity: item.qty - 1 } })}
                          />
                        </div>
                      </div>


                      <div className="text-right shrink-0 w-16">
                        {item.product.compareAtPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            ${(item.product.compareAtPrice * item.qty).toFixed(2)}
                          </div>
                        )}
                        <div className={`font-bold text-sm ${item.product.price === 0 ? 'text-[#4E2FD2]' : 'text-[#4E2FD2]'}`}>
                          {item.product.price === 0 ? 'FREE' : `$${(item.product.price * item.qty).toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-200 mt-6"></div>
              </div>
            ))}
          </div>


          <div className="flex items-center justify-between py-5 border-b border-gray-200 lg:border-none">
            <div className="flex items-center gap-3">
              {TruckIcon}
              <span className="font-medium text-gray-900 text-sm">Fast Shipping</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 line-through">$5.99</div>
              <div className="font-bold text-sm text-[#4E2FD2]">FREE</div>
            </div>
          </div>
        </div>


        <div className="flex-1 w-full flex flex-col justify-center">

          <div className="flex sm:hidden justify-between items-center mb-6">
            <div className="shrink-0 w-16 h-16">

              <img src="/review-icons/100%-badge.svg" alt="100% Satisfaction Guaranteed" className="w-full h-full object-contain" />
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <div className="bg-[#4E2FD2] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide inline-block">
                as low as $19.19/mo
              </div>
              <div className="flex items-baseline gap-2 justify-end mt-1">
                <span className="text-gray-400 line-through text-base font-medium">${originalTotal.toFixed(2)}</span>
                <span className="text-2xl font-extrabold text-[#4E2FD2] tracking-tight">${currentTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>


          <div className="hidden sm:block">

            <div className="flex items-center gap-4 mb-6">
              <div className="shrink-0">
                {RosetteIcon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[13px] mb-1">30-day hassle-free returns</h4>
                <p className="text-[12px] text-gray-600 leading-snug">
                  If you're not totally in love with the product, we will refund you 100%.
                </p>
              </div>
            </div>


            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="bg-[#4E2FD2] text-white text-[11px] px-3 py-1 rounded-full font-semibold tracking-wide inline-block">
                  as low as $19.19/mo
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-gray-400 line-through text-lg font-medium">${originalTotal.toFixed(2)}</span>
                  <span className="text-3xl font-extrabold text-[#4E2FD2] tracking-tight">${currentTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>


          <div className="text-center">
            {savings > 0 && (
              <p className="text-[13px] font-bold text-teal-600 mb-4">
                Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
              </p>
            )}
            <Button variant="primary" className="w-full py-4 text-base font-bold shadow-md">
              Checkout
            </Button>
            <button 
              onClick={saveForLater}
              className="mt-4 text-[13px] text-gray-500 underline italic hover:text-gray-900 transition-colors"
            >
              Save my system for later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
