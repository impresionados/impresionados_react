// src/components/Cart/CartDisplay.tsx
import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import CartItem from "../../components/Cart/CartItem";
import './Cart.css';

const updateProductStock = async (productId: string, newStock: number) => {
  try {
    const response = await fetch(`http://localhost:8001/products/${productId}/stock?new_stock=${newStock}`, { // ✅ Ahora enviamos new_stock en la URL
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
    console.log("Producto actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error en la actualización:", error);
  }
};




const handlePurchase = async (items: { id: string; quantity: number; stock: number }[], clearCart: () => void, setShowPopup: (value: boolean) => void) => {
  try {
    for (const item of items) {
      console.log(`ID: ${item.id}, Cantidad: ${item.quantity}, Stock: ${item.stock}`);
      const newStock = Math.max(0, item.stock - item.quantity);

      await updateProductStock(item.id, newStock);
    }

    console.log("Compra completada. Stock actualizado.");
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500); // Cierra el popup después de 3 segundos
  } catch (error) {
    console.error("Error en la compra:", error);
  }
};

export const CartDisplay: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {items.length > 0 ? (
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-container">
              <CartItem 
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
              />
            </div>
          ))}
          <div className="final">
            <div className="cart-total">
              Total: ${total.toFixed(2)}
            </div>
            <div className="buy">
              <button onClick={() => handlePurchase(items.map(({ id, quantity, stock }) => ({ id, quantity, stock })), clearCart, setShowPopup)} className="checkout-button">Comprar</button>
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