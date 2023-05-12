import userModel from "./models/User.model.js";

export default class mongoUsers {

    get = (params) => {
        return userModel.find(params).lean();
    };

    getBy = (params) => {
        return userModel.findOne(params).lean();
    };

    save = (user) => {
        return userModel.create(user);
    };

    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, { $set: user })
    };

    drop = () => {
        return userModel.collection.drop();
    };
}