import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { ProductBottleIllustration, ShoppingIllustration } from '../components/Illustrations';

const Shop = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const products = [
    {
      id: 'body-oil-1',
      name: 'Nourishing Body Oil',
      category: 'Body Oils',
      description: 'Luxurious blend of natural oils for silky smooth skin',
      price: 'ZMW 180',
      image: 'https://images.pexels.com/photos/7656744/pexels-photo-7656744.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'body-oil-2',
      name: 'Relaxing Lavender Oil',
      category: 'Body Oils',
      description: 'Calming lavender-infused oil for evening relaxation',
      price: 'ZMW 200',
      image: 'https://images.pexels.com/photos/6627861/pexels-photo-6627861.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'serum-1',
      name: 'Vitamin C Brightening Serum',
      category: 'Face Serums',
      description: 'Antioxidant-rich serum for radiant, even skin tone',
      price: 'ZMW 250',
      image: 'https://images.pexels.com/photos/7656629/pexels-photo-7656629.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'serum-2',
      name: 'Hyaluronic Acid Serum',
      category: 'Face Serums',
      description: 'Deep hydration serum for plump, youthful skin',
      price: 'ZMW 280',
      image: 'https://images.pexels.com/photos/7656585/pexels-photo-7656585.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'serum-3',
      name: 'Retinol Night Serum',
      category: 'Face Serums',
      description: 'Gentle retinol formula for overnight skin renewal',
      price: 'ZMW 320',
      image: 'https://images.pexels.com/photos/6663378/pexels-photo-6663378.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'body-oil-3',
      name: 'Rejuvenating Argan Oil',
      category: 'Body Oils',
      description: 'Pure argan oil for deep nourishment and repair',
      price: 'ZMW 220',
      image: 'https://images.pexels.com/photos/6663311/pexels-photo-6663311.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const updateCart = (productId: string, change: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-light">
            Beauty Shop
          </h1>
          <div className="flex justify-center py-6">
            <ShoppingIllustration className="w-32 h-32" />
          </div>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Discover our curated collection of premium skincare products, 
            handpicked to complement your beauty routine.
          </p>
        </div>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="bg-nude/30 rounded-lg p-6 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">
                  {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart
                </span>
              </div>
              <button className="btn-primary text-xs px-4 py-2">
                View Cart
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-nude rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ProductBottleIllustration className="w-8 h-8" />
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-warm-gray uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-serif font-medium">
                    {product.name}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-nude/30">
                  <span className="text-lg font-medium text-black">
                    {product.price}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {cart[product.id] ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCart(product.id, -1)}
                          className="w-8 h-8 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {cart[product.id]}
                        </span>
                        <button
                          onClick={() => updateCart(product.id, 1)}
                          className="w-8 h-8 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateCart(product.id, 1)}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        {getTotalItems() > 0 && (
          <div className="mt-16 bg-white border border-nude rounded-lg p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-serif font-medium">
                Ready to Checkout?
              </h3>
              <p className="text-warm-gray">
                Complete your purchase through our secure payment system.
              </p>
              <button className="btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;