import productsData from '../../data/products.json';
import { useBundle } from '../../hooks/useBundle';
import { AccordionStep } from './AccordionStep';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types';

// Cast imported JSON to Product[]
const products = productsData as Product[];

// --- Icons ---
const CameraIcon = <img src="/category-icons/cameras-icon.svg" alt="Cameras" className="w-full h-full object-contain" />;
const ShieldIcon = <img src="/category-icons/shield-icon.svg" alt="Plan" className="w-full h-full object-contain" />;
const SensorIcon = <img src="/category-icons/sensor-icon.svg" alt="Sensors" className="w-full h-full object-contain" />;
const GridIcon = <img src="/category-icons/protection-icon.svg" alt="Protection" className="w-full h-full object-contain" />;

export function Builder() {
  const { state, dispatch } = useBundle();

  const handleStepChange = (step: number) => {
    dispatch({ type: 'SET_ACTIVE_STEP', payload: { step } });
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId);
  };

  // Helper to count selected items in a specific category
  const getCategorySelectedCount = (categoryId: string) => {
    const catProducts = getProductsByCategory(categoryId);
    let count = 0;
    catProducts.forEach(p => {
      if (p.variants) {
        p.variants.forEach(v => {
          count += state.items[`${p.id}-${v.id}`] || 0;
        });
      } else {
        count += state.items[p.id] || 0;
      }
    });
    return count;
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <AccordionStep
        stepNumber={1}
        title="Choose your cameras"
        icon={CameraIcon}
        isActive={state.activeStep === 1}
        selectedCount={getCategorySelectedCount('cameras')}
        onToggle={() => handleStepChange(1)}
        onNext={() => handleStepChange(2)}
        nextText="Next: Choose your plan"
      >
        {getProductsByCategory('cameras').map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AccordionStep>

      <AccordionStep
        stepNumber={2}
        title="Choose your plan"
        icon={ShieldIcon}
        isActive={state.activeStep === 2}
        selectedCount={getCategorySelectedCount('plan')}
        onToggle={() => handleStepChange(2)}
        onNext={() => handleStepChange(3)}
        nextText="Next: Choose your sensors"
      >
        {getProductsByCategory('plan').map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AccordionStep>

      <AccordionStep
        stepNumber={3}
        title="Choose your sensors"
        icon={SensorIcon}
        isActive={state.activeStep === 3}
        selectedCount={getCategorySelectedCount('sensors')}
        onToggle={() => handleStepChange(3)}
        onNext={() => handleStepChange(4)}
        nextText="Next: Add extra protection"
      >
        {getProductsByCategory('sensors').map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AccordionStep>

      <AccordionStep
        stepNumber={4}
        title="Add extra protection"
        icon={GridIcon}
        isActive={state.activeStep === 4}
        selectedCount={getCategorySelectedCount('accessories')}
        onToggle={() => handleStepChange(4)}
        // The last step doesn't have a "Next" button
      >
        {getProductsByCategory('accessories').map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </AccordionStep>
    </div>
  );
}
