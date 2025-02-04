from conection import conection  # Importa la conexión
from mapeo_colecciones import User, Product, Order, Super_tipos, Tipos, Rating  # Importa tus modelos
from datetime import datetime


# Inserciones de ejemplo
if __name__ == "__main__":
    # Crear un super_tipo
    super_tipo = Super_tipos(
        nombre_super_tipo="Tecnología"
    )
    super_tipo.save()
    # Crear tipos
    tipo_electronica = Tipos(nombre_tipo="Electrónica")
    tipo_electronica.save()
    tipo_computadoras = Tipos(nombre_tipo="Computadoras")
    tipo_electronica.save()


