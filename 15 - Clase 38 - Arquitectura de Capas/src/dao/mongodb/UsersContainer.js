import userModel from "../../models/User.model.js";

export default class mongoUsers {

    get = () => {
        return userModel.find()
    }

    getBy = (params) => {
        return userModel.findOne(params);
    }

    save = (user) => {
        return userModel.create(user);
    }
}