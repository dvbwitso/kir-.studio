// Inventory management utilities
export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  lowStockThreshold: number;
  lastRestocked: string;
  outOfStockSince?: string;
}

export interface InventoryData {
  products: Record<string, InventoryItem>;
  settings: {
    lowStockWarningEnabled: boolean;
    outOfStockNotificationsEnabled: boolean;
    autoRestockEnabled: boolean;
  };
  lastUpdated: string;
}

export const defaultInventory: Record<string, number> = {
  'body-oil-1': 15,
  'body-oil-2': 8,
  'serum-1': 12,
  'serum-2': 0, // Out of stock
  'serum-3': 3, // Low stock
  'body-oil-3': 20,
};

export const getStockStatus = (productId: string, inventory: Record<string, number>, cart: Record<string, number>) => {
  const stock = inventory[productId] || 0;
  const cartQuantity = cart[productId] || 0;
  const availableStock = stock - cartQuantity;
  
  if (stock === 0) return { status: 'out-of-stock', message: 'Out of Stock', color: 'text-red-600' };
  if (availableStock <= 0) return { status: 'cart-full', message: 'All Available in Cart', color: 'text-orange-600' };
  if (stock <= 5) return { status: 'low-stock', message: `Only ${availableStock} left`, color: 'text-orange-600' };
  return { status: 'in-stock', message: `${availableStock} in stock`, color: 'text-green-600' };
};

export const isProductAvailable = (productId: string, inventory: Record<string, number>, cart: Record<string, number>) => {
  const stock = inventory[productId] || 0;
  const cartQuantity = cart[productId] || 0;
  return stock > 0 && cartQuantity < stock;
};

export const updateInventoryAfterPurchase = (
  inventory: Record<string, number>, 
  cart: Record<string, number>
): Record<string, number> => {
  const updatedInventory = { ...inventory };
  Object.entries(cart).forEach(([productId, quantity]) => {
    if (quantity > 0) {
      updatedInventory[productId] = Math.max(0, (updatedInventory[productId] || 0) - quantity);
    }
  });
  return updatedInventory;
};

// Simulate loading inventory from localStorage or API
export const loadInventory = (): Record<string, number> => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kire-studio-inventory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved inventory:', error);
      }
    }
  }
  return defaultInventory;
};

// Simulate saving inventory to localStorage or API
export const saveInventory = (inventory: Record<string, number>): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('kire-studio-inventory', JSON.stringify(inventory));
    } catch (error) {
      console.error('Failed to save inventory:', error);
    }
  }
};
