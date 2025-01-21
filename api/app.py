from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient('mongodb+srv://impresionados:656UJjLTTcrEQNuQ@prueba.2hwb4.mongodb.net/?retryWrites=true&w=majority&appName=prueba')
db = client.prueba

@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(db.productos.find())
    for product in products:
        product['_id'] = str(product['_id'])
        if 'image' in product:
            product['image'] = str(product['image'])
    return jsonify(products)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = list(db.categorias.find())
    for category in categories:
        category['_id'] = str(category['_id'])
    return jsonify(categories)

@app.route('/api/products/<id>', methods=['GET'])
def get_product(id):
    product = db.productos.find_one({'_id': ObjectId(id)})
    if product:
        product['_id'] = str(product['_id'])
        if 'image' in product:
            product['image'] = str(product['image'])
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    user = db.usuarios.find_one({
        'email': data.get('email'),
        'password': data.get('password')
    })
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user)
    return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)