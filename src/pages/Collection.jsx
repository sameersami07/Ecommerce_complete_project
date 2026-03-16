import React, { useContext, useState, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItem from '../components/productItem'
import Title from '../components/Title'

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('relevant')
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const arr = [...products];
    if (sortOption === 'low') return arr.sort((a, b) => a.price - b.price);
    if (sortOption === 'high') return arr.sort((a, b) => b.price - a.price);
    return arr.sort((a, b) => b.date - a.date);
  }, [products, sortOption]);

  // Filter by category, type, and search
  const filteredProducts = useMemo(() => {
    let filtered = sortedProducts;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => selectedTypes.includes(p.subCategory));
    }
    if (search && search.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return filtered;
  }, [sortedProducts, selectedCategories, selectedTypes, search]);

  // Apply discount
  const displayProducts = filteredProducts.map(p => ({
    ...p,
    displayPrice: Math.max(0, p.price - 50)
  }));

  const handleProductClick = (product) => {
    // Navigate to Product page with selected product data
    // Assuming you have a routing setup, you can use something like:
    // history.push(`/product/${product.id}`);
    // Or if using React Router:
    // navigate(`/product/${product.id}`);
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Sidebar */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl cursor-pointer'>FILTER</p>
        <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>

        {/* Categories */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm'>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className='flex items-center gap-2'>
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, cat]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== cat));
                  }
                }} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Types */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
              <label key={type} className='flex items-center gap-2'>
                <input type="checkbox" checked={selectedTypes.includes(type)} onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTypes([...selectedTypes, type]);
                  } else {
                    setSelectedTypes(selectedTypes.filter(t => t !== type));
                  }
                }} />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className='flex-1'>
        <div className='py-6 mb-2 prata-regular'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} className={'text-2xl sm:text-3xl md:text-4xl'} />
          <p className='w-full sm:w-1/2 text-left m-0 text-xs sm:text-sm md:text-base text-gray-600 mt-3'>
            Explore our complete collection
          </p>
        </div>

        <div className='flex items-center justify-between mb-6'>
          <p className='text-sm text-gray-500'>{displayProducts.length} products</p>
          <label className='text-sm text-gray-600 flex items-center gap-2'>
            Sort by:
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className='ml-2 border border-gray-300 rounded px-3 py-1'>
              <option value='relevant'>Relevant</option>
              <option value='low'>Low to High</option>
              <option value='high'>High to Low</option>
            </select>
          </label>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
          {displayProducts.length > 0 ? displayProducts.map(p => (
            <ProductItem key={p._id} id={p._id} image={p.image} name={p.name} price={p.displayPrice} onClick={() => handleProductClick(p)} />
          )) : (
            <p className='text-gray-500'>No products</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Collection
