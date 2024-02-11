from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/ayushbaweja/Development/sales.db'  # Update with your database URI
db = SQLAlchemy(app)

class sales_records(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requested = db.Column(db.Boolean)
    item = db.Column(db.String(80))
    cost = db.Column(db.Float)
    customer_id = db.Column(db.Integer)

@app.route('/request', methods=['POST'])
def add_request():
    data = request.get_json()
    new_request = sales_records(requested=data['requested'], item=data['item'], cost=data['cost'], customer_id=data['customerid'])
    db.session.add(new_request)
    db.session.commit()
    return {'id': new_request.id}, 201

@app.route('/request/<int:request_id>', methods=['PUT'])
def update_request(request_id):
    data = request.get_json()
    request_to_update = sales_records.query.get_or_404(request_id)
    if 'requested' in data:
        request_to_update.requested = data['requested']
    if 'item' in data:
        request_to_update.item = data['item']
    if 'cost' in data:
        request_to_update.cost = data['cost']
    if 'customerid' in data:
        request_to_update.customerid = data['customer_id']
    db.session.commit()
    return {'message': 'Request updated'}

@app.route('/request/<int:request_id>', methods=['DELETE'])
def delete_request(request_id):
    request_to_delete = sales_records.query.get_or_404(request_id)
    db.session.delete(request_to_delete)
    db.session.commit()
    return {'message': 'Request deleted'}

if __name__ == '__main__':
    app.run(debug=True)