import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map(product => (
        <div key={product._id} className="border p-4 rounded-lg shadow">
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList; 