import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../components/Cart/CartItem";
import { PaymentMethodSelect } from "../../components/Cart/PaymentMethodSelect";
import "./Cart.css";

const updateProductStock = async (productId: string, newStock: number) => {
  try {
    const response = await fetch(`http://10.102.10.15:8001/products/${productId}/stock?new_stock=${newStock}`, {
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

const handlePurchase = async (
  items: { id: string; quantity: number; stock: number }[],
  clearCart: () => void,
  setShowPopup: (value: boolean) => void
) => {
  try {
    console.log("🛒 Iniciando compra...");

    // Obtener la caché actual de productos
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
    setTimeout(() => setShowPopup(false), 1500);
  } catch (error) {
    console.error("❌ Error en la compra:", error);
  }
};

export const CartDisplay: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadImagesFromCache = () => {
      const images: { [key: string]: string } = {};

      items.forEach((item) => {
        const cachedImage = localStorage.getItem(`product_image_${item.id}`);
        images[item.id] = cachedImage || "../img/proximamente.png"; // Usa imagen en caché o una por defecto
      });

      setProductImages(images);
    };

    if (items.length > 0) {
      loadImagesFromCache();
    }
  }, [items]); // Se ejecuta cuando cambian los productos en el carrito

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {items.length > 0 ? (
        <div className="cart-items-list">
          {items.map((item) => {
            // Obtener los productos desde `localStorage`
            const cachedProducts = localStorage.getItem("products");
            let productData = null;

            if (cachedProducts) {
              const allProducts = JSON.parse(cachedProducts);
              productData = allProducts.find((p: any) => p.id === item.id);
            }

            // Asignar valores por defecto si no está en caché
            const product = productData || {
              id: item.id,
              name: "Producto desconocido",
              price: 0,
              stock: 0,
              category: [],
              super_tipo: "Desconocido",
            };

            return (
              <div key={item.id} className="cart-item-container">
                <CartItem
                  id={product.id}
                  name={product.name}
                  image={productImages[item.id]}
                  price={product.price}
                  quantity={item.quantity}
                />
              </div>
            );
          })}
          <div className="final">
            <PaymentMethodSelect />
            <div className="cart-total">
              Total: ${total.toFixed(2)}
            </div>
            <div className="buy">
              <button
                onClick={() =>
                  handlePurchase(
                    items.map(({ id, quantity, stock }) => ({ id, quantity, stock })),
                    clearCart,
                    setShowPopup
                  )
                }
                className="checkout-button"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">El carrito está vacío</p>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Compra realizada correctamente</p>
          </div>
        </div>
      )}
    </div>
  );
};
