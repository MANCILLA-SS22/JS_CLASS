import businessModel from "../models/business.model.js";

class BusinessService {
    async getAll (){
        let businesses = await businessModel.find();
        return businesses.map(business => business.toObject());
    }

    async save(business){
        let result = await businessModel.create(business);
        return result;
    }

    async getById(id){
        const result = await businessModel.findOne({ _id: id });
        return result;
    }

    async getBusinessesByCategory(category){
        const result = await businessModel.find({ category: category });
        return result;
    }
};

export default BusinessService;