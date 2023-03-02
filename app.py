from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
import os
import psycopg2

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] == 'postgresql://postgres:password@localhost/MakeupStore'
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.secret_key = 'secret string'

# db = SQLAlchemy(app)

def get_db_connection():
    conn = psycopg2.connect(
            host="localhost",
            database="MakeupStore",
            user="postgres",
            port=5433,
            password="password")
    return conn

@app.route('/getallproducts')
def getAllProducts():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Products")
    products = cur.fetchall()
    cur.close()
    conn.close()
    allProducts = []
    for product in products:
        results = {"Id": product[0],
         "CategoryId": product[1],
         "ProductName": product[2],
         "Description": product[3],
         "BrandId": product[4],
         "Price": product[5],
         "ImageURL": product[6]}
        allProducts.append(results)
    return jsonify({
            "success": True,
            "products": allProducts,
            "total_products": len(allProducts)
        }
    )

@app.route('/getallcategories')
def getAllCategories():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Categories")
    categories = cur.fetchall()
    cur.close()
    conn.close()
    allCategories = []
    for category in categories:
        results = {"Id": category[0],
         "CategoryName": category[1],}
        allCategories.append(results)
    return jsonify({
            "success": True,
            "categories": allCategories,
            "total_categories": len(allCategories)
        }
    )

@app.route('/getproductsincategory/<int:category_id>')
def getAllProductsInCategory(category_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Products WHERE CategoryId = (%s)", (category_id,))
    products = cur.fetchall()
    cur.close()
    conn.close()
    allProducts = []
    for product in products:
        results = {"Id": product[0],
         "CategoryId": product[1],
         "ProductName": product[2],
         "Description": product[3],
         "BrandId": product[4],
         "Price": product[5],
         "ImageURL": product[6]}
        allProducts.append(results)
    return jsonify({
            "success": True,
            "products": allProducts,
            "total_products": len(allProducts)
        }
    )



# database models


if __name__ == '__main__':
    app.run()