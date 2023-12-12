# Dependencies

## Express
For easy routing.

## Bcrypt
To hash password before saving it into database.

## Dotenv
To be able to store important info (API KEYS and so on) in .env file and .gitignore it.

## Imagekit & Multer
So that I can send user's photos to my imagekit databse and store its url in my database instead of the huge file itself.

## Pg
So that I can send SQL command to my postgres database.

## Sequelize
The orm for postgres. SO that I do not have to write raw SQL in my script.

## Jsonwebtoken (jwt)
To make token from payload, and get payload from token.

## Dev only

### Nodemon
Deamon to refresh the local server for me on changes.

### Jest & Supertest
To be able to have a js script that can make request immediately to my routers and have it be tested without tampering with my local database itself.

### Sequelize-cli
To be able to set up the orm via cli during development.