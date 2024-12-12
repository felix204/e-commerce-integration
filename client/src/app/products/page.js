import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        <a 
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Ürün Ekle
        </a>
      </div>
      <ProductList />
    </div>
  );
} 