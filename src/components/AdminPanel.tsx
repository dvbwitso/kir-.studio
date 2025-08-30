import { useState } from 'react';
import { Plus, Minus, Edit, Save, X, Trash2, Package, Settings } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

interface AdminPanelProps {
  products: Product[];
  inventory: { [key: string]: number };
  onProductsUpdate: (products: Product[]) => void;
  onInventoryUpdate: (inventory: { [key: string]: number }) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  inventory,
  onProductsUpdate,
  onInventoryUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'inventory'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddService, setShowAddService] = useState(false);

  // Sample services data (in real app, this would come from props)
  const [services, setServices] = useState<Service[]>([
    {
      id: 'facial-1',
      name: 'Deep Cleansing Facial',
      category: 'Facial Treatments',
      description: 'A comprehensive facial treatment that deep cleanses and purifies your skin',
      price: 'ZMW 350',
      duration: '60 minutes',
      image: '/src/images/services/facial-treatment.jpg'
    },
    {
      id: 'massage-1',
      name: 'Relaxing Full Body Massage',
      category: 'Massage Therapy',
      description: 'Unwind with our signature full body massage using premium oils',
      price: 'ZMW 450',
      duration: '90 minutes',
      image: '/src/images/services/massage.jpg'
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''
  });

  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    image: ''
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const productId = `product-${Date.now()}`;
      const updatedProducts = [...products, { ...newProduct, id: productId }];
      onProductsUpdate(updatedProducts);
      
      // Add to inventory with default stock
      const updatedInventory = { ...inventory, [productId]: 10 };
      onInventoryUpdate(updatedInventory);
      
      setNewProduct({ name: '', category: '', description: '', price: '', image: '' });
      setShowAddProduct(false);
    }
  };

  const handleAddService = () => {
    if (newService.name && newService.category && newService.price) {
      const serviceId = `service-${Date.now()}`;
      const updatedServices = [...services, { ...newService, id: serviceId }];
      setServices(updatedServices);
      setNewService({ name: '', category: '', description: '', price: '', duration: '', image: '' });
      setShowAddService(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    onProductsUpdate(updatedProducts);
    
    // Remove from inventory
    const updatedInventory = { ...inventory };
    delete updatedInventory[productId];
    onInventoryUpdate(updatedInventory);
  };

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter(s => s.id !== serviceId);
    setServices(updatedServices);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onProductsUpdate(updatedProducts);
    setEditingProduct(null);
  };

  const handleUpdateService = (updatedService: Service) => {
    const updatedServices = services.map(s => 
      s.id === updatedService.id ? updatedService : s
    );
    setServices(updatedServices);
    setEditingService(null);
  };

  const handleInventoryUpdate = (productId: string, change: number) => {
    const updatedInventory = {
      ...inventory,
      [productId]: Math.max(0, (inventory[productId] || 0) + change)
    };
    onInventoryUpdate(updatedInventory);
  };

  const handleImageUpload = (file: File, type: 'product' | 'service') => {
    // In a real app, you would upload to a server/cloud storage
    // For now, we'll create a local URL
    const imageUrl = URL.createObjectURL(file);
    
    if (type === 'product') {
      if (editingProduct) {
        setEditingProduct({ ...editingProduct, image: imageUrl });
      } else {
        setNewProduct({ ...newProduct, image: imageUrl });
      }
    } else {
      if (editingService) {
        setEditingService({ ...editingService, image: imageUrl });
      } else {
        setNewService({ ...newService, image: imageUrl });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif font-medium">Admin Panel</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { key: 'products', label: 'Products', icon: Package },
            { key: 'services', label: 'Services', icon: Settings },
            { key: 'inventory', label: 'Inventory', icon: Package }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === key 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-medium">Manage Products</h3>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h4 className="font-medium">Add New Product</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      placeholder="Price (e.g., ZMW 180)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Product Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0], 'product');
                          }
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                    </div>
                    <textarea
                      placeholder="Product Description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddProduct}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Add Product
                    </button>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Products List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    {editingProduct?.id === product.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          rows={2}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateProduct(editingProduct)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-sm font-medium">{product.price}</p>
                          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-medium">Manage Services</h3>
                <button
                  onClick={() => setShowAddService(true)}
                  className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Add Service Form */}
              {showAddService && (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h4 className="font-medium">Add New Service</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      placeholder="Price (e.g., ZMW 350)"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 60 minutes)"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Service Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0], 'service');
                          }
                        }}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                    </div>
                    <textarea
                      placeholder="Service Description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddService}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Add Service
                    </button>
                    <button
                      onClick={() => setShowAddService(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Services List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    {editingService?.id === service.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingService.name}
                          onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          value={editingService.category}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          value={editingService.price}
                          onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <textarea
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          rows={2}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateService(editingService)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingService(null)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.category}</p>
                          <p className="text-sm font-medium">{service.price}</p>
                          <p className="text-xs text-blue-600">{service.duration}</p>
                          <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingService(service)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-medium">Inventory Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => {
                  const currentStock = inventory[product.id] || 0;
                  const stockStatus = currentStock === 0 ? 'out-of-stock' : currentStock <= 5 ? 'low-stock' : 'in-stock';
                  const statusColor = stockStatus === 'out-of-stock' ? 'text-red-600' : 
                                     stockStatus === 'low-stock' ? 'text-orange-600' : 'text-green-600';
                  
                  return (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className={`text-xs ${statusColor}`}>
                            {stockStatus === 'out-of-stock' ? 'Out of Stock' :
                             stockStatus === 'low-stock' ? `Low Stock (${currentStock})` :
                             `In Stock (${currentStock})`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Stock: {currentStock}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleInventoryUpdate(product.id, -1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-12 text-center text-sm font-medium">
                            {currentStock}
                          </span>
                          <button
                            onClick={() => handleInventoryUpdate(product.id, 1)}
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handleInventoryUpdate(product.id, 10)}
                          className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleInventoryUpdate(product.id, 50)}
                          className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          +50
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const defaultInventory: { [key: string]: number } = {};
                    products.forEach(product => {
                      defaultInventory[product.id] = 20;
                    });
                    onInventoryUpdate(defaultInventory);
                  }}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Restock All Items (20 each)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
