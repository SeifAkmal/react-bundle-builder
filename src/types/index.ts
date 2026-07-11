export type CategoryId = 'cameras' | 'plan' | 'sensors' | 'accessories';

export interface Variant {
  id: string;
  name: string;
  swatchUrl: string;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  imageUrl: string;
  variants?: Variant[];
}

export interface BundleState {
  items: Record<string, number>;
  activeVariants: Record<string, string>;
  activeStep: number;
}
 