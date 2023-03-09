from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5433/MakeupStore'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

class ProductsModel(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.ForeignKey("categories.id"), nullable=False)
    product_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    brand_id = db.Column(db.ForeignKey("brands.id"), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)

class CategoriesModel(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), nullable=False)
    products = db.relationship('ProductsModel', backref='category', lazy=True)

class BrandsModel(db.Model):
    __tablename__ = "brands"

    id = db.Column(db.Integer, primary_key=True)
    brand_name = db.Column(db.String(50))
    products = db.relationship('ProductsModel', backref='brand', lazy=True)

class ProductsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProductsModel
        include_fk = True

class CategoriesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CategoriesModel
        include_fk = True

class BrandsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BrandsModel
        include_fk = True

@app.route('/getallproducts')
def getAllProducts():
    products = db.session.execute(db.select(ProductsModel)).scalars()
    categories_schema = CategoriesSchema()
    brands_schema = BrandsSchema()
    results = [
        {
            "id": product.id,
            "category_id": product.category_id,
            "category": categories_schema.dump(product.category),
            "product_name": product.product_name,
            "description": product.description,
            "brand_id": product.brand_id,
            "brand": brands_schema.dump(product.brand),
            "price": product.price,
            "image_url": product.image_url
        } for product in products]
    return {"products": results}

@app.route('/getallcategories')
def getAllCategories():
    categories = db.session.execute(db.select(CategoriesModel)).scalars()
    results = [
        {
            "id": category.id,
            "category_name": category.category_name,
        } for category in categories]
    return {"categories": results}

@app.route('/getallbrands')
def getAllBrands():
    brands = db.session.execute(db.select(BrandsModel)).scalars()
    results = [
        {
            "id": brand.id,
            "brand_name": brand.brand_name,
        } for brand in brands]
    return {"brands": results}

@app.route('/getproductsincategory/<int:category_id>')
def getAllProductsInCategory(category_id):
    stmt = db.select(ProductsModel).where(ProductsModel.category_id == category_id)
    products = db.session.execute(stmt).scalars()
    results = [
        {
            "id": product.id,
            "category_id": product.category_id,
            "product_name": product.product_name,
            "description": product.description,
            "brand_id": product.brand_id,
            "price": product.price,
            "image_url": product.image_url
        } for product in products]
    return {"products": results}

# database models

if __name__ == '__main__':
    app.run()