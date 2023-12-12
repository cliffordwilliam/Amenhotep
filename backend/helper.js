const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


module.exports = class Helper {
    // custom error thrower
    static customError(msg, status) {
        throw ({name:"CustomError",msg,status});
    }
    // password hasher & comparer
    static async hashPassword(value) {
        try {
            return await bcrypt.hash(value, 10);
        } catch (error) {
            throw error;
        }
    }
    static async comparePassword(receivedTypedPassword, databaseHashedPassword) {
        try {
            return await bcrypt.compare(receivedTypedPassword, databaseHashedPassword);
        } catch (error) {
            throw error;
        }
    }
    // token <-> payload
    static payloadToToken(payload){
        // need secret key
        return jwt.sign(payload,process.env.SECRET_KEY);
    }
    static tokenToPayload(token){
        // need secret key
        return jwt.verify(token,process.env.SECRET_KEY);
    }
    // finders
    static async findById(id, model, msg=`Obj with id:${id} is not found.`, status=400) {
        try {
            const obj = await model.findByPk(id);
            if (!obj) throw({name:"CustomError",msg,status});
            return obj
        } catch (error) {
            throw error;
        }
    }
    static async findOne(model, where, msg=`Obj with this ${where} is not found.`, status=404){
        try {
            const obj = await model.findOne({where});
            if (!obj) throw ({name:"CustomError",msg,status});
            return obj;
        } catch (error) {
            throw error;
        }
    }
    // sanitize user
    static sanitizeUser(user){
        // unpack user
        const {id,username,email,profile_picture,bio,credit} = user;
        // repack to send (do not include password)
        return {id,username,email,profile_picture,bio,credit};
    }
    // body input checker
    static checkInt(input,name){
        const value = parseInt(input, 10);
        if (isNaN(value) || value !== parseFloat(input)) Helper.customError(`${name} must be an integer.`,400);
    }
    static checkStr(input,name){
        const value = parseInt(input, 10);
        if (!isNaN(value)) Helper.customError(`${name} must be string.`,400);
    }
}
