'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '@/redux/slice/productSlice';
import EditProductModal from './EditProductModal';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.error('Ürün silme hatası:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      await dispatch(updateProduct({
        id: editingProduct._id,
        productData: formData
      })).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Ürün güncelleme hatası:', error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold mb-4">{product.price} TL</p>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditProductModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default ProductList; 