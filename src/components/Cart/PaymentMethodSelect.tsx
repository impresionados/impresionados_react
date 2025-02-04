import "./PaymentMethodSelect.css"; // Importa el archivo CSS

export const PaymentMethodSelect = () => {

  

  return (
    <div className="payment-container">
      <label htmlFor="payment-method" className="payment-label">
        Método de pago:
      </label>
      <select
        id="payment-method"
        className="payment-select"
      >
        <option value="tarjeta">Tarjeta de crédito/débito</option>
        <option value="paypal">PayPal</option>
      </select>

    </div>
  );
};

