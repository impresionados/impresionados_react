import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../components/Cart/CartItem";
import { PaymentMethodSelect } from "../../components/Cart/PaymentMethodSelect";

import "./Cart.css";

const handlePurchase = async (
  items: { id: string; quantity: number; stock: number }[],
  clearCart: () => void,
  setShowPopup: (value: boolean) => void
) => {
  try {
    console.log("Compra completada. Stock actualizado (simulado).");

    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  } catch (error) {
    console.error("Error en la compra:", error);
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
            // Intentar obtener el producto desde `localStorage`
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
