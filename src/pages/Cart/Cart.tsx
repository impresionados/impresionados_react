import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../components/Cart/CartItem";
import { PaymentMethodSelect } from "../../components/Cart/PaymentMethodSelect";
import "./Cart.css";

// Función para actualizar el stock de un producto en la API
const updateProductStock = async (productId: string, newStock: number) => {
  try {
    const response = await fetch(`http://192.168.68.127:8001/products/${productId}/stock?new_stock=${newStock}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al actualizar el producto: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("✅ Producto actualizado en la API:", data);
    return data;
  } catch (error) {
    console.error("❌ Error en la actualización del stock:", error);
  }
};

// Función para procesar la compra y actualizar el stock
const handlePurchase = async (
  items: { id: string; quantity: number; stock: number }[],
  clearCart: () => void,
  setShowPopup: (value: boolean) => void
) => {
  try {
    console.log("🛒 Iniciando compra...");

    // Obtener productos desde el caché
    const cachedProducts = localStorage.getItem("products");
    let productList = cachedProducts ? JSON.parse(cachedProducts) : [];

    for (const item of items) {
      console.log(`🔄 Producto: ${item.id}, Cantidad comprada: ${item.quantity}, Stock actual: ${item.stock}`);

      const newStock = Math.max(0, item.stock - item.quantity);

      // Actualizar stock en `localStorage`
      productList = productList.map((p: any) =>
        p.id === item.id ? { ...p, stock: newStock } : p
      );

      // Actualizar stock en la API
      await updateProductStock(item.id, newStock);
    }

    // Guardar la lista de productos actualizada en `localStorage`
    localStorage.setItem("products", JSON.stringify(productList));
    console.log("✅ Caché actualizada correctamente.");

    console.log("🎉 Compra completada.");
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // ⏳ Aumentado a 3 segundos
  } catch (error) {
    console.error("❌ Error en la compra:", error);
  }
};

// Componente del carrito de compras
export const CartDisplay: React.FC = () => {
  const { items = [], total = 0, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadImagesFromCache = () => {
      const images: { [key: string]: string } = {};

      items.forEach((item) => {
        const cachedImage = localStorage.getItem(`product_image_${item.id}`);
        images[item.id] = cachedImage || "../img/proximamente.png";
      });

      setProductImages(images);
    };

    if (items.length > 0) {
      loadImagesFromCache();
    }
  }, [items]);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {items.length > 0 ? (
        <div className="cart-items-list">
          {items.map((item) => (
            <CartItem key={item.id} {...item} image={productImages[item.id]} />
          ))}
          <div className="final">
            <PaymentMethodSelect />
            <div className="cart-total">
              Total: €{total.toFixed(2)} {/* Cambio de $ a € */}
            </div>
            <button onClick={() => handlePurchase(items, clearCart, setShowPopup)} className="checkout-button">
              Comprar
            </button>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">El carrito está vacío</p>
      )}

      {/* Popup de compra realizada */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>✅ Compra realizada correctamente</p>
          </div>
        </div>
      )}
    </div>
  );
};
