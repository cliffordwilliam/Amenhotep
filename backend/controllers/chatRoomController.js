const {Chat_Room} = require("../models");


module.exports = class ChatRoomController {
    static async get(req,res,next) {
        try {
            // get all
            const allChatRoom = await Chat_Room.findAll();
            res.status(200).json({
                status: 200,
                msg: `Chat rooms successfully retrieved.`,
                chatRooms: allChatRoom
            });
        } catch (error) {
            next(error);
        }
    }
}