import ordersModel from "../models/orders.model.js";

export default class OrderService {

    async getAll(){
        let orders = await ordersModel.find();
        return orders.map(order => order.toObject());
    }
    async save(order){
        let result = await ordersModel.create(order);
        return result;
    }

    async getById(id){
        const result = await ordersModel.findOne({ _id: id });
        return result;
    }
};