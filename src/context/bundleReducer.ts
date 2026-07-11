import type { BundleState } from '../types';

export type BundleAction =
  | { type: 'ADD_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'SET_ACTIVE_VARIANT'; payload: { productId: string; variantId: string } }
  | { type: 'SET_ACTIVE_STEP'; payload: { step: number } };

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case 'ADD_ITEM':
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = { ...state.items };
        delete newItems[id];
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: { ...state.items, [id]: quantity },
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = { ...state.items };
      delete newItems[action.payload.id];
      return { ...state, items: newItems };
    }
    case 'SET_ACTIVE_VARIANT': {
      return {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [action.payload.productId]: action.payload.variantId,
        },
      };
    }
    case 'SET_ACTIVE_STEP': {
      return {
        ...state,
        activeStep: action.payload.step,
      };
    }
    default:
      return state;
  }
}
  