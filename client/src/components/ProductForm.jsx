"use client"

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/productSlice';

const ProductForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct(formData)).unwrap();
      // Form başarıyla gönderildikten sonra formu temizle
      setFormData({
        title: '',
        description: '',
        price: 0,
        images: []
      });
    } catch (error) {
      console.error('Ürün ekleme hatası:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ürün Adı</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Açıklama</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Fiyat</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            required
            min="0"
            step="0.01"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Ürün Ekle
        </button>
      </form>
    </div>
  );
};

export default ProductForm; 