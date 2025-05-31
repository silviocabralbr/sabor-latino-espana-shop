
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Star, Heart, Filter } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  origin: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Café Colombiano Premium",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
    category: "Bebidas",
    rating: 4.8,
    origin: "Colombia",
    description: "Café 100% arábica de las montañas colombianas"
  },
  {
    id: 2,
    name: "Arepa Venezolana Mix",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1605398889175-d46b4f73a857?w=400&h=300&fit=crop",
    category: "Harinas",
    rating: 4.6,
    origin: "Venezuela",
    description: "Mezcla perfecta para arepas auténticas"
  },
  {
    id: 3,
    name: "Dulce de Leche Argentino",
    price: 7.25,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Dulces",
    rating: 4.9,
    origin: "Argentina",
    description: "Cremoso dulce de leche artesanal"
  },
  {
    id: 4,
    name: "Empanadas Congeladas",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e4?w=400&h=300&fit=crop",
    category: "Congelados",
    rating: 4.7,
    origin: "Argentina",
    description: "Pack de 12 empanadas variadas listas para hornear"
  },
  {
    id: 5,
    name: "Salsa Picante Mexicana",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1599909499914-c7ad54779328?w=400&h=300&fit=crop",
    category: "Salsas",
    rating: 4.5,
    origin: "México",
    description: "Salsa artesanal con chiles jalapeños"
  },
  {
    id: 6,
    name: "Quinoa Boliviana Orgánica",
    price: 9.75,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    category: "Granos",
    rating: 4.8,
    origin: "Bolivia",
    description: "Quinoa orgánica certificada del altiplano"
  },
  {
    id: 7,
    name: "Chocolate Peruano 70%",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop",
    category: "Dulces",
    rating: 4.9,
    origin: "Perú",
    description: "Chocolate negro premium con cacao peruano"
  },
  {
    id: 8,
    name: "Mate Argentino Set Completo",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    category: "Bebidas",
    rating: 4.7,
    origin: "Argentina",
    description: "Set completo: mate, bombilla y yerba mate"
  }
];

const categories = ["Todos", "Bebidas", "Dulces", "Harinas", "Congelados", "Salsas", "Granos"];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} añadido al carrito`);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Latino Market
                </h1>
                <p className="text-xs text-gray-600">Sabores auténticos de Latinoamérica</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="relative hover:bg-orange-50 border-orange-200"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrito
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Total: €{totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            Sabores Auténticos
          </h2>
          <p className="text-xl text-gray-700 mb-8 animate-fade-in">
            Los mejores productos latinos directamente a tu mesa en España
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">🇨🇴 Colombia</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">🇲🇽 México</Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">🇦🇷 Argentina</Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800">🇻🇪 Venezuela</Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">🇵🇪 Perú</Badge>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar productos latinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" 
                      : "hover:bg-orange-50 border-orange-200"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
                    {product.origin}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">€{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No encontramos productos</h3>
            <p className="text-gray-600">Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-800 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Latino Market</h3>
              <p className="text-orange-100">
                Llevamos los auténticos sabores de Latinoamérica directamente a tu hogar en España.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-orange-100">
                <p>📞 +34 900 123 456</p>
                <p>📧 info@latinomarket.es</p>
                <p>📍 Madrid, España</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Envíos</h4>
              <div className="space-y-2 text-orange-100">
                <p>🚚 Envío gratis desde €50</p>
                <p>⚡ Entrega en 24-48h</p>
                <p>📦 Productos frescos garantizados</p>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-700 mt-8 pt-8 text-center text-orange-200">
            <p>&copy; 2024 Latino Market. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
