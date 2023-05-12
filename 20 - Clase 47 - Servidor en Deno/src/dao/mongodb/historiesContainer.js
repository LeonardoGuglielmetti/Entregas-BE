import historyModel from "./models/history.model.js";

export default class mongoHistories {

    getHistories = () => {
        return historyModel.find().lean()
    };

    getHistoryBy = (params) => {
        return historyModel.findOne(params).lean()
    };

    createHistory = (history) => {
        return historyModel.create(history)
    };

    updateHistory = (id, history) => {
        return historyModel.findByIdAndUpdate(id, { $set: history })
    };
};