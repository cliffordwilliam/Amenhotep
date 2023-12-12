const request = require("supertest");
const app = require("../app");
const {sequelize} = require('../models');
const Helper = require("../helper");

// for img from disk -> to req body
const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, "./Dorothy_Haze.webp");
const imageBuffer = fs.readFileSync(filePath);

// some tests need token
let token


beforeAll(async ()=>{
    const users = [
      {
        username: 'Dorothy Haze',
        password: await Helper.hashPassword("Dorothy"),
        email: 'Dorothy@gmail.com',
        profile_picture:"https://picsum.photos/200",
        bio:"Dorothy appears to have a bubbly...",
        credit:0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Alma Armas',
        password: await Helper.hashPassword("Alma"),
        email: 'Alma@gmail.com',
        profile_picture:"https://picsum.photos/200",
        bio:"Alma...",
        credit:0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    const {id,username,email,profile_picture,bio,credit} = users[0]
    const payload = {id,username,email,profile_picture,bio,credit}
    token = await Helper.payloadToToken(payload)
    await sequelize.queryInterface.bulkInsert('Users',users,{})

    // seed drinks
    await sequelize.queryInterface.bulkInsert('Drinks', [
        {
          name:'Bad Touch',
          description:"We're nothing but mammals after all.",
          price:250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Beer',
          description:"Traditionally brewed beer has become a luxury, but this one's pretty close to the real deal...",
          price:200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Bleeding Jane',
          description:"Say the name of this drink three times in front of a mirror and you'll look like a fool.",
          price:200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Bloom Light',
          description:"It's so unnecessarily brown....",
          price:230,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Blue Fairy',
          description:"One of these will make all your teeth turn blue. Hope you brushed them well.",
          price:170,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Brandtini',
          description:"8 out of 10 smug assholes would recommend it but they're too busy being smug assholes.",
          price:250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Cobalt Velvet',
          description:"It's like champaigne served on a cup that had a bit of cola left.",
          price:280,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Fringe Weaver',
          description:"It's like drinking ethylic alcohol with a spoonful of sugar.",
          price:260,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Frothy Water',
          description:"PG-rated shows' favorite Beer ersatz since 2040.",
          price:150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Grizzly Temple',
          description:"This one's kinda unbearable. It's mostly for fans of the movie it was used on.",
          price:220,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Gut Punch',
          description:"It's supposed to mean 'a punch made of innards', but the name actually described what you feel while drinking it.",
          price:80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Marsblast',
          description:"One of these is enough to leave your face red like the actual planet.",
          price:170,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Mercuryblast',
          description:"No thermometer was harmed in the creation of this drink.",
          price:250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Moonblast',
          description:"No relation to the Hadron cannon you can see on the moon for one week every month.",
          price:180,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Piano Man',
          description:"This drink does not represent the opinions of the Bar Pianists Union or its associates.",
          price:320,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Pile Driver',
          description:"It doesn't burn as hard on the tongue but you better not have a sore throat when drinking it...",
          price:160,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Sparkle Star',
          description:"They used to actually sparkle, but too many complaints about skin problem made them redesign the drink without sparkling.",
          price:150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Sugar Rush',
          description:"Sweet, light and fruity. As girly as it gets.",
          price:150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Sunshine Cloud',
          description:"Tastes like old chocolate milk with its good smell intact. Some say it tastes like caramel too...",
          price:150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Suplex',
          description:"A small twist on the Piledriver, putting more emphasis on the tongue burning and less on the throat burning.",
          price:160,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Zen Star',
          description:"You'd think something so balanced would actually taste nice... you'd be dead wrong.",
          price:210,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {})

      // seed game
      await sequelize.queryInterface.bulkInsert('Games', [
        {
          name:"Galactic Dash",
          description:"Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});

      // seed room
      await sequelize.queryInterface.bulkInsert('Chat_Rooms', [
        {
          name:"Velvet Room",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Tartarus Lounge",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Duodecim Pub",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
})

afterAll(async ()=>{
    await sequelize.queryInterface.bulkDelete('Users', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Drinks', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Games', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Chat_Rooms', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Profiles', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Chats', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Posts', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Comments', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('User_Games', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Gifts', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('User_Drinks', null,{truncate:true,cascade:true,restartIdentity:true})
})


describe("User", ()=>{
    describe("DELETE User - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User successfully deleted.", ()=>{
                it("return status, msg and user", async ()=>{
                    const response = await request(app).del("/user").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User successfully deleted.")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and user", async ()=>{
                    const response = await request(app).del("/user")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("POST Register - No bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - User successfully registered.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return status, msg and user", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "User successfully registered.")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Username is required.", ()=>{
                const body = {
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username is required.", "status": 400})
                })
            })
            describe("400 Bad Request Username cannot be empty.", ()=>{
                const body = {
                    "username": "",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username cannot be empty.", "status": 400})
                })
            })
            describe("400 Bad Request Username is already in use!", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username is already in use!", "status": 400})
                })
            })
            describe("400 Bad Request Username must be between 3 and 255 characters.", ()=>{
                const body = {
                    "username": "D",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username must be between 3 and 255 characters.", "status": 400})
                })
            })
            describe("400 Bad Request Email is required.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Email is required.", "status": 400})
                })
            })
            describe("400 Bad Request Please provide a valid email address.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Please provide a valid email address.", "status": 400})
                })
            })
            describe("400 Bad Request Email address is already in use!", ()=>{
                const body = {
                    "username": "Dorothy Hazee",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Email address is already in use!", "status": 400})
                })
            })
            describe("400 Bad Request Password is required.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Dorothy@gmail.com",
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Password is required.", "status": 400})
                })
            })
            describe("400 Bad Request Password cannot be empty.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Dorothy@gmail.com",
                    "password": ""
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Password cannot be empty.", "status": 400})
                })
            })
            describe("400 Bad Request Password must be between 3 and 255 characters.", ()=>{
                const body = {
                    "username": "Dorothy Hazee",
                    "email": "Dorothy@gmail.com",
                    "password": "D"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Password must be between 3 and 255 characters.", "status": 400})
                })
            })
        })
    })
    
    describe("POST Login - No bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User successfully logged in.", ()=>{
                const body = {
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return status, msg, token and user", async ()=>{
                    const response = await request(app).post("/user/login").send(body)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User successfully logged in.")
                    expect(response.body).toHaveProperty("token")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Email is required.", ()=>{
                const body = {
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/login").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Email is required.", "status": 400})
                })
            })
            describe("400 Bad Request Password is required.", ()=>{
                const body = {
                    "email": "Dorothy@gmail.com",
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/login").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Password is required.", "status": 400})
                })
            })
            describe("401 Unauthorized User not found. Please check your email or register.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Doorothy@gmail.com",
                    "password": "Dorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/login").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User not found. Please check your email or register.", "status": 401})
                })
            })
            describe("401 Unauthorized Wrong password. Please try again.", ()=>{
                const body = {
                    "username": "D",
                    "email": "Dorothy@gmail.com",
                    "password": "Doorothy"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/user/login").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Wrong password. Please try again.", "status": 401})
                })
            })
        })
    })
    
    describe("GET User - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Received gifts successfully retrieved.", ()=>{
                it("return status, msg and user", async ()=>{
                    const response = await request(app).get("/user?username=Dor&limit=10&page=1&sort=asc&sortField=id").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Users successfully retrieved.")
                    expect(response.body).toHaveProperty("users") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Invalid sort. Please use 'asc' or 'desc'.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user?username=Dor&limit=10&page=1&sort=ascc&sortField=id").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Invalid sort. Please use 'asc' or 'desc'.", "status": 400})
                })
            })
            describe("400 Bad Request Invalid sortField. Please use 'username', 'email', 'credit', or 'id'.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user?username=Dor&limit=10&page=1&sort=asc&sortField=idd").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Invalid sortField. Please use 'username', 'email', 'credit', or 'id'.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user?username=Dor&limit=10&page=1&sort=asc&sortField=id")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("GET User Id - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User successfully retrieved.", ()=>{
                it("return status, msg and user", async ()=>{
                    const response = await request(app).get("/user/2").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User successfully retrieved.")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User ID must be an integer.", "status": 400})
                })
            })
            describe("404 Not Found User not found. No user with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User not found. No user with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/user/2")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PUT User - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User successfully updated.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "password": "Dorothy",
                    "bio": "Dorothy appears to have a bubbly...",
                    "credit": 0,
                    }
                it("return status, msg and user", async ()=>{
                    const response = await request(app).put("/user").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User successfully updated.")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Username cannot be empty.", ()=>{
                const body = {
                    "username": "",
                    "password": "Dorothy",
                    "bio": "Dorothy appears to have a bubbly...",
                    "credit": 0,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/user").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username cannot be empty.", "status": 400})
                })
            })
            describe("400 Bad Request Username must be between 3 and 255 characters.", ()=>{
                const body = {
                    "username": "D",
                    "password": "Dorothy",
                    "bio": "Dorothy appears to have a bubbly...",
                    "credit": 0,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/user").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Username must be between 3 and 255 characters.", "status": 400})
                })
            })
            describe("400 Bad Request Password must be between 3 and 255 characters.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "password": "D",
                    "bio": "Dorothy appears to have a bubbly...",
                    "credit": 0,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/user").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Password must be between 3 and 255 characters.", "status": 400})
                })
            })
            describe("400 Bad Request Bio must be between 3 and 255 characters.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "email": "Dorothy@gmail.com",
                    "password": "Dorothy",
                    "bio": "D",
                    "credit": 0,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/user").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Bio must be between 3 and 255 characters.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "username": "Dorothy Haze",
                    "password": "Dorothy",
                    "bio": "D",
                    "credit": 0,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/user").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH User Profile Picture - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User Profile Picture Successfully Updated.", ()=>{
                xit("return status, msg and user", async ()=>{
                    const response = await request(app).patch("/user").attach("profile_picture", imageBuffer, "Dorothy_Haze.webp").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User profile picture successfully updated.")
                    expect(response.body).toHaveProperty("user") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Profile picture image file is required.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/user").attach("profile_picture", "", "Dorothy_Haze.webp").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Profile picture image file is required.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/user").attach("profile_picture", imageBuffer, "Dorothy_Haze.webp")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Drink", ()=>{
    describe("GET Drinks - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Drinks successfully retrieved.", ()=>{
                it("return status, msg and drinks", async ()=>{
                    const response = await request(app).get("/drink").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Drinks successfully retrieved.")
                    expect(response.body).toHaveProperty("drinks") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/drink")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Game", ()=>{
    describe("GET Games - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Games successfully retrieved.", ()=>{
                it("return status, msg and games", async ()=>{
                    const response = await request(app).get("/game").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Games successfully retrieved.")
                    expect(response.body).toHaveProperty("games") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/game")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("ChatRoom", ()=>{
    describe("GET ChatRoom - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Chat rooms successfully retrieved.", ()=>{
                it("return status, msg and chatRooms", async ()=>{
                    const response = await request(app).get("/chatRoom").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Chat rooms successfully retrieved.")
                    expect(response.body).toHaveProperty("chatRooms") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/chatRoom")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Profile", ()=>{
    describe("POST Profile - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Profile successfully added.", ()=>{
                const body = {
                    "age": 24,
                    "location": "Japan"
                    }
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).post("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Profile successfully added.")
                    expect(response.body).toHaveProperty("profile") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Age must be an integer.", ()=>{
                const body = {
                    "age": "a",
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Age must be an integer.", "status": 400})
                })
            })
            describe("400 Bad Request Age must be a minimum of 1.", ()=>{
                const body = {
                    "age": -1,
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Age must be a minimum of 1.", "status": 400})
                })
            })
            describe("400 Bad Request Location must be string.", ()=>{
                const body = {
                    "age": 13,
                    "location": 1
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Location must be string.", "status": 400})
                })
            })
            describe("400 Bad Request Profile already exists for this user.", ()=>{
                const body = {
                    "age": 24,
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Profile already exists for this user.", "status": 400})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "age": 24,
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/profile").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Profile - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Profile successfully retrieved.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).get("/profile").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Profile successfully retrieved.")
                    expect(response.body).toHaveProperty("profile") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/profile")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PUT Profile - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Profile successfully updated.", ()=>{
                const body = {
                    "age": 13,
                    "location": "Japan"
                    }
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).put("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Profile successfully updated.")
                    expect(response.body).toHaveProperty("profile") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Age must be an integer.", ()=>{
                const body = {
                    "age": "a",
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Age must be an integer.", "status": 400})
                })
            })
            describe("400 Bad Request Age must be a minimum of 1.", ()=>{
                const body = {
                    "age": -1,
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Age must be a minimum of 1.", "status": 400})
                })
            })
            describe("400 Bad Request Location must be string.", ()=>{
                const body = {
                    "age": 13,
                    "location": 1
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Location must be string.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "age": 13,
                    "location": "Japan"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).put("/profile").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH Profile drink - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Profile's drink successfully updated.", ()=>{
                const body = {
                    "attached_drink": 1
                    }
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).patch("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Profile's drink successfully updated.")
                    expect(response.body).toHaveProperty("profile") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Attached drink must be an integer.", ()=>{
                const body = {
                    "attached_drink": "a"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/profile").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Attached drink must be an integer.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "attached_drink": 1
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/profile").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE Profile drink - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Profile successfully deleted.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).del("/profile").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Profile successfully deleted.")
                    expect(response.body).toHaveProperty("profile") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).del("/profile")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Chat", ()=>{
    describe("POST Chat - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Chat successfully created.", ()=>{
                const body = {
                    "chat_room_id": 1,
                    "message": "Hello!"
                    }
                it("return status, msg and chat", async ()=>{
                    const response = await request(app).post("/chat").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Chat successfully created.")
                    expect(response.body).toHaveProperty("chat") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Chat room ID must be an integer.", ()=>{
                const body = {
                    "chat_room_id": "a",
                    "message": "Hello!"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/chat").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Chat room ID must be an integer.", "status": 400})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "chat_room_id": 1,
                    "message": "Hello!"
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/chat").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Chat - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Chats successfully retrieved.", ()=>{
                it("return status, msg and chats", async ()=>{
                    const response = await request(app).get("/chat/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Chats successfully retrieved.")
                    expect(response.body).toHaveProperty("chats") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Chat room ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/chat/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Chat room ID must be an integer.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/chat")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH Chat status - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Chat status successfully updated to Read.", ()=>{
                it("return status, msg and chat", async ()=>{
                    const response = await request(app).patch("/chat/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Chat status successfully updated to Read.")
                    expect(response.body).toHaveProperty("chat") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Chat ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/chat/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Chat ID must be an integer.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/chat/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE Chat - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Chat successfully deleted.", ()=>{
                it("return status, msg and chat", async ()=>{
                    const response = await request(app).del("/chat/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Chat successfully deleted.")
                    expect(response.body).toHaveProperty("chat") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Chat ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).del("/chat/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Chat ID must be an integer.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).del("/chat/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Post", ()=>{
    describe("POST Post - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Post successfully created.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return status, msg and post", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Post successfully created.")
                    expect(response.body).toHaveProperty("post") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Content is required.", ()=>{
                const body = {
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content is required.", "status": 400})
                })
            })
            describe("400 Bad Request Content cannot be empty.", ()=>{
                const body = {
                    "content": ""
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content cannot be empty.", "status": 400})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Post - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Posts successfully retrieved.", ()=>{
                it("return status, msg and posts", async ()=>{
                    const response = await request(app).get("/post").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Posts successfully retrieved.")
                    expect(response.body).toHaveProperty("posts") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/post/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Post Id - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Post successfully retrieved.", ()=>{
                it("return status, msg and post", async ()=>{
                    const response = await request(app).get("/post/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Post successfully retrieved.")
                    expect(response.body).toHaveProperty("post") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Post ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/post/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Post not found. No post with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/post/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post not found. No post with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/post")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH Post Id - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Post content successfully updated.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first time editing a post."
                    }
                it("return status, msg and post", async ()=>{
                    const response = await request(app).patch("/post/1").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Post content successfully updated.")
                    expect(response.body).toHaveProperty("post") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Content is required.", ()=>{
                const body = {
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/post/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content is required.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/post/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE Post Id - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Post successfully deleted.", ()=>{
                it("return status, msg and post", async ()=>{
                    const response = await request(app).del("/post/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Post successfully deleted.")
                    expect(response.body).toHaveProperty("post") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Post ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).del("/post/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Post not found. No post with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).del("/post/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post not found. No post with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).del("/post/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("POST Post - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Post successfully created.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return status, msg and post", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Post successfully created.")
                    expect(response.body).toHaveProperty("post") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Content is required.", ()=>{
                const body = {
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content is required.", "status": 400})
                })
            })
            describe("400 Bad Request Content cannot be empty.", ()=>{
                const body = {
                    "content": ""
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content cannot be empty.", "status": 400})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/post").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Comment", ()=>{
    describe("POST Comment - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Comment successfully created.", ()=>{
                const body = {
                    "post_id": 2,
                    "content": "Dorothy was here! This is my first post."
                }
                it("return status, msg and comment", async ()=>{
                    const response = await request(app).post("/comment").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Comment successfully created.")
                    expect(response.body).toHaveProperty("comment") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Post ID must be an integer.", ()=>{
                const body = {
                    "post_id": "a",
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/comment").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post ID must be an integer.", "status": 400})
                })
            })
            describe("400 Bad Request Content is required.", ()=>{
                const body = {
                    "post_id": 2,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/comment").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content is required.", "status": 400})
                })
            })
            describe("400 Bad Request Content cannot be empty.", ()=>{
                const body = {
                    "post_id": 2,
                    "content": ""
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/comment").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Content cannot be empty.", "status": 400})
                })
            })
            describe("404 Bad Request Post not found. No post with the ID -1 exists.", ()=>{
                const body = {
                    "post_id": -1,
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/comment").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post not found. No post with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "post_id": 2,
                    "content": "Dorothy was here! This is my first post."
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/comment").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Comment - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Comments successfully retrieved.", ()=>{
                it("return status, msg and comments", async ()=>{
                    const response = await request(app).get("/comment/2").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Comments successfully retrieved.")
                    expect(response.body).toHaveProperty("comments") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Post ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/comment/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Post not found. No post with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/comment/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Post not found. No post with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/comment/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH Comment content - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Comment content successfully updated.", ()=>{
                const body = {
                    "content": "Dorothy was here! This is my first post."
                }
                it("return status, msg and comment", async ()=>{
                    const response = await request(app).patch("/comment/1").set('Authorization',`Bearer ${token}`).send(body)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Comment content successfully updated.")
                    expect(response.body).toHaveProperty("comment") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Comment ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/comment/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Comment ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Comment not found. No comment with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/comment/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Comment not found. No comment with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).patch("/comment/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE Comment content - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Comment successfully deleted.", ()=>{
                it("return status, msg and comment", async ()=>{
                    const response = await request(app).del("/comment/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Comment successfully deleted.")
                    expect(response.body).toHaveProperty("comment") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Comment ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).del("/comment/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Comment ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Comment not found. No comment with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).del("/comment/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Comment not found. No comment with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const response = await request(app).del("/chat/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("UserGame", ()=>{
    describe("POST UserGame - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - User game successfully created.", ()=>{
                const body = {
                    "game_id": 1,
                }
                it("return status, msg and userGame", async ()=>{
                    const response = await request(app).post("/userGame").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "User game successfully created.")
                    expect(response.body).toHaveProperty("userGame") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Game ID must be an integer.", ()=>{
                const body = {
                    "game_id": "a",
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userGame").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Game ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Game not found. No game with the ID -1 exists.", ()=>{
                const body = {
                    "game_id": -1,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userGame").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Game not found. No game with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "game_id": 1,
                    }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userGame").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET UserGame - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Games successfully retrieved.", ()=>{
                it("return status, msg and games", async ()=>{
                    const response = await request(app).get("/userGame/2").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Games successfully retrieved.")
                    expect(response.body).toHaveProperty("games") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request User not found. No user with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User not found. No user with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("GET UserGame getUsers - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Users successfully retrieved.", ()=>{
                it("return status, msg and users", async ()=>{
                    const response = await request(app).get("/userGame/user/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Users successfully retrieved.")
                    expect(response.body).toHaveProperty("users") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Game ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/user/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Game ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Game not found. No game with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/user/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Game not found. No game with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userGame/user/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("PATCH UserGame content - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User game high score successfully updated.", ()=>{
                it("return status, msg and chat", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).patch("/userGame/1").set('Authorization',`Bearer ${token}`).send(body)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User game high score successfully updated.")
                    expect(response.body).toHaveProperty("chat") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User Game ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).patch("/userGame/a").set('Authorization',`Bearer ${token}`).send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User Game ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request User game not found. No user game with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).patch("/userGame/-1").set('Authorization',`Bearer ${token}`).send(body)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User game not found. No user game with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).patch("/userGame/1").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("Gift", ()=>{
    describe("POST Gift - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - Gift successfully created.", ()=>{
                const body = {
                    "recipient_id": 2,
                    "drink_id": 1,
                }
                it("return status, msg and gift", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "Gift successfully created.")
                    expect(response.body).toHaveProperty("gift") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Recipient ID must be an integer.", ()=>{
                const body = {
                    "recipient_id": "a",
                    "drink_id": 1,
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Recipient ID must be an integer.", "status": 400})
                })
            })
            describe("400 Bad Request Drink ID must be an integer.", ()=>{
                const body = {
                    "recipient_id": 2,
                    "drink_id": "a",
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Drink ID must be an integer.", "status": 400})
                })
            })
            describe("400 Bad Request You cannot send gift to yourself!.", ()=>{
                const body = {
                    "recipient_id": 3,
                    "drink_id": 1,
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "You cannot send gift to yourself!", "status": 400})
                })
            })
            describe("404 Bad Request Recipient user not found. No user with the ID -1 exists.", ()=>{
                const body = {
                    "recipient_id": -1,
                    "drink_id": 1,
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Recipient user not found. No user with the ID -1 exists.", "status": 404})
                })
            })
            describe("404 Bad Request Drink not found. No drink with the ID -1 exists.", ()=>{
                const body = {
                    "recipient_id": 2,
                    "drink_id": -1,
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Drink not found. No drink with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "recipient_id": 2,
                    "drink_id": 1,
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/gift").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET Gift - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Sent Gifts successfully retrieved.", ()=>{
                it("return status, msg and gifts", async ()=>{
                    const response = await request(app).get("/gift/2").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Sent Gifts successfully retrieved.")
                    expect(response.body).toHaveProperty("gifts") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request User sender not found. No user sender with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User sender not found. No user sender with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("GET Gift receiver - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Received gifts successfully retrieved.", ()=>{
                it("return status, msg and gifts", async ()=>{
                    const response = await request(app).get("/gift/receiver/2").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Received gifts successfully retrieved.")
                    expect(response.body).toHaveProperty("gifts") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/receiver/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request User recipient not found. No user recipient with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/receiver/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User recipient not found. No user recipient with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/gift/receiver/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE Gift - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - Gift successfully deleted.", ()=>{
                it("return status, msg and gift", async ()=>{
                    const response = await request(app).delete("/gift/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "Gift successfully deleted.")
                    expect(response.body).toHaveProperty("gift") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User Gift ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).delete("/gift/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User Gift ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Gift not found. No gift with the ID -1 exists.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).delete("/gift/-1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Gift not found. No gift with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).delete("/gift/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})

describe("UserDrink", ()=>{
    describe("POST Drink - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("201 Created - User drink successfully created.", ()=>{
                const body = {
                    "drink_id": 1
                }
                it("return status, msg and userDrink", async ()=>{
                    const response = await request(app).post("/userDrink").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(201)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 201)
                    expect(response.body).toHaveProperty("msg", "User drink successfully created.")
                    expect(response.body).toHaveProperty("userDrink") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request Drink ID must be an integer.", ()=>{
                const body = {
                    "drink_id": "a"
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userDrink").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Drink ID must be an integer.", "status": 400})
                })
            })
            describe("404 Bad Request Drink not found. No drink with the ID -1 exists.", ()=>{
                const body = {
                    "drink_id": -1
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userDrink").send(body).set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(404)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Drink not found. No drink with the ID -1 exists.", "status": 404})
                })
            })
            describe("401 Bad Request Unauthorized. A valid bearer token is required for access.", ()=>{
                const body = {
                    "drink_id": 1
                }
                it("return error obj", async ()=>{
                    const response = await request(app).post("/userDrink").send(body)
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })

    describe("GET UserDrink - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User drinks successfully retrieved.", ()=>{
                it("return status, msg and userDrinks", async ()=>{
                    const response = await request(app).get("/userDrink").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User drinks successfully retrieved.")
                    expect(response.body).toHaveProperty("userDrinks") // updatedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).get("/userDrink/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
    
    describe("DELETE UserDrink - Bearer token needed", ()=>{
        describe("OK", ()=>{    
            describe("200 OK - User drink successfully deleted.", ()=>{
                it("return status, msg and userDrink", async ()=>{
                    const response = await request(app).delete("/userDrink/1").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(200)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("status", 200)
                    expect(response.body).toHaveProperty("msg", "User drink successfully deleted.")
                    expect(response.body).toHaveProperty("userDrink") // craetedAt differs
                })
            })
        })
        describe("BAD", ()=>{
            describe("400 Bad Request User drink ID must be an integer.", ()=>{
                it("return error obj", async ()=>{
                    const response = await request(app).delete("/userDrink/a").set('Authorization',`Bearer ${token}`)
                    expect(response.status).toBe(400)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "User drink ID must be an integer.", "status": 400})
                })
            })
            describe("401 Unauthorized Unauthorized. A valid bearer token is required for access.", ()=>{
                it("return status, msg and profile", async ()=>{
                    const body = {
                        "high_score": 100,
                    }
                    const response = await request(app).delete("/userDrink/1")
                    expect(response.status).toBe(401)
                    expect(response.body).toBeInstanceOf(Object)
                    expect(response.body).toHaveProperty("error", {"msg": "Unauthorized. A valid bearer token is required for access.", "status": 401})
                })
            })
        })
    })
})
