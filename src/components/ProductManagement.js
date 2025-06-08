import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../redux/productSlice';

function ProductManagement() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { id: editingId || Date.now(), title: name, price: parseFloat(price) };
    console.log('ProductManagement: Submitting product', product);
    if (editingId) {
      dispatch(updateProduct(product));
      setEditingId(null);
    } else {
      dispatch(addProduct(product));
    }
    setName('');
    setPrice('');
  };

  const handleEdit = (product) => {
    console.log('ProductManagement: Editing product', product);
    setName(product.title);
    setPrice(product.price);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    console.log('ProductManagement: Deleting product', id);
    dispatch(deleteProduct(id));
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex justify-center items-center h-screen text-red-400">Failed to load products.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Product Management</h2>
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-1 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                required
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 mt-1 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                required
                placeholder="Enter price"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 p-3 rounded-lg font-semibold hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="p-4 text-left text-gray-200 font-semibold">Name</th>
              <th className="p-4 text-left text-gray-200 font-semibold">Price</th>
              <th className="p-4 text-right text-gray-200 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t border-gray-600 hover:bg-gray-700/50 transition">
                <td className="p-4 text-white">{product.title}</td>
                <td className="p-4 text-white">${product.price}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-yellow-400 hover:text-yellow-300 mr-4 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;