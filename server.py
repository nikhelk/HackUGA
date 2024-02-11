from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json
app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend and backend are served from different origins

from datetime import datetime

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('sales.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE IF NOT EXISTS sales_records
             (id INTEGER PRIMARY KEY,
              requested TEXT,
              item TEXT,
              cost REAL,
              customer_id INTEGER)''')

# Insert default values
default_values = [
    (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'Laptop', 1200.00, 1),
    (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'Smartphone', 800.00, 2),
    (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'Headphones', 150.00, 3)
]

c.executemany('INSERT INTO sales_records (requested, item, cost, customer_id) VALUES (?, ?, ?, ?)', default_values)

# Commit the changes and close the connection
conn.commit()

print("Database created and default values inserted.")

@app.route('/api/feed', methods=['GET'])
def display_feed():
    print("Retriving Feed")
    conn = sqlite3.connect('sales.db')
    c = conn.cursor()
    # Connect to the SQLite database
    
    # Select all rows from the orders table
    c.execute('SELECT * FROM sales_records')
    
    # Dynamically get column names from the cursor description
    columns = [description[0] for description in c.description]
    
    # Fetch all rows from the query
    rows = c.fetchall()
    
    # Convert the row data to JSON format
    json_data = [dict(zip(columns, row)) for row in rows]
    
    # Convert to JSON string (if needed for printing or sending as a response)
    json_string = json.dumps(json_data, indent=4)
    
    # Close the connection when done
    conn.close()
    # Your existing Python logic to fetch and prepare the feed data
    return json_string

@app.route('/api/make_request', methods=['POST'])
def make_request():
    print("making request")
    data = request.json
    requested_item = data.get('requested_item')
    requested_price = data.get('requested_price')
    customer_id = data.get('customer_id')  # Assuming this is passed in the body, or you can hardcode it

    # Connect to the SQLite database
    conn = sqlite3.connect('sales.db')
    c = conn.cursor()

    # Prepare the input values
    input_value = (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), requested_item, requested_price, customer_id)
    
    # Insert a new row into the sales_records table
    c.execute('INSERT INTO sales_records (requested, item, cost, customer_id) VALUES (?, ?, ?, ?)', input_value)
    
    # Commit the changes and close the connection
    conn.commit()
    conn.close()

        # Get the ID of the last inserted row
    new_id = c.lastrowid
    # Return the new ID to the caller
    return jsonify({'new_id': new_id})

@app.route('/api/fill_order',methods=['POST'])
def fill_order():
    print("deleting ")
    data = request.json
    id = data.get('param1')
    
    conn = sqlite3.connect('sales.db')
    c = conn.cursor()
    print(id)
    # Connect to the SQLite database

    # Select all rows from the orders table
    c.execute('DELETE FROM sales_records WHERE id = (?)', (id,))
    c.execute('SELECT * FROM sales_records WHERE id = (?)', (id,))
    rows = c.fetchall()
    print((rows))
    rows = c.fetchall()
    conn.commit()
    conn.close()
    
    return jsonify({'status': len(rows)})
    
@app.route('/api/get_updated_status', methods=['POST'])
def get_updated_status():
    print("bruh")
    data = request.json
    requested_item = data.get('id')
    
    conn = sqlite3.connect('sales.db')
    c = conn.cursor()
    id = request.args.get('id')
    print(id)
    string_id = str(id)
    # Connect to the SQLite database

    # Select all rows from the orders table
    c.execute('SELECT * FROM sales_records WHERE id = (?)', (requested_item,))
    rows = c.fetchall()
    print((rows))
    conn.close()
    return jsonify({'status': len(rows)})
if __name__ == '__main__':
    app.run(host="172.21.82.182", port=5000, debug=True)
