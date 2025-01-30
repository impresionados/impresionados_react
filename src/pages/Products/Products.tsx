import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <p>ID del Producto: {productId}</p>
      {/* Aquí podrías hacer una petición a la API para obtener más detalles */}
    </div>
  );
};

export default ProductDetail;
