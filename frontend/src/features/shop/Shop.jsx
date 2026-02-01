import axios from 'axios';
import { ChevronDown, Package, Search, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/shop/products')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); 
  }, [categoryFilter, searchQuery, sortBy, products]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="bg-light-bg min-h-screen font-sans text-secondary">
      {/* Hero Banner */}
      <div className="relative bg-secondary h-80 flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        
        <h1 className="text-6xl md:text-7xl font-serif font-bold text-white mb-6 z-10 relative animate-in fade-in slide-in-from-bottom-8 duration-700">
          Our <span className="italic text-primary">Collection</span>
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto mb-8 z-10 relative text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Curated plants and accessories to bring life to your space.
        </p>
        <div className="text-xs text-gray-400 uppercase tracking-widest z-10 font-bold animate-in fade-in duration-700 delay-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link> <span className="mx-2">/</span> <span className="text-primary">Shop</span>
        </div>
      </div>

      {/* Best Sellers Section (Dynamic) */}
      {products.length > 0 && (
        <div className="container mx-auto px-4 py-12 border-b border-secondary/10">
          <div className="flex items-center gap-2 mb-8">
             <span className="text-2xl">🔥</span>
             <h2 className="text-2xl font-serif font-bold text-secondary">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3).map((product, idx) => (
               <div key={product._id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all border border-secondary/5 group">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.image || '/images/placeholder-plant.png'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <div className="flex text-yellow-400 text-xs mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                      ))}
                    </div>
                    <h3 className="font-serif font-bold text-secondary text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="font-bold text-primary">₹{product.price}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Navigation Bar */}
      <div className="border-b border-secondary/10 bg-white sticky top-[73px] z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6 overflow-x-auto">
          <div className="flex justify-center gap-10 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-sm font-bold uppercase tracking-widest hover:text-primary transition-all pb-2 relative ${
                  categoryFilter === cat ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {cat}
                {categoryFilter === cat && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Left Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-colors bg-white text-secondary shadow-sm">
                Filter By <ChevronDown size={16} />
              </button>
              {/* Dropdown Content (Mock) */}
              <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg hidden group-hover:block z-20">
                {categories.map(cat => (
                   <div key={cat} onClick={() => setCategoryFilter(cat)} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">{cat}</div>
                ))}
              </div>
            </div>
            
            <button className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-colors bg-white text-secondary shadow-sm">
              Color <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-colors bg-white text-secondary shadow-sm">
              Size <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-colors bg-white text-secondary shadow-sm">
              Price <ChevronDown size={16} />
            </button>
          </div>

          {/* Right Sort & Search */}
          <div className="flex items-center gap-4">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white w-48 focus:w-64 transition-all shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
             </div>

            <div className="relative group">
               <button className="flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors">
                 {sortBy === 'default' ? 'Default sorting' : sortBy === 'priceAsc' ? 'Price: Low to High' : 'Price: High to Low'} 
                 <ChevronDown size={16} />
               </button>
               <div className="absolute top-full right-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl hidden group-hover:block z-20 overflow-hidden mt-2">
                  <div onClick={() => setSortBy('default')} className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-600 hover:text-primary">Default sorting</div>
                  <div onClick={() => setSortBy('priceAsc')} className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-600 hover:text-primary">Price: Low to High</div>
                  <div onClick={() => setSortBy('priceDesc')} className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-600 hover:text-primary">Price: High to Low</div>
               </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Cart, Orders, Admin) */}
        <div className="mb-8 flex flex-wrap justify-end gap-4">
          <button
            className="flex items-center gap-2 bg-white text-secondary border border-secondary/10 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-secondary hover:text-white transition-all shadow-sm"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart size={18} /> My Cart
          </button>
          
          <button
            className="flex items-center gap-2 bg-white text-secondary border border-secondary/10 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-secondary hover:text-white transition-all shadow-sm"
            onClick={() => navigate('/orders')}
          >
            <Package size={18} /> My Orders
          </button>

          {user?.role === 'admin' && (
            <button
              className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
              onClick={() => navigate('/admin/shop')}
            >
              + Add Product
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} showBuyNow={true} />
          ))}
        </div>

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/20">
            <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-secondary mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${
                  currentPage === i + 1
                    ? 'bg-primary text-white shadow-primary/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPages && (
               <button 
                 onClick={() => setCurrentPage(currentPage + 1)}
                 className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-primary hover:text-primary transition-all shadow-sm"
               >
                 &gt;
               </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
