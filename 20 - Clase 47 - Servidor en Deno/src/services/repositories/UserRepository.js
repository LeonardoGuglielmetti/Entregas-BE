
export default class UserRepository {
  
    constructor (dao) {
        this.dao = dao;
    }; 

    get = (params) => {
        return this.dao.get(params);
    };
};