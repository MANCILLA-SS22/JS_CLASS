import {Schema, model, SchemaTypes}  from 'mongoose';

const schema = new Schema({
    name:String,
    role:String,
    email:{
        type: String,
        unique: true
    },
    orders: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'orders'
        }
    ]
});

const usersModel = model('users', schema);
export default usersModel;