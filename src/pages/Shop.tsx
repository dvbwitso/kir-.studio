import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, User, MapPin, Phone, Mail, CreditCard, Settings } from 'lucide-react';
import { ProductBottleIllustration, ShoppingIllustration } from '../components/Illustrations';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../contexts/AuthContext';

const Shop = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'payment' | 'confirmation'>('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | 'card' | ''>('');

  const [inventory, setInventory] = useState<{[key: string]: number}>({
    'body-oil-1': 15,
    'body-oil-2': 8,
    'serum-1': 12,
    'serum-2': 0, // Out of stock
    'serum-3': 3, // Low stock
    'body-oil-3': 20,
  });

  const [products, setProducts] = useState([
    {
      id: 'body-oil-1',
      name: 'Nourishing Body Oil',
      category: 'Body Oils',
      description: 'Luxurious blend of natural oils for silky smooth skin',
      price: 'ZMW 180',
      image: '/images/products/naurishing-body-oil.jpg',
    },
    {
      id: 'body-oil-2',
      name: 'Relaxing Lavender Oil',
      category: 'Body Oils',
      description: 'Calming lavender-infused oil for evening relaxation',
      price: 'ZMW 200',
      image: '/images/products/relaxing-lavendar.jpg',
    },
    {
      id: 'serum-1',
      name: 'Vitamin C Brightening Serum',
      category: 'Face Serums',
      description: 'Antioxidant-rich serum for radiant, even skin tone',
      price: 'ZMW 250',
      image: '/images/products/vitamin-c-serum.jpg',
    },
    {
      id: 'serum-2',
      name: 'Hyaluronic Acid Serum',
      category: 'Face Serums',
      description: 'Deep hydration serum for plump, youthful skin',
      price: 'ZMW 280',
      image: '/images/products/Hyaluronic-Acid-Serum.jpg',
    },
    {
      id: 'serum-3',
      name: 'Retinol Night Serum',
      category: 'Face Serums',
      description: 'Gentle retinol formula for overnight skin renewal',
      price: 'ZMW 320',
      image: '/images/products/Retinol-Night-Serum.jpg',
    },
    {
      id: 'body-oil-3',
      name: 'Rejuvenating Argan Oil',
      category: 'Body Oils',
      description: 'Pure argan oil for deep nourishment and repair',
      price: 'ZMW 220',
      image: '/images/products/naurishing-body-oil.jpg',
    },
  ]);

  const updateCart = (productId: string, change: number) => {
    const currentStock = inventory[productId] || 0;
    const currentCartQuantity = cart[productId] || 0;
    
    // Check if adding to cart would exceed available stock
    if (change > 0 && currentCartQuantity >= currentStock) {
      return; // Don't add if no stock available
    }
    
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getStockStatus = (productId: string) => {
    const stock = inventory[productId] || 0;
    const cartQuantity = cart[productId] || 0;
    const availableStock = stock - cartQuantity;
    
    if (stock === 0) return { status: 'out-of-stock', message: 'Out of Stock', color: 'text-red-600' };
    if (availableStock <= 0) return { status: 'cart-full', message: 'All Available in Cart', color: 'text-orange-600' };
    if (stock <= 5) return { status: 'low-stock', message: `Only ${availableStock} left`, color: 'text-orange-600' };
    return { status: 'in-stock', message: `${availableStock} in stock`, color: 'text-green-600' };
  };

  const isProductAvailable = (productId: string) => {
    const stock = inventory[productId] || 0;
    const cartQuantity = cart[productId] || 0;
    return stock > 0 && cartQuantity < stock;
  };

  const completeOrder = () => {
    // Update inventory when order is completed
    const updatedInventory = { ...inventory };
    Object.entries(cart).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        updatedInventory[productId] = Math.max(0, (updatedInventory[productId] || 0) - quantity);
      }
    });
    setInventory(updatedInventory);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      if (product && quantity > 0) {
        const price = parseFloat(product.price.replace('ZMW ', ''));
        return total + (price * quantity);
      }
      return total;
    }, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return product ? { ...product, quantity } : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep('cart');
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompleteOrder = () => {
    // Update inventory when order is completed
    completeOrder();
    
    // Simulate order processing
    setCheckoutStep('confirmation');
    // Reset cart after order
    setTimeout(() => {
      setCart({});
      setShowCheckout(false);
      setCheckoutStep('cart');
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
      });
      setPaymentMethod('');
    }, 3000);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8 mb-16">
          <div className="flex justify-between items-start">
            <div></div>
            <div className="flex-1">
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
            <div>
              {user && (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>
          </div>
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
              <button 
                onClick={handleProceedToCheckout}
                className="btn-primary text-xs px-4 py-2"
              >
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
                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${getStockStatus(product.id).color}`}>
                      {getStockStatus(product.id).message}
                    </span>
                    {getStockStatus(product.id).status === 'out-of-stock' && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Notify When Available
                      </span>
                    )}
                  </div>
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
                          disabled={!isProductAvailable(product.id)}
                          className="w-8 h-8 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateCart(product.id, 1)}
                        disabled={!isProductAvailable(product.id)}
                        className="btn-primary text-xs px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {getStockStatus(product.id).status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
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
              <button 
                onClick={handleProceedToCheckout}
                className="btn-primary"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Inventory Management (Admin Section) */}
        {user && (
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-serif font-medium mb-6">Inventory Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const stockInfo = getStockStatus(product.id);
                const currentStock = inventory[product.id] || 0;
                
                return (
                  <div key={product.id} className="bg-white p-4 rounded-lg border border-nude">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className={`text-xs ${stockInfo.color}`}>
                          {stockInfo.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-warm-gray">
                        Stock: {currentStock}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setInventory(prev => ({
                            ...prev,
                            [product.id]: Math.max(0, (prev[product.id] || 0) - 1)
                          }))}
                          className="w-6 h-6 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors text-xs"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {currentStock}
                        </span>
                        <button
                          onClick={() => setInventory(prev => ({
                            ...prev,
                            [product.id]: (prev[product.id] || 0) + 1
                          }))}
                          className="w-6 h-6 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors text-xs"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    
                    {cart[product.id] && (
                      <div className="mt-2 text-xs text-warm-gray">
                        In cart: {cart[product.id]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  // Reset all inventory to default values
                  setInventory({
                    'body-oil-1': 15,
                    'body-oil-2': 8,
                    'serum-1': 12,
                    'serum-2': 10,
                    'serum-3': 3,
                    'body-oil-3': 20,
                  });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Restock All Items
              </button>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-nude">
                <h2 className="text-2xl font-serif font-medium">Checkout</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-nude/30 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 py-4 border-b border-nude/30">
                <div className="flex items-center justify-center space-x-4">
                  {[
                    { key: 'cart', label: 'Cart Review' },
                    { key: 'details', label: 'Details' },
                    { key: 'payment', label: 'Payment' },
                    { key: 'confirmation', label: 'Confirmation' }
                  ].map((step, index) => (
                    <div key={step.key} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        checkoutStep === step.key || 
                        (['details', 'payment', 'confirmation'].includes(checkoutStep) && step.key === 'cart') ||
                        (['payment', 'confirmation'].includes(checkoutStep) && step.key === 'details') ||
                        (checkoutStep === 'confirmation' && step.key === 'payment')
                          ? 'bg-black text-white' 
                          : 'bg-nude text-warm-gray'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`ml-2 text-sm ${
                        checkoutStep === step.key ? 'text-black font-medium' : 'text-warm-gray'
                      }`}>
                        {step.label}
                      </span>
                      {index < 3 && <div className="w-8 h-px bg-nude mx-4" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                
                {/* Cart Review Step */}
                {checkoutStep === 'cart' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-medium">Review Your Cart</h3>
                    
                    <div className="space-y-4">
                      {getCartItems().map((item) => {
                        const availableStock = (inventory[item.id] || 0) - (cart[item.id] || 0);
                        
                        return (
                          <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-nude/30">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-warm-gray">{item.category}</p>
                              <p className="text-sm font-medium">{item.price}</p>
                              {item.quantity > (inventory[item.id] || 0) && (
                                <p className="text-xs text-red-600 mt-1">
                                  ⚠️ Only {inventory[item.id] || 0} available in stock
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateCart(item.id, -1)}
                                className="w-8 h-8 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCart(item.id, 1)}
                                disabled={availableStock <= 0}
                                className="w-8 h-8 border border-warm-gray rounded-full flex items-center justify-center hover:bg-warm-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ZMW {(parseFloat(item.price.replace('ZMW ', '')) * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-nude/30 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Total:</span>
                        <span className="text-xl font-serif font-medium">
                          ZMW {getCartTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => setCheckoutStep('details')}
                        className="btn-primary"
                      >
                        Continue to Details
                      </button>
                    </div>
                  </div>
                )}

                {/* Customer Details Step */}
                {checkoutStep === 'details' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-medium">Delivery Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-warm-gray">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                          className="w-full p-3 border border-nude rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-warm-gray">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                          className="w-full p-3 border border-nude rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-warm-gray">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          className="w-full p-3 border border-nude rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-warm-gray">
                          <MapPin className="w-4 h-4 mr-2" />
                          City
                        </label>
                        <input
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                          className="w-full p-3 border border-nude rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your city"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-warm-gray">
                          <MapPin className="w-4 h-4 mr-2" />
                          Delivery Address
                        </label>
                        <textarea
                          value={customerInfo.address}
                          onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                          className="w-full p-3 border border-nude rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          rows={3}
                          placeholder="Enter your complete delivery address"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep('cart')}
                        className="px-6 py-2 border border-warm-gray text-warm-gray rounded-lg hover:bg-warm-gray hover:text-white transition-colors"
                      >
                        Back to Cart
                      </button>
                      <button 
                        onClick={() => setCheckoutStep('payment')}
                        disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {checkoutStep === 'payment' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-medium">Payment Method</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* MTN Mobile Money */}
                      <div 
                        onClick={() => setPaymentMethod('momo')}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                          paymentMethod === 'momo' ? 'border-black bg-black/5' : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <div className="text-center space-y-4">
                          <img 
                            src="/images/momo.jpg" 
                            alt="MTN Mobile Money" 
                            className="w-16 h-16 mx-auto object-contain"
                          />
                          <div>
                            <h4 className="font-medium">MTN Mobile Money</h4>
                            <p className="text-sm text-warm-gray">Pay with MTN MoMo</p>
                          </div>
                        </div>
                      </div>

                      {/* Airtel Money */}
                      <div 
                        onClick={() => setPaymentMethod('airtel')}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                          paymentMethod === 'airtel' ? 'border-black bg-black/5' : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <div className="text-center space-y-4">
                          <img 
                            src="/images/airtel-money.jpg" 
                            alt="Airtel Money" 
                            className="w-16 h-16 mx-auto object-contain"
                          />
                          <div>
                            <h4 className="font-medium">Airtel Money</h4>
                            <p className="text-sm text-warm-gray">Pay with Airtel Money</p>
                          </div>
                        </div>
                      </div>

                      {/* Credit Card */}
                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-black bg-black/5' : 'border-nude hover:border-warm-gray'
                        }`}
                      >
                        <div className="text-center space-y-4">
                          <CreditCard className="w-16 h-16 mx-auto text-warm-gray" />
                          <div>
                            <h4 className="font-medium">Credit/Debit Card</h4>
                            <p className="text-sm text-warm-gray">Pay with card</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    {paymentMethod && (
                      <div className="bg-nude/30 rounded-lg p-6 space-y-4">
                        <h4 className="font-medium">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>ZMW {getCartTotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span>ZMW 25.00</span>
                          </div>
                          <div className="border-t border-nude pt-2">
                            <div className="flex justify-between font-medium text-lg">
                              <span>Total:</span>
                              <span>ZMW {(getCartTotal() + 25).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep('details')}
                        className="px-6 py-2 border border-warm-gray text-warm-gray rounded-lg hover:bg-warm-gray hover:text-white transition-colors"
                      >
                        Back to Details
                      </button>
                      <button 
                        onClick={handleCompleteOrder}
                        disabled={!paymentMethod}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Complete Order
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirmation Step */}
                {checkoutStep === 'confirmation' && (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-medium">Order Confirmed!</h3>
                      <p className="text-warm-gray">
                        Thank you for your purchase. We'll send you a confirmation email shortly.
                      </p>
                    </div>

                    <div className="bg-nude/30 rounded-lg p-6 text-left">
                      <h4 className="font-medium mb-4">Order Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Order Number:</span>
                          <span className="font-medium">#KS{Date.now().toString().slice(-6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Amount:</span>
                          <span className="font-medium">ZMW {(getCartTotal() + 25).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Method:</span>
                          <span className="font-medium capitalize">
                            {paymentMethod === 'momo' ? 'MTN Mobile Money' : 
                             paymentMethod === 'airtel' ? 'Airtel Money' : 'Credit Card'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Address:</span>
                          <span className="font-medium text-right max-w-xs">
                            {customerInfo.address}, {customerInfo.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-warm-gray">
                      You will receive an SMS confirmation and delivery updates on {customerInfo.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {showAdminPanel && (
          <AdminPanel
            products={products}
            inventory={inventory}
            onProductsUpdate={setProducts}
            onInventoryUpdate={setInventory}
            onClose={() => setShowAdminPanel(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;