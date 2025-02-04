import mongoengine


class User(mongoengine.Document):
    meta = {'collection': 'users'}  # To specify the collection being mapped

    # id = mongoengine.IntField(required=True)
    user_name = mongoengine.StringField(required=True)
    email = mongoengine.StringField(required=True)
    password = mongoengine.StringField(required=True)
    registration_date = mongoengine.DateTimeField(required=True)


class Rating(mongoengine.EmbeddedDocument):  # To specify that it is inside another class
    userid = mongoengine.StringField(required=True)
    rating = mongoengine.IntField(required=True)
    comment = mongoengine.StringField()
    date = mongoengine.DateTimeField(required=True)


class Super_tipos(mongoengine.Document):
    # id = mongoengine.IntField(required=True)
    meta = {'collection': 'super_tipos'}
    nombre_super_tipo=mongoengine.StringField(required=True)


class Tipos(mongoengine.Document):
    #id = mongoengine.IntField(required=True)
    meta = {'collection': 'tipos'}
    nombre_tipo = mongoengine.StringField(required=True)


class Product(mongoengine.Document):
    meta = {'collection': 'products'}


    name = mongoengine.StringField(required=True)
    description = mongoengine.StringField()
    price = mongoengine.FloatField(required=True)
    stock = mongoengine.IntField(required=True)
    category = mongoengine.ListField(mongoengine.ReferenceField(Tipos))  # Si Tipos es un Document
    image = mongoengine.FileField()
    super_tipo= mongoengine.ReferenceField(Super_tipos)
    ratings = mongoengine.ListField(mongoengine.EmbeddedDocumentField(Rating))  # It will be a list of Rating objects


class Order(mongoengine.Document):
    meta = {'collection': 'orders'}

    # id = mongoengine.IntField(required=True)
    productid = mongoengine.StringField(required=True)
    userid = mongoengine.StringField(required=True)
    date = mongoengine.DateTimeField(required=True)
    total = mongoengine.FloatField(required=True)
    status = mongoengine.StringField(required=True)