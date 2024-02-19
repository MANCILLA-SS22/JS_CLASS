import {Schema, model}  from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    category: String,
    products: []
});

const businessModel = model('businesses', schema);
export default businessModel;