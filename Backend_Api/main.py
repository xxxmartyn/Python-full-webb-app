from flask import *
import json
import sqlite3
from flask_cors import CORS #pip install flask_cors

app = Flask(__name__)
CORS(app)

DATABASE = "mysticalBDatabase.db"
TABLE_PRODUCT = "Product"

@app.route("/viewProduct/")
def viewProduct():
    con = sqlite3.connect(DATABASE)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(f"select * from {TABLE_PRODUCT}")
    rows = cur.fetchall()
    return json.dumps([dict(ix) for ix in rows])

@app.route("/savedetailsProduct/", methods=["POST"])
def saveDetailsProduct():
    msg = "msg"
    try:
        data = request.get_json(force=True)
        print(data)
        name = data["name"]
        price = data["price"]
        piece = data["piece"]
        description = data["description"]
        imgRoute = data["imgRoute"]
        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute(f"INSERT into {TABLE_PRODUCT} (name, price, piece, description, imgRoute) values (?,?,?,?,?)", (name, price, piece, description,imgRoute))
            con.commit()
            msg = "Product sikeresen hozáadva"
    except:
        con.rollback()
        msg = "Nem sikerült a Product tábláhozhozáadni"
    finally:
        return name
        con.close()

@app.route("/deleteProduct/", methods=["POST"])
def deleteProduct():
    data = request.get_json(force=True)
    id = str(data["id"])
    print(id)
    with sqlite3.connect(DATABASE) as con:
        try:
            cur = con.cursor()
            cur.execute(f"delete from {TABLE_PRODUCT} where id = {id}")
            msg = "Elem sikeresen törölve"
        except:
            msg = "Sikertelen törlés kisérlet"

@app.route("/updateProduct/", methods=["POST"])
def updateProduct():
    try:
        data = request.get_json(force=True)
        print(data)
        id = data["id"]
        name = data["name"]
        price = data["price"]
        piece = data["piece"]
        description = data["description"]
        imgRoute = data["imgRoute"]
        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute("UPDATE Product SET name=?, price=?, piece=?, description=?, imgRoute=? WHERE id=?", (name, price, piece, description, imgRoute, id))
            con.commit()
            msg = "Adat sikeresen frisítve"
    except:
        con.rollback()
        msg = "Sikertelen frisítési kisérlet"
    finally:
        return msg
        con.close()

if __name__ == "__main__":
    app.run(debug=True)
