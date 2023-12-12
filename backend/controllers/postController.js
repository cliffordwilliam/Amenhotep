const Helper = require("../helper");
const {Post,User} = require("../models");


module.exports = class PostController {
    static async post(req,res,next) {
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {content} = req.body;
            // create
            console.log(user_id, content);
            const addedPost = await Post.create({user_id,content});
            const postWithUser = await Post.findOne({where:{id:addedPost.id},include:[{model:User,attributes:{exclude:['password']},},],});
            // res status
            res.status(201).json({
                status: 201,
                msg: `Post successfully created.`,
                post: postWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) {
        try {
            // find all posts
            const allPosts = await Post.findAll({include:[{model:User,attributes:{exclude:['password']},},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Posts successfully retrieved.`,
                posts: allPosts,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getId(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // post/id
            // not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Post ID")
            // findById, exists?
            const foundPost = await Helper.findById(id,Post,`Post not found. No post with the ID ${id} exists.`,404);
            const postWithUser = await Post.findOne({where:{id:foundPost.id},include:[{model:User,attributes:{exclude:['password']},},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Post successfully retrieved.`,
                post: postWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // post/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Post ID")
            // findById, exists?
            const foundPost = await Helper.findById(id,Post,`Post not found. No post with the ID ${id} exists.`,404);
            // unpack the body
            let {content} = req.body;
            if (!content) Helper.customError("Content is required.",400) // weird sequelize auto err
            // // patch
            const [count, [patchedPost]] = await Post.update({content},{where:{id},returning:true,});
            const postWithUser = await Post.findOne({where:{id:foundPost.id},include:[{model:User,attributes:{exclude:['password']},},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: "Post content successfully updated.",
                post: postWithUser,
            })
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // post/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"Post ID")
            // findById, exists?
            const foundPost = await Helper.findById(id,Post,`Post not found. No post with the ID ${id} exists.`,404);
            const postWithUser = await Post.findOne({where:{id:foundPost.id},include:[{model:User,attributes:{exclude:['password']},},],});
            // use body to update the user data
            await Post.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Post successfully deleted.`,
                post: postWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}