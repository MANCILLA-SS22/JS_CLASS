import OrderService from '../services/dao/orders.dao.js';

const orderService = new OrderService();

async function getOrders(req, res){
    try {
        const orders = await orderService.getAll();
        res.status(200).json({ message: "Éxito", payload: orders });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
    }
}

async function getOrderById(req, res){
    const { uid } = req.params;
    try {
        const order = await orderService.getById(uid);
        if (!order) {
            return res.status(404).json({ message: " Orden no encontrada" })
        }
        res.status(200).json({ message: "Éxito", payload: order });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener orden por ID", error: error.message });
    }
}

async function saveOrder(req, res){
    const orderData = req.body;
    try {
        const newOrder = await orderService.save(orderData);
        res.status(201).json({ message: "Orden guardada exitosamente", payload: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar la orden", error: error.message });
    }
}

export {getOrders, getOrderById, saveOrder};