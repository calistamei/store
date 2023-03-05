from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5433/MakeupStore'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class ProductsModel(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    categoryid = db.Column(db.ForeignKey("categories.id"))
    productname = db.Column(db.String(50))
    description = db.Column(db.String(200))
    brandid = db.Column(db.Integer)
    price = db.Column(db.Integer)
    imageurl = db.Column(db.String)

class CategoriesModel(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    categoryname = db.Column(db.String(50))

@app.route('/getallproducts')
def getAllProducts():
    products = db.session.execute(db.select(ProductsModel)).scalars()
    results = [
        {
            "id": product.id,
            "categoryId": product.categoryid,
            "productName": product.productname,
            "description": product.description,
            "brandId": product.brandid,
            "price": product.price,
            "imageurl": product.imageurl
        } for product in products]
    return {"products": results}

@app.route('/getallcategories')
def getAllCategories():
    categories = db.session.execute(db.select(CategoriesModel)).scalars()
    results = [
        {
            "id": category.id,
            "categoryName": category.categoryname,
        } for category in categories]
    return {"categories": results}

@app.route('/getproductsincategory/<int:category_id>')
def getAllProductsInCategory(category_id):
    stmt = db.select(ProductsModel).where(ProductsModel.categoryid == category_id)
    products = db.session.execute(stmt).scalars()
    results = [
        {
            "id": product.id,
            "categoryId": product.categoryid,
            "productName": product.productname,
            "description": product.description,
            "brandId": product.brandid,
            "price": product.price,
            "imageurl": product.imageurl
        } for product in products]
    return {"products": results}

# database models

if __name__ == '__main__':
    app.run()