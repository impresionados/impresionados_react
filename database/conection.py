import mongoengine
# from dotenv import load_dotenv
import os
import dotenv

# Cargar las variables del archivo .env
load_dotenv()
def conection():
    """
    Establece una conexión con la base de datos MongoDB usando mongoengine.

    Returns:
        mongoengine.connection.MongoClient: El cliente de la base de datos si es exitoso.
        None: Si no se pudo establecer la conexión.
    """
    try:
        # Establece la conexión
        conection = mongoengine.connect(
            db="impresionados_app",
            host=f"mongodb+srv://impresionados:{os.getenv('DATABASE_PASSWORD')}@clusterimpresionados.jukxo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterImpresionados"
        )
        print("Conexión establecida con la base de datos.")
        return conection
    except Exception as e:
        print("Error al conectar con la base de datos:", str(e))
        return None
conection()