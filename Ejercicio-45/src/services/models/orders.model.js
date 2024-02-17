import {Schema, model, SchemaTypes}  from 'mongoose';

const schema = new Schema({
    number: Number,
    business: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'businesses'
        }
    ],
    user: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'users'
        }
    ],
    products: [],
    totalPrice: Number
});

const ordersModel = model('orders', schema);

export default ordersModel;