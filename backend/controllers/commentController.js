const Helper = require("../helper");
const {Comment,User,Post} = require("../models");


module.exports = class CommentController {
    static async post(req,res,next) {
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {post_id,content} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(post_id,"Post ID")
            // findById, exists?
            const foundPost = await Helper.findById(post_id,Post,`Post not found. No post with the ID ${post_id} exists.`,404);
            // create
            const addedComment = await Comment.create({user_id,post_id:foundPost.id,content});
            const commentWithUser = await Comment.findOne({where:{id:addedComment.id},include:[{model:User,attributes:{exclude:['password']},},{model:Post,},],});
            // // res status
            res.status(201).json({
                status: 201,
                msg: `Comment successfully created.`,
                // comment: commentWithUser,
                comment: commentWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) { // get all comments for 1 post (post id from params)
        try {
            // grab req params
            let {post_id} = req.params; // comment/post_id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(post_id,"Post ID")
            // findById, exists?
            const foundPost = await Helper.findById(post_id,Post,`Post not found. No post with the ID ${post_id} exists.`,404);
            // find all comments with the post_id
            const allComments = await Comment.findAll({where:{post_id},include:[{model:User,attributes:{exclude:['password']},},{model:Post,},],});
            // // res status
            res.status(200).json({
                status: 200,
                msg: `Comments successfully retrieved.`,
                comments: allComments,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // comment/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Comment ID")
            // findById, exists?
            const foundComment = await Helper.findById(id,Comment,`Comment not found. No comment with the ID ${id} exists.`,404);
            // unpack the body
            let {content} = req.body;
            // patch
            const [count, [patchedComment]] = await Comment.update({content},{where:{id},returning:true});
            const commentWithUser = await Comment.findOne({where:{id:patchedComment.id},include:[{model:User,attributes:{exclude:['password']},},{model:Post,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: "Comment content successfully updated.",
                comment: commentWithUser,
            })
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // comment/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Comment ID")
            // findById, exists?
            const foundComment = await Helper.findById(id,Comment,`Comment not found. No comment with the ID ${id} exists.`,404);
            const commentWithUser = await Comment.findOne({where:{id:foundComment.id},include:[{model:User,attributes:{exclude:['password']},},{model:Post,},],});
            // use body to update the user data
            await Comment.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Comment successfully deleted.`,
                comment: commentWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}