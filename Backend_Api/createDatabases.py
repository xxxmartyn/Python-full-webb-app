
import sqlite3

con = sqlite3.connect("mysticalBDatabase.db")
print("Adatbázis sikeresen megnyitva!")

con.execute(
    "create table Product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INTEGER NOT NULL, piece INTEGER NOT NULL, description TEXT NOT NULL, imgRoute TEXT NOT NULL)")

print("'Product' tábla sikeresen létrehozva!")

con.close()