import ProductForm from "@/components/ProductForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Yeni Ürün Ekle</h1>
        <a 
          href="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ürünleri Görüntüle
        </a>
      </div>
      <ProductForm />
    </div>
  );
}
