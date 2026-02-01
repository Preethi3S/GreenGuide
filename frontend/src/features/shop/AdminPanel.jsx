import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.auth || {});

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/shop/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== '_id') fd.append(key, value);
    });
    if (file) fd.append('image', file);

    if (form._id) {
      // Update product
      await axios.put(`/api/shop/products/${form._id}`, fd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product Updated!');
    } else {
      // Add product
      await axios.post('/api/shop/products', fd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product Added!');
    }

    setForm({});
    setFile(null);
    fetchProducts();
  } catch (error) {
    console.error('Failed to submit product:', error);
    alert('Failed to submit product');
  }
};


  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shop/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert('Delete failed');
    }
  };

  // Edit product (fill form with existing data)
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      countInStock: product.countInStock,
      deliveryDate: product.deliveryDate?.slice(0, 10),
      description: product.description,
      _id: product._id, // store _id to differentiate between add/edit
    });
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🛠️</span>
          <h2 className="text-3xl font-serif font-bold text-secondary">Manage Products</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8 mb-10">
          <h3 className="text-xl font-bold text-secondary mb-6">{form._id ? 'Edit Product' : 'Add New Product'}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Organic Fertilizer"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Seeds, Tools"
                  value={form.category || ''}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Stock Count</label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.countInStock || ''}
                  onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Delivery Date</label>
                <input
                  type="date"
                  value={form.deliveryDate || ''}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Description</label>
              <textarea
                placeholder="Product details..."
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors h-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Product Image</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20"
            >
              {form._id ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Existing Products</h3>
          {products.map((p) => (
            <div key={p._id} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/5 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🌱</div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-lg">{p.name}</h4>
                  <p className="text-sm text-gray-500">₹{p.price} • Stock: {p.countInStock}</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 md:flex-none px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
