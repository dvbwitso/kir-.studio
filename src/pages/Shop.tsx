import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, User, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { ProductBottleIllustration, ShoppingIllustration } from '../components/Illustrations';
import FloatingBookingButton from '../components/FloatingBookingButton';
import { fetchProducts, subscribeToProducts, Product, isItemNew, getDiscountedPrice, formatDiscount } from '../lib/sanity';
import { env } from '../utils/env';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'payment' | 'confirmation'>('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | 'card' | ''>('');

  useEffect(() => {
    // Fetch initial products
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false);
    };

    loadProducts();

    // Subscribe to real-time updates
    const subscription = subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
      console.log('Products updated in real-time!');
    });

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  const updateCart = (productId: string, change: number) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;

    const currentCartQuantity = cart[productId] || 0;
    const newQuantity = currentCartQuantity + change;

    if (newQuantity <= 0) {
      const { [productId]: _, ...newCart } = cart;
      setCart(newCart);
    } else if (newQuantity <= product.stock) {
      setCart(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p._id === productId);
      if (product) {
        const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        return total + (price * quantity);
      }
      return total;
    }, 0);
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: 'out-of-stock', text: 'Out of Stock', color: 'text-red-600' };
    if (product.stock <= 3) return { status: 'low-stock', text: `Only ${product.stock} left`, color: 'text-orange-600' };
    return { status: 'in-stock', text: 'In Stock', color: 'text-green-600' };
  };

  // Group products by category
  const productCategories = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const resetCheckout = () => {
    setCheckoutStep('cart');
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
    });
    setPaymentMethod('');
  };

  const handleCheckout = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    } else if (checkoutStep === 'details') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      setCheckoutStep('confirmation');
      setCart({});
      setTimeout(() => {
        setShowCheckout(false);
        resetCheckout();
      }, 3000);
    }
  };

  const isValidCustomerInfo = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address && customerInfo.city;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-warm-gray">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-light">
            Beauty Shop
          </h1>
          <div className="flex justify-center py-8">
            <ProductBottleIllustration className="w-40 h-40" />
          </div>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Discover our premium collection of skincare and beauty products, 
            carefully selected to enhance your natural beauty.
          </p>
        </div>

        {/* Cart Summary */}
        {getCartItemsCount() > 0 && (
          <div className="bg-nude/30 border border-nude rounded-lg p-6 mb-12 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-warm-gray text-white rounded-full p-2">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-medium text-black">
                    {getCartItemsCount()} item{getCartItemsCount() !== 1 ? 's' : ''} in cart
                  </span>
                  <p className="text-sm text-warm-gray">
                    Total: ZMW {getCartTotal().toFixed(2)}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                className="bg-warm-gray text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-all duration-200 hover:scale-105 transform"
              >
                View Cart
              </button>
            </div>
          </div>
        )}

        {Object.keys(productCategories).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray text-lg">No products available at the moment.</p>
            <p className="text-warm-gray mt-2">Please check back later or contact us directly.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(productCategories).map(([categoryName, categoryProducts]) => (
              <div key={categoryName} className="space-y-8">
                <h2 className="text-3xl font-serif font-medium text-center">
                  {categoryName}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product) => {
                    const stockStatus = getStockStatus(product);
                    const cartQuantity = cart[product._id] || 0;
                    const isNew = isItemNew(product);
                    const priceInfo = getDiscountedPrice(product);
                    
                    return (
                      <div
                        key={product._id}
                        className="bg-white border border-nude rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden relative group"
                      >
                        {/* Tags */}
                        <div className="absolute top-4 left-4 z-10 space-y-2">
                          {isNew && (
                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                              NEW
                            </span>
                          )}
                          {priceInfo.hasDiscount && priceInfo.discountPercentage && (
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium block">
                              {formatDiscount(priceInfo.discountPercentage)}
                            </span>
                          )}
                          {stockStatus.status === 'low-stock' && (
                            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium block">
                              Low Stock
                            </span>
                          )}
                        </div>

                        {/* Product Image */}
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                          {product.image?.asset?.url ? (
                            <img
                              src={product.image.asset.url}
                              alt={product.image.alt || product.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                // Fallback to a placeholder if image doesn't exist
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-warm-gray text-6xl">🧴</span>
                            </div>
                          )}
                          {/* Hover overlay with product bottle icon */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ProductBottleIllustration className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-8 space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-xs text-warm-gray uppercase tracking-wider font-medium">
                                  {product.category}
                                </p>
                                <h3 className="text-xl font-serif font-medium mt-1">
                                  {product.name}
                                </h3>
                              </div>
                              <div className="text-right">
                                {priceInfo.hasDiscount && priceInfo.originalPrice ? (
                                  <div className="space-y-1">
                                    <span className="text-lg font-medium text-black">
                                      {priceInfo.currentPrice}
                                    </span>
                                    <div className="text-sm text-gray-500 line-through">
                                      {priceInfo.originalPrice}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-lg font-medium text-black">
                                    {priceInfo.currentPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-warm-gray text-sm leading-relaxed">
                              {product.description}
                            </p>
                            
                            {/* Stock Status */}
                            <div className="flex items-center justify-between text-xs pt-2">
                              <span className={`${stockStatus.color} font-medium`}>
                                {stockStatus.text}
                              </span>
                              <span className="text-warm-gray">
                                Stock: {product.stock}
                              </span>
                            </div>
                          </div>
                          
                          {/* Add to Cart Controls */}
                          <div className="pt-4">
                            {product.stock > 0 ? (
                              <div className="space-y-3">
                                {cartQuantity === 0 ? (
                                  <button
                                    onClick={() => updateCart(product._id, 1)}
                                    className="w-full bg-warm-gray text-white py-3 px-6 rounded-lg font-medium hover:bg-black transition-all duration-200 hover:scale-105 transform active:scale-95"
                                  >
                                    Add to Cart
                                  </button>
                                ) : (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-center space-x-4 bg-nude/20 rounded-lg p-3">
                                      <button
                                        onClick={() => updateCart(product._id, -1)}
                                        className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-all duration-200 active:scale-95"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </button>
                                      <span className="font-medium text-lg min-w-[3rem] text-center">{cartQuantity}</span>
                                      <button
                                        onClick={() => updateCart(product._id, 1)}
                                        disabled={cartQuantity >= product.stock}
                                        className="bg-warm-gray text-white p-2 rounded-lg hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 active:scale-95"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <p className="text-xs text-center text-warm-gray">
                                      {cartQuantity} in cart
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                disabled
                                className="w-full py-3 px-6 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed opacity-60"
                              >
                                Out of Stock
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-nude p-6 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif font-medium">
                  {checkoutStep === 'cart' && 'Shopping Cart'}
                  {checkoutStep === 'details' && 'Customer Details'}
                  {checkoutStep === 'payment' && 'Payment Method'}
                  {checkoutStep === 'confirmation' && 'Order Confirmed!'}
                </h2>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    resetCheckout();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {checkoutStep === 'cart' && (
                <div>
                  {Object.keys(cart).length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingIllustration className="w-32 h-32 mx-auto mb-4" />
                      <p className="text-warm-gray">Your cart is empty</p>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 mb-6">
                        {Object.entries(cart).map(([productId, quantity]) => {
                          const product = products.find(p => p._id === productId);
                          if (!product) return null;
                          
                          return (
                            <div key={productId} className="flex items-center justify-between border-b border-nude pb-4">
                              <div className="flex items-center space-x-4">
                                {product.image?.asset?.url ? (
                                  <img
                                    src={product.image.asset.url}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400">🧴</span>
                                  </div>
                                )}
                                <div>
                                  <h3 className="font-medium">{product.name}</h3>
                                  <p className="text-warm-gray">{product.price}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateCart(productId, -1)}
                                  className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3">{quantity}</span>
                                <button
                                  onClick={() => updateCart(productId, 1)}
                                  disabled={quantity >= product.stock}
                                  className="bg-black text-white p-1 rounded hover:bg-warm-gray hover:text-black transition-colors duration-200 disabled:bg-gray-300"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="border-t border-nude pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-medium">Total:</span>
                          <span className="text-xl font-medium text-black">
                            ZMW {getCartTotal().toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          className="btn-primary w-full"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {checkoutStep === 'details' && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2 text-black font-medium mb-3">
                      <User className="w-4 h-4" />
                      <span>Full Name <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-black font-medium mb-3">
                      <Mail className="w-4 h-4" />
                      <span>Email Address <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-black font-medium mb-3">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                      placeholder={env.contact.phone.includes('XXX') ? '+260 XXX XXX XXX' : env.contact.phone}
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-black font-medium mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>Delivery Address <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-black font-medium mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>City <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full border border-nude rounded-lg px-4 py-3 focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                      placeholder="Enter your city"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleCheckout}
                      disabled={!isValidCustomerInfo()}
                      className="w-full bg-warm-gray text-white py-3 px-6 rounded-lg font-medium hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-gray-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-nude/20 border border-nude rounded-lg p-4">
                    <h4 className="font-medium text-black mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-warm-gray">Items:</span>
                        <span className="font-medium">{getCartItemsCount()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-nude">
                        <span className="text-warm-gray">Total Amount:</span>
                        <span className="font-semibold text-black text-lg">ZMW {getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">Select Payment Method</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        onClick={() => setPaymentMethod('momo')}
                        className={`border-2 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                          paymentMethod === 'momo' 
                            ? 'border-warm-gray bg-nude/20 ring-2 ring-warm-gray/30' 
                            : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <img src="/images/momo.jpg" alt="MTN Mobile Money" className="w-16 h-16 mx-auto mb-2 rounded object-cover" />
                        <p className="text-sm font-medium">MTN MoMo</p>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('airtel')}
                        className={`border-2 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                          paymentMethod === 'airtel' 
                            ? 'border-warm-gray bg-nude/20 ring-2 ring-warm-gray/30' 
                            : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <img src="/images/airtel-money.jpg" alt="Airtel Money" className="w-16 h-16 mx-auto mb-2 rounded object-cover" />
                        <p className="text-sm font-medium">Airtel Money</p>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`border-2 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                          paymentMethod === 'card' 
                            ? 'border-warm-gray bg-nude/20 ring-2 ring-warm-gray/30' 
                            : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded flex items-center justify-center">
                          <CreditCard className="w-8 h-8 text-warm-gray" />
                        </div>
                        <p className="text-sm font-medium">Credit Card</p>
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleCheckout}
                      disabled={!paymentMethod}
                      className="w-full bg-warm-gray text-white py-3 px-6 rounded-lg font-medium hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-gray-300"
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'confirmation' && (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-green-600 text-4xl">✅</div>
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-4 text-black">Order Confirmed!</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium mb-2">
                      Order Total: ZMW {getCartTotal().toFixed(2)}
                    </p>
                    <p className="text-green-700 text-sm">
                      Thank you for your order! We'll contact you shortly to confirm delivery details and arrange payment.
                    </p>
                  </div>
                  <p className="text-sm text-warm-gray">
                    This window will close automatically in a few seconds...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Booking Button for Mobile */}
      <FloatingBookingButton />
    </div>
  );
};

export default Shop;
