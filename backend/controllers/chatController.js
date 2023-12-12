const Helper = require("../helper");
const {Chat,User,Chat_Room} = require("../models");


module.exports = class ChatController {
    // helper to check chat_room_id (int? also clamp)
    static checkChatRoomId(chat_room_id){
        // age not int? throw (24.5? throw) - sequelize auto validation is weird
        Helper.checkInt(chat_room_id,"Chat room ID")
        // number of rooms are fixed, 3 rooms
        chat_room_id = Math.min(Math.max(chat_room_id, 1), 3);
        // return
        return chat_room_id
    }
    static async post(req,res,next) { // front end determine the chat_room_id. 1 view = 1 room = 1 id
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {chat_room_id,message} = req.body;
            // check int and clamp
            chat_room_id = ChatController.checkChatRoomId(chat_room_id)
            // create
            const addedChat = await Chat.create({user_id,chat_room_id,message});
            const chatWithUser = await Chat.findOne({where:{id:addedChat.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Chat_Room,},],});
            // res status
            res.status(201).json({
                status: 201,
                msg: `Chat successfully created.`,
                chat: chatWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) {
        try {
            // grab req params
            let {chat_room_id} = req.params; // chat/chat_room_id
            // check int and clamp
            chat_room_id = ChatController.checkChatRoomId(chat_room_id)
            // findById, exists?
            const foundChatRoom = await Helper.findById(chat_room_id,Chat_Room,`Chat room not found. No chat room with the ID ${chat_room_id} exists.`,404);
            // find all chat with the chat_room_id
            const allChats = await Chat.findAll({where:{chat_room_id},include:[{ model:User,attributes:{exclude:['password']},},{model: Chat_Room,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Chats successfully retrieved.`,
                chats: allChats,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // chat/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Chat ID")
            // findById, exists?
            const foundChat = await Helper.findById(id,Chat,`Chat not found. No chat with the ID ${id} exists.`,404);
            // patch
            const [count, [patchedChat]] = await Chat.update({status:"Read"},{where:{id},returning:true});
            const chatWithUser = await Chat.findOne({where:{id:patchedChat.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Chat_Room,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: "Chat status successfully updated to Read.",
                chat: chatWithUser,
            })
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // chat/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Chat ID")
            // findById, exists?
            const foundChat = await Helper.findById(id,Chat,`Chat not found. No chat with the ID ${id} exists.`,404);
            // use body to update the user data
            await Chat.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Chat successfully deleted.`,
                chat: foundChat,
            });
        } catch (error) {
            next(error);
        }
    }
}