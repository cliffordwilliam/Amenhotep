# Project

## Setup

Start npm and grab all the modules I need.

```js
npm init -y
npm i express bcrypt jsonwebtoken dotenv imagekit multer pg sequelize
npm i -D nodemon jest sequelize-cli
```

Create the .gitignore file.

```
node_modules
.env
```

Create the .env file.

```
SECRET_KEY=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Start sequelize.

```
npx sequelize init
```

Edit the sequelize config.json file.

```
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "nameTest",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
```

Create the database both for local and testing.

```
npx sequelize db:create
npx sequelize db:create --env test
```

Create the helper class.

```js
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


class Helper {
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
    static async findById(id, model, message=`Obj with id:${id} is not found.`, status=400) {
        try {
            const obj = await model.findByPk(id);
            if (!obj) throw({name:"CustomError",message,status});
            return obj
        } catch (error) {
            throw error;
        }
    }
    static async findOne(model, where, message=`Obj with this ${where} is not found.`, status=404){
        try {
            const obj = await model.findOne({where});
            if (!obj) throw ({name:"CustomError",message,status});
            return obj;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = Helper
```

Creating the utils.

```js
const multer = require('multer');
const ImageKit = require("imagekit");


const storage = multer.memoryStorage(); // multer's storage


class Util {
  // both are used to upload to imagekit (NEED CREDS)
  // const RESULT = await Util.imagekit.upload({file:IMAGE_BASE_64,fileName:req.file.originalname,tags:[`${req.file.originalname}`]})
  static imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
  static upload = multer({storage});
}


module.exports = Util
```

## Table

General steps on creating a table:

1. Create the model (THE ONES WITH NO FK FIRST)

```
npx sequelize model:create --name Singular --attributes col:datatype,col2:datatype,..
```

2. Edit the migration:
    - constraints (string?)
    - validation (required?)
    - fk

Copy the ones you need and paste it into your migration:

```js
      col: {
        type: Sequelize.STRING,
        references:{model:"Plural",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
        unique: true, // unique
        defaultValue: 'value', // default value
        validate: {
          isEmail:true, // isEmail
          validate: {len:[5,Infinity]}, // char len min 5
          isUrl:true, // isUrl
          min:100 // min number 100
        }
      },
```

3. Edit the model:
    - constraints (string?)
    - validation (required?)
    - association
    - before create

Copy all and remove the ones you do not need:

```js
    col: {
      type:DataTypes.STRING,
      allowNull:false, // required
      unique:true, // unique
      defaultValue:"value", // default value
      validate:{
        isUrl:{message:"wrong imgUrl format"}, // isUrl
        len:{args:[5,Infinity],message:"col min char is 5"}, // char len min 5
        min:{args:[100],message:'col min value is 100.'}, // min number 100
        isEmail:{message:"wrong email format"}, //isEmail
        notNull:{message:"col required"}, // required
        notEmpty:{message:"col required"} // required
      }
    },

    // Association
    static associate(models) {
      Singular.hasMany(models.Singular)
      Singular.belongsTo(models.Singular)
    }

    // before create hash
    Singular.beforeCreate(async (singular) => {
        const HASHED_PASSWORD = await Helper.passwordHasher(singular.password)
        singular.password = HASHED_PASSWORD
    });
```

## Migrate

Migrate both the local and test table.

```
npx sequelize db:migrate
npx sequelize db:migrate --env test
```

## Seed

Create seed

```
npx sequelize seed:create --name seedName
```

Edit the seed (UP and DOWN)

```js
  // UP
  async up (queryInterface, Sequelize) {
    // hash here because UP is not caught by before create
    await queryInterface.bulkInsert('Plural', [
      {
        username: 'username',
        email: 'email@email.com',
        password: await Helper.passwordHasher("password"),
        role: 'role',
        phoneNumber: '+1 123-456-7890',
        address: '1 Love Lane, Anime City',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'username2',
        email: 'email2@email.com',
        password: await Helper.passwordHasher("password2"),
        role: 'role',
        phoneNumber: '+1 123-456-7890',
        address: '1 Love Lane, Anime City',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],{})
  },

  // DOWN
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plural', null, {});
  }
```

Seed the database - testing will seed itself using jest, onready it seeds, onexit it undo all

```
npx sequelize db:seed:all
```

## Middleware

```js
const Helper = require('./helper.js')


class Middleware {
    static handleError(err,req,res){
        console.log(err)
        switch (err.name) {
            case "SequelizeValidationError":
                return res.status(400).json({msg:err.errors[0].message})
            case "SequelizeUniqueConstraintError":
                return res.status(400).json({msg:err.errors[0].message})
            case "JsonWebTokenError":
                return res.status(401).json({msg:err.message})
            case "CustomError":
                return res.status(err.status).json({msg:err.msg})
            default:
                return res.status(500).json({msg:"Internal Server Error."})
        }
    }


    static async tokenGuard(req,res,next){
        try {
            // no token? throw
            if (!req.headers.authorization) Helper.customError("Unauthorized.",401)
            // grab token
            const TOKEN = req.headers.authorization.split(" ")[1]
            // token -> payload
            const PAYLOAD = await Helper.tokenVerifier(TOKEN)
            // payload owner dont exists? throw
            const USER = await Helper.findOne(User,{username:PAYLOAD.username},"Unauthorized.",401)
            // grab user data (excluding password)
            const {id,username,email,profile_picture,bio,credit} = USER
            // add user data to req.loggedInUser
            req.loggedInUser = {id,username,email,profile_picture,bio,credit}
            next()
        } catch (error) {
            next(error)
        }
    }
}


module.exports = Middleware
```

## MVC

Work in this order for ease:
1. Controllers (auth & the others)
2. Routers (home & the others)
3. App
4. www

## Auth controller

```js
const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User, Lodging, Type} = require("../models")


class AuthController {
    // POST STAFF: FOR ADMIN ONLY
    static async postAddUser(req,res,next) {
        try {
             // empty body? throw
            const {username, email, password, phoneNumber, address} = req.body
            if (!username) throw ({name:"CustomError",message:`username required`,status:400})
            if (!email) throw ({name:"CustomError",message:`email required`,status:400})
            if (!password) throw ({name:"CustomError",message:`password required`,status:400})
            if (!phoneNumber) throw ({name:"CustomError",message:`phoneNumber required`,status:400})
            if (!address) throw ({name:"CustomError",message:`address required`,status:400})
            // POST
            const role = "Staff"
            const CREATED_USER = await User.create({username, email, password, phoneNumber, address, role})
            // res status
            const CREATED_USER_NO_PASSWORD = await User.findByPk(CREATED_USER.id,{attributes:{ exclude:['password']},})
            res.status(201).json({
                message: `Success create user`,
                CREATED_USER_NO_PASSWORD
            })
        } catch (error) {
            next(error)
        }
    }
    static async postLogin(req,res,next) {
        // POST: GENERATES TOKEN FOR USERS
        try {
            // empty body?
            const {email, password} = req.body
            if (!email) throw ({name:"CustomError",message:`email required`,status:400})
            if (!password) throw ({name:"CustomError",message:`password required`,status:400})
            const USER = await Helper.findOne(User, {email}) // user exists?
            if (!await Helper.passwordComparer(password, USER.password)) throw ({name:"CustomError",message:`Wrong password`,status:401}) // password correct?
            // payload
            const PAYLOAD = {
                id:USER.id,
                username:USER.username,
                email:USER.email,
                role:USER.role
            }
            // payload -> token
            const TOKEN = await Helper.tokenGenerator(PAYLOAD)
            // res status
            res.status(200).json({message:`Success generate token for ${USER.username}`, TOKEN})
        } catch (error) {
            next(error)
        }
    }
}


module.exports = AuthController
```

## Restarting database shortcut

```
npx sequelize db:migrate:undo:all ^
& npx sequelize db:migrate ^
& npx sequelize db:seed:all ^
nodemon .\bin\www.js
```