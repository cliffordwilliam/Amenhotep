# User

## POST Register - No bearer token needed

Register a new user by sending a POST request to `/user/register`.

**Endpoint:** `POST /user/register`

### Request Body

|Parameter |Type  |Description
|-         |-     |-
|`username`|string|The username of the user.
|`email`   |string|The email address of the user.
|`password`|string|The password for the user.

**Example:**
```json
{
  "username": "Dorothy Haze",
  "email": "Dorothy@gmail.com",
  "password": "Dorothy"
}
```

### Response JSON

#### 201 Created - User successfully registered

```json
{
    "status": 201,
    "msg": "User successfully registered.",
    "user": {
        "id": 1,
        "username": "Dorothy Haze",
        "email": "Dorothy@gmail.com",
        "profile_picture": null,
        "bio": null,
        "credit": 0
    }
}
```

#### 400 Bad Request

Username Related:

```json
{
    "error": {
        "msg": "Username is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Username cannot be empty.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Username must be between 3 and 255 characters.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Username is already in use!",
        "status": 400
    }
}
```

Email Related:

```json
{
    "error": {
        "msg": "Email is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Please provide a valid email address.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Email address is already in use!",
        "status": 400
    }
}
```

Password Related:

```json
{
    "error": {
        "msg": "Password is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Password cannot be empty.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Password must be between 3 and 255 characters.",
        "status": 400
    }
}
```

## POST Login - No bearer token needed

Login a registered user and generate a token by sending a POST request to `/user/login`

**Endpoint:** `POST /user/login`

### Request Body

|Parameter |Type  |Description
|-         |-     |-
|`email`   |string|The email address of the user.
|`password`|string|The password for the user.

**Example:**
```json
{
  "email": "Dorothy@gmail.com",
  "password": "Dorothy"
}
```

### Response JSON

#### 200 OK - User successfully logged in

```json
{
    "status": 200,
    "msg": "User successfully logged in.",
    "token": "your token goes here",
    "user": {
        "id": 1,
        "username": "Dorothy Haze",
        "email": "Dorothy@gmail.com",
        "profile_picture": null,
        "bio": null,
        "credit": 0
    }
}
```

#### 400 Bad Request

Email Related:

```json
{
    "error": {
        "msg": "Email is required.",
        "status": 400
    }
}
```

Password Related:

```json
{
    "error": {
        "msg": "Password is required.",
        "status": 400
    }
}
```

#### 401 Unauthorized

Email Related:

```json
{
    "error": {
        "msg": "User not found. Please check your email or register.",
        "status": 401
    }
}
```

Password Related:

```json
{
    "error": {
        "msg": "Wrong password. Please try again.",
        "status": 401
    }
}
```

## GET User - Bearer token needed

Retrieve user data from the database. Passwords are excluded for security reasons by sending a GET request to `/user`.

**Endpoint:** `GET /user?username=&limit=&page=&sort=&sortField=`

### Request query

|Query            |Type     |Description
|-                |-        |-
|`username`       |string   |Search for users by their username.
|`limit`          |integer  |Specify the number of entries per page.
|`page`           |integer  |Navigate through the dataset using the page number.
|`sort`           |string   |Determine the sorting order (`asc` for ascending, `desc` for descending).
|`sortField`      |string   |Choose the attribute for sorting data (`username`, `email`, `credit`, or `id`).

**Example:**
```json
user?username=Dor&limit=10&page=1&sort=asc&sortField=id
```

### Response JSON

#### 200 OK - Users successfully retrieved

```json
{
    "status": 200,
    "msg": "Users successfully retrieved.",
    "users": [
        {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-11T13:09:35.567Z",
            "updatedAt": "2023-12-11T13:09:35.567Z"
        },
        {
            // Additional data...
        },
        {
            // Additional data...
        },
    ]
}
```

#### 400 Bad Request

Invalid Sort:

```json
{
    "error": {
        "msg": "Invalid sort. Please use 'asc' or 'desc'.",
        "status": 400
    }
}
```

Invalid SortField:

```json
{
    "error": {
        "msg": "Invalid sortField. Please use 'username', 'email', 'credit', or 'id'.",
        "status": 400
    }
}
```

#### 401 Unauthorized

Missing Bearer Token:

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET User Id - Bearer token needed

Retrieve details of a specific user by their ID by sending a GET request to `/user/:id`.

**Endpoint:** `GET /user/:id`

### Request params

|Query |Type        |Description
|-     |-           |-
|`id`  |integer     |Search for users by their ID.

**Example:**
```json
/user/1
```

### Response JSON

#### 200 OK - User successfully retrieved

```json
{
    "status": 200,
    "msg": "User successfully retrieved.",
    "user": {
        "id": 1,
        "username": "Dorothy Haze",
        "email": "Dorothy@gmail.com",
        "profile_picture": null,
        "bio": null,
        "credit": 0
    }
}
```

### 400 Bad Request

Invalid User ID:

```json
{
    "error": {
        "msg": "User ID must be an integer.",
        "status": 400
    }
}
```

#### 404 Not Found

User Not Found:

```json
{
    "error": {
        "msg": "User not found. No user with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401 Unauthorized

Missing Bearer Token:

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PUT User - Bearer token needed

This endpoint allows logged-in users to update their own information. Users can modify the following fields:
- `username`
- `password`
- `bio`
- `credit`

**Endpoint:** `PUT /user`

### Request body

|Parameter        |Type   |Description
|-                |-      |-
|`username`       |string |Username of the user.
|`password`       |string |Password of the user.
|`bio`            |string |Biography of the user.
|`credit`         |integer|Credit of the user.

**Example:**
```json
{
  "username": "Dorothy Haze",
  "password": "Dorothy",
  "bio": "Dorothy appears to have a bubbly...",
  "credit": 0,
}
```

### Response JSON

#### 200 OK - Success put users

```json
{
    "status": 201,
    "msg": "User successfully updated.",
    "user": {
        "id": 1,
        "username": "Dorothy Haze",
        "password": "Dorothy",
        "email": "Dorothy@gmail.com",
        "profile_picture": null,
        "bio": "Dorothy appears to have a bubbly...",
        "credit": 0,
        "createdAt": "2023-12-12T12:35:18.404Z",
        "updatedAt": "2023-12-12T13:00:02.471Z"
    }
}
```

#### 400 Bad Request

Empty Username:

```json
{
    "error": {
        "msg": "Username cannot be empty.",
        "status": 400
    }
}
```

Username Length Validation:

```json
{
    "error": {
        "msg": "Username must be between 3 and 255 characters.",
        "status": 400
    }
}
```

Empty Password:

```json
{
    "error": {
        "msg": "Password cannot be empty.",
        "status": 400
    }
}
```

Password Length Validation:

```json
{
    "error": {
        "msg": "Password must be between 3 and 255 characters.",
        "status": 400
    }
}
```

Bio Length Validation:

```json
{
    "error": {
        "msg": "Bio must be between 3 and 255 characters.",
        "status": 400
    }
}
```

#### 401 Unauthorized

Missing Bearer Token:

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH User Profile Picture - Bearer token needed

Logged-in users can update their `profile_picture` using this endpoint.

**Endpoint:** `PATCH /user`

### Request body (form-data)

|Parameter        |Type   |Description
|-                |-      |-
|`profile_picture`|file   |Absolute file path of the image on your disk.

**Example:**
```json
{
  "profile_picture": "C:/Users/.../Dorothy_Haze.webp",
}
```

### Response JSON

#### 200 OK - User profile picture successfully updated

```json
{
    "status": 200,
    "msg": "User profile picture successfully updated.",
    "user": {
        "id": 1,
        "username": "Dorothy Haze",
        "password": "Dorothy",
        "email": "Dorothy@gmail.com",
        "profile_picture": "https://ik.imagekit.io/rclzujjqk/Dorothy_Haze_RvdSs9PDw.webp",
        "bio": "Dorothy appears to have a bubbly...",
        "credit": 0,
        "createdAt": "2023-12-12T12:35:18.404Z",
        "updatedAt": "2023-12-12T13:03:44.186Z"
    }
}
```

#### 400 Bad Request

Missing Profile Picture:

```json
{
    "error": {
        "msg": "Profile picture image file is required.",
        "status": 400
    }
}
```

#### 401 Unauthorized

Missing Bearer Token:

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE User - Bearer token needed

Logged-in users can delete their own account.

**Endpoint:** `DELETE /user`

### Response JSON

#### 200 OK - User successfully deleted

```json
{
    "status": 200,
    "msg": "User successfully deleted.",
    "user": {
        "id": 3,
        "username": "Dorothy Haze",
        "email": "Dorothy@gmail.com",
        "profile_picture": "https://ik.imagekit.io/rclzujjqk/Dorothy_Haze_vwE3pOqh8.webp",
        "bio": "Dorothy appears to have a bubbly...",
        "credit": 0
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


# Drink

## GET Drinks - Bearer token needed

Drinks are immutable, ensuring they remain unchanged and inaccessible for modification, patching, or deletion.

**Endpoint:** `GET /drink`

### Response JSON

#### 200 OK - Drinks successfully retrieved

```json
{
    "status": 200,
    "msg": "Drinks successfully retrieved.",
    "drinks": [
        {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-11T21:41:15.115Z",
            "updatedAt": "2023-12-11T21:41:15.115Z"
        },
        {
            // Additional data...
        },
    ]
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


# Game

## GET Game - Bearer token needed

Retrieve a list of available games. Games are immutable, ensuring they remain unchanged and inaccessible for modification, patching, or deletion.

**Endpoint:** `GET /game`

### Response JSON

#### 200 OK - Games Successfully Retrieved

```json
{
    "status": 200,
    "msg": "Games successfully retrieved.",
    "games": [
        {
            "id": 1,
            "name": "Galactic Dash",
            "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
            "createdAt": "2023-12-11T21:41:15.133Z",
            "updatedAt": "2023-12-11T21:41:15.133Z"
        },
        {
            // Additional games...
        },
    ]
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


# ChatRoom

## GET ChatRoom - Bearer token needed

Chat rooms are immutable, ensuring they remain unchanged and inaccessible for modification, patching, or deletion.

**Endpoint:** `GET /chatRoom`

### Response JSON

#### 200 OK - Chat rooms successfully retrieved

```json
{
    "status": 200,
    "msg": "Chat rooms successfully retrieved.",
    "chatRooms": [
        {
            "id": 1,
            "name": "Velvet Room",
            "createdAt": "2023-12-11T22:26:37.346Z",
            "updatedAt": "2023-12-11T22:26:37.346Z"
        },
        {
            "id": 2,
            "name": "Tartarus Lounge",
            "createdAt": "2023-12-11T22:26:37.346Z",
            "updatedAt": "2023-12-11T22:26:37.346Z"
        },
        {
            "id": 3,
            "name": "Duodecim Pub",
            "createdAt": "2023-12-11T22:26:37.346Z",
            "updatedAt": "2023-12-11T22:26:37.346Z"
        }
    ]
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


# Profile

## POST Profile - Bearer token needed

Logged-in users can create one profile for themselves.

**Endpoint:** `POST /profile`

### Request Body

|Parameter |Type   |Description
|-         |-      |-
|`age`     |integer|The age of the user. Minimum value is 1.
|`location`|string |The location of the user.

**Example:**
```json
{
  "age": 24,
  "location": "Japan"
}
```

### Response JSON

#### 201 Created - Profile successfully added

```json
{
    "status": 201,
    "msg": "Profile successfully added.",
    "profile": {
        "id": 1,
        "user_id": 4,
        "age": 24,
        "location": "Japan",
        "attached_drink": null,
        "createdAt": "2023-12-12T13:23:30.173Z",
        "updatedAt": "2023-12-12T13:23:30.173Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": null
    }
}
```

#### 400 Bad Request

Age Related:

```json
{
    "error": {
        "msg": "Age must be an integer.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Age must be a minimum of 1.",
        "status": 400
    }
}
```

Location Related:

```json
{
    "error": {
        "msg": "Location must be string.",
        "status": 400
    }
}
```

Profile Related:

```json
{
    "error": {
        "msg": "Profile already exists for this user.",
        "status": 400
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Profile - Bearer token needed

Logged-in users can retrieve their own profile.

**Endpoint:** `GET /profile`

### Response JSON

#### 200 OK - Profile successfully retrieved

```json
{
    "status": 200,
    "msg": "Profile successfully retrieved.",
    "profile": {
        "id": 1,
        "user_id": 4,
        "age": 24,
        "location": "Japan",
        "attached_drink": null,
        "createdAt": "2023-12-12T13:23:30.173Z",
        "updatedAt": "2023-12-12T13:23:30.173Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": null
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PUT Profile - Bearer token needed

This endpoint allows logged-in users to update their own profile. Users can modify the following fields:
- `age`
- `location`

**Endpoint:** `PUT /profile`

### Request body

|Parameter        |Type   |Description
|-                |-      |-
|`age`            |integer|Age of the user. Minium value is 1.
|`location`       |string |Location of the user.

**Example:**
```json
{
  "age": 13,
  "location": "Japan"
}
```

### Response JSON

#### 200 OK - Profile successfully updated

```json
{
    "status": 200,
    "msg": "Profile successfully updated.",
    "profile": {
        "id": 11,
        "user_id": 1,
        "age": 13,
        "location": "Japan",
        "attached_drink": null,
        "createdAt": "2023-12-12T00:27:53.981Z",
        "updatedAt": "2023-12-12T00:28:24.206Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-11T23:13:56.424Z",
            "updatedAt": "2023-12-11T23:13:56.424Z"
        },
        "Drink": null
    }
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "Age must be an integer.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Age must be a minimum of 1.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Location must be string.",
        "status": 400
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH Profile drink - Bearer token needed

This endpoint allows logged-in to modify their associated drinks within their profile.

The acceptable range for the attached_drink parameter is limited to values between 1 and 21, ensuring data integrity through automatic clamping.

Users can modify the following:
- `attached_drink`

**Endpoint:** `PATCH /profile`

### Request body

|Parameter        |Type   |Description
|-                |-      |-
|`attached_drink` |integer|Profile's FK for the drink. The value should be an integer between 1 and 21 (inclusive).

**Example:**
```json
{
  "attached_drink": 1,
}
```

### Response JSON

#### 200 OK - Profile's drink successfully updated

```json
{
    "status": 200,
    "msg": "Profile's drink successfully updated.",
    "profile": {
        "id": 1,
        "user_id": 4,
        "age": 13,
        "location": "Japan",
        "attached_drink": 1,
        "createdAt": "2023-12-12T13:23:30.173Z",
        "updatedAt": "2023-12-12T13:29:54.099Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T12:32:28.385Z",
            "updatedAt": "2023-12-12T12:32:28.385Z"
        }
    }
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "Attached drink must be an integer.",
        "status": 400
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Profile drink - Bearer token needed

Logged-in user can delete their own profile.

**Endpoint:** `DELETE /profile`

### Response JSON

#### 200 OK - Profile successfully deleted

```json
{
    "status": 200,
    "msg": "Profile successfully deleted.",
    "profile": {
        "id": 1,
        "user_id": 4,
        "age": 13,
        "location": "Japan",
        "attached_drink": 1,
        "createdAt": "2023-12-12T13:23:30.173Z",
        "updatedAt": "2023-12-12T13:29:54.099Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T12:32:28.385Z",
            "updatedAt": "2023-12-12T12:32:28.385Z"
        }
    }
}
```

#### 404 Not Found

```json
{
    "error": {
        "msg": "You have not made your profile yet",
        "status": 404
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


# Chat

## POST Chat - Bearer token needed

Logged-in users can send a new message to a chat room.

**Endpoint:** `POST /chat`

### Request Body

|Parameter     |Type   |Description
|-             |-      |-
|`chat_room_id`|integer|The chat room id from a react page/view. Each page represents one room.
|`message`     |string |The message the user creates.

**Example:**
```json
{
  "chat_room_id": 1,
  "message": "Hello!"
}
```

### Response JSON

#### 201 Created - Chat successfully created

```json
{
    "status": 201,
    "msg": "Chat successfully created.",
    "chat": {
        "id": 1,
        "chat_room_id": 1,
        "user_id": 4,
        "message": "Hello!",
        "status": "Sent",
        "createdAt": "2023-12-12T13:34:55.543Z",
        "updatedAt": "2023-12-12T13:34:55.543Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Chat_Room": {
            "id": 1,
            "name": "Velvet Room",
            "createdAt": "2023-12-12T12:32:28.395Z",
            "updatedAt": "2023-12-12T12:32:28.395Z"
        }
    }
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "Chat room ID must be an integer.",
        "status": 400
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Chat - Bearer token needed

Retrieves all chat messages in a specific chat room. (when a new data appear, this is called).

The acceptable range for the attached_drink parameter is limited to values between 1 and 3, ensuring data integrity through automatic clamping.

**Endpoint:** `GET /chat/chat_room_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`chat_room_id`|integer|The chat room id from a react page/view. Each page represent one room.

**Example:**
```json
chat/1
```

### Response JSON

#### 200 OK - Chats successfully retrieved

```json
{
    "status": 200,
    "msg": "Chats successfully retrieved.",
    "chats": [
        {
            "id": 1,
            "chat_room_id": 1,
            "user_id": 4,
            "message": "Hello!",
            "status": "Sent",
            "createdAt": "2023-12-12T13:34:55.543Z",
            "updatedAt": "2023-12-12T13:34:55.543Z",
            "User": {
                "id": 4,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T13:09:56.441Z",
                "updatedAt": "2023-12-12T13:09:56.441Z"
            },
            "Chat_Room": {
                "id": 1,
                "name": "Velvet Room",
                "createdAt": "2023-12-12T12:32:28.395Z",
                "updatedAt": "2023-12-12T12:32:28.395Z"
            }
        }
    ]
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "Chat room ID must be an integer.",
        "status": 400
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH Chat status - Bearer token needed

Socket update chat `status` using this endpoint.

**Endpoint:** `PATCH /chat`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The chat ID.

**Example:**
```json
chat/1
```

### Response JSON

#### 200 OK - Chat status successfully updated to Read

```json
{
    "status": 200,
    "msg": "Chat status successfully updated to Read.",
    "chat": {
        "id": 1,
        "chat_room_id": 1,
        "user_id": 4,
        "message": "Hello!",
        "status": "Read",
        "createdAt": "2023-12-12T13:34:55.543Z",
        "updatedAt": "2023-12-12T13:40:09.129Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Chat_Room": {
            "id": 1,
            "name": "Velvet Room",
            "createdAt": "2023-12-12T12:32:28.395Z",
            "updatedAt": "2023-12-12T12:32:28.395Z"
        }
    }
}
```

### 400 Bad Request

```json
{
    "error": {
        "msg": "Chat ID must be an integer.",
        "status": 400
    }
}
```

#### 404 Not Found

```json
{
    "error": {
        "msg": "Chat not found. No chat with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Chat - Bearer token needed

Delete the chat using its ID.

**Endpoint:** `DELETE /chat`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The chat ID.

**Example:**
```json
chat/1
```

### Response JSON

#### 200 OK - Chat successfully deleted

```json
{
    "status": 200,
    "msg": "Chat successfully deleted.",
    "chat": {
        "id": 1,
        "chat_room_id": 1,
        "user_id": 1,
        "message": "Hello!",
        "status": "Read",
        "createdAt": "2023-12-12T04:35:11.042Z",
        "updatedAt": "2023-12-12T04:36:43.768Z"
    }
}
```

### 400 Bad Request

```json
{
    "error": {
        "msg": "Chat ID must be an integer.",
        "status": 400
    }
}
```

#### 404 Not Found

```json
{
    "error": {
        "msg": "Chat not found. No chat with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

# Post

## POST Post - Bearer token needed

Logged-in user can create posts. Posts belongs to the creator.

**Endpoint:** `POST /post`

### Request Body

|Parameter     |Type   |Description
|-             |-      |-
|`content`     |string |The content of the user's post.

**Example:**
```json
{
  "content": "Dorothy was here! This is my first post."
}
```

### Response JSON

#### 201 - Post successfully created

```json
{
    "status": 201,
    "msg": "Post successfully created.",
    "post": {
        "id": 2,
        "user_id": 1,
        "content": "Dorothy was here! This is my first post.",
        "createdAt": "2023-12-12T05:08:39.903Z",
        "updatedAt": "2023-12-12T05:08:39.903Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Content is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Content cannot be empty.",
        "status": 400
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Post - Bearer token needed

Retrieves all posts.

**Endpoint:** `GET /post`

### Response JSON

#### 201 OK - Posts successfully retrieved

```json
{
    "status": 200,
    "msg": "Posts successfully retrieved.",
    "posts": [
        {
            "id": 1,
            "user_id": 1,
            "content": "Dorothy was here! This is my first post.",
            "createdAt": "2023-12-12T05:08:24.959Z",
            "updatedAt": "2023-12-12T05:08:24.959Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T04:26:45.678Z",
                "updatedAt": "2023-12-12T04:26:45.678Z"
            }
        },
        {
            // Additional data...
        }
    ]
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Post Id - Bearer token needed

Retrieve details of a post by their ID.

**Endpoint:** `GET /post/:id`

### Request params

|Query |Type        |Description
|-     |-           |-
|`id`  |integer     |Search for posts by their id.

**Example:**
```json
/post/1
```

### Response JSON

#### 200 OK - Post successfully retrieved

```json
{
    "status": 200,
    "msg": "Post successfully retrieved.",
    "post": {
        "id": 1,
        "user_id": 1,
        "content": "Dorothy was here! This is my first post.",
        "createdAt": "2023-12-12T05:08:24.959Z",
        "updatedAt": "2023-12-12T05:08:24.959Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "Post ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Post not found. No post with the ID -2 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH Post Id - Bearer token needed

Logged-in user can edit posts.

**Endpoint:** `PATCH /post/:id`

### Request Body

|Parameter     |Type   |Description
|-             |-      |-
|`content`     |string |The content of the user's post.

**Example:**
```json
{
  "content": "Dorothy was here again! This is my first post update."
}
```

### Request params

|Query |Type        |Description
|-     |-           |-
|`id`  |integer     |Search for posts by their id.

**Example:**
```json
/post/1
```

### Response JSON

#### 201 OK - Post content successfully updated

```json
{
    "status": 200,
    "msg": "Post content successfully updated.",
    "post": {
        "id": 3,
        "user_id": 1,
        "content": "Dorothy was here again! This is my first post update.",
        "createdAt": "2023-12-12T05:53:23.851Z",
        "updatedAt": "2023-12-12T05:54:38.659Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Content is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Content cannot be empty.",
        "status": 400
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Post Id - Bearer token needed

Logged-in user can delete posts.

**Endpoint:** `DELETE /post/:id`

### Request params

|Query |Type        |Description
|-     |-           |-
|`id`  |integer     |Delete posts by their id.

**Example:**
```json
/post/1
```

### Response JSON

#### 201 - Post successfully deleted

```json
{
    "status": 200,
    "msg": "Post successfully deleted.",
    "post": {
        "id": 2,
        "user_id": 1,
        "content": "Dorothy was here! This is my first post.",
        "createdAt": "2023-12-12T05:08:39.903Z",
        "updatedAt": "2023-12-12T05:08:39.903Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Post ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Post not found. No post with the ID 2 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

# Comment

## POST Comment - Bearer token needed

Logged-in user can create comments. Comments belongs to the creator.

**Endpoint:** `POST /comment`

### Request Body

|Parameter     |Type    |Description
|-             |-       |-
|`post_id`     |integer |The comment FK that points to the owner post.
|`content`     |string  |The content of the user's post.

**Example:**
```json
{
  "post_id": 3,
  "content": "Dorothy was here! This is my first post."
}
```

### Response JSON

#### 201 OK - Comment successfully created

```json
{
    "status": 201,
    "msg": "Comment successfully created.",
    "comment": {
        "id": 6,
        "post_id": 3,
        "user_id": 1,
        "content": "This is Dorothy, commenting on her own post!",
        "createdAt": "2023-12-12T06:22:18.832Z",
        "updatedAt": "2023-12-12T06:22:18.832Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        },
        "Post": {
            "id": 3,
            "user_id": 1,
            "content": "Dorothy was here again! This is my first post update.",
            "createdAt": "2023-12-12T05:53:23.851Z",
            "updatedAt": "2023-12-12T05:54:38.659Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Post ID must be an integer.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Content is required.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Content cannot be empty.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Post not found. No post with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```


## GET Comment - Bearer token needed

Retrieves all comment in a specific post.

**Endpoint:** `GET /comment/post_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`post_id`     |integer|The post id from a react page/view. Each page represent one post.

**Example:**
```json
{
  "post_id": 3,
}
```

### Response JSON

#### 201 OK - Comments successfully retrieved

```json
{
    "status": 200,
    "msg": "Comments successfully retrieved.",
    "comments": [
        {
            "id": 5,
            "post_id": 3,
            "user_id": 1,
            "content": "This is Dorothy, commenting on her own post!",
            "createdAt": "2023-12-12T06:20:37.487Z",
            "updatedAt": "2023-12-12T06:20:37.487Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T04:26:45.678Z",
                "updatedAt": "2023-12-12T04:26:45.678Z"
            },
            "Post": {
                "id": 3,
                "user_id": 1,
                "content": "Dorothy was here again! This is my first post update.",
                "createdAt": "2023-12-12T05:53:23.851Z",
                "updatedAt": "2023-12-12T05:54:38.659Z"
            }
        },
        {
            "id": 6,
            "post_id": 3,
            "user_id": 1,
            "content": "This is Dorothy, commenting on her own post!",
            "createdAt": "2023-12-12T06:22:18.832Z",
            "updatedAt": "2023-12-12T06:22:18.832Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T04:26:45.678Z",
                "updatedAt": "2023-12-12T04:26:45.678Z"
            },
            "Post": {
                "id": 3,
                "user_id": 1,
                "content": "Dorothy was here again! This is my first post update.",
                "createdAt": "2023-12-12T05:53:23.851Z",
                "updatedAt": "2023-12-12T05:54:38.659Z"
            }
        }
    ]
}
```

#### 400

```json
{
    "error": {
        "msg": "Post ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Post not found. No post with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH Comment content - Bearer token needed

Logged-in user can edit their comment. Edit is based on the comment id. Passed via query params.

**Endpoint:** `PATCH /comment/:id`

### Request Body

|Parameter     |Type    |Description
|-             |-       |-
|`content`     |string  |The content of the user's post.

**Example:**
```json
{
  "content": "Dorothy first comment update."
}
```

### Request Params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The comment ID.

**Example:**
```json
comment/5
```

### Response JSON

#### 200 OK - Comment content successfully updated

```json
{
    "status": 200,
    "msg": "Comment content successfully updated.",
    "comment": {
        "id": 5,
        "post_id": 3,
        "user_id": 1,
        "content": "Dorothy first comment update!",
        "createdAt": "2023-12-12T06:20:37.487Z",
        "updatedAt": "2023-12-12T08:07:05.896Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        },
        "Post": {
            "id": 3,
            "user_id": 1,
            "content": "Dorothy was here again! This is my first post update.",
            "createdAt": "2023-12-12T05:53:23.851Z",
            "updatedAt": "2023-12-12T05:54:38.659Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "Comment ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Comment not found. No comment with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Comment content - Bearer token needed

Logged-in user can delete their comment. Delete is based on the comment id. Passed via query params.

**Endpoint:** `DELETE /comment/:id`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The comment ID.

**Example:**
```json
comment/5
```

### Response JSON

#### 200 OK - Comment successfully deleted

```json
{
    "status": 200,
    "msg": "Comment successfully deleted.",
    "comment": {
        "id": 6,
        "post_id": 3,
        "user_id": 1,
        "content": "This is Dorothy, commenting on her own post!",
        "createdAt": "2023-12-12T06:22:18.832Z",
        "updatedAt": "2023-12-12T06:22:18.832Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T04:26:45.678Z",
            "updatedAt": "2023-12-12T04:26:45.678Z"
        },
        "Post": {
            "id": 3,
            "user_id": 1,
            "content": "Dorothy was here again! This is my first post update.",
            "createdAt": "2023-12-12T05:53:23.851Z",
            "updatedAt": "2023-12-12T05:54:38.659Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "Comment ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Comment not found. No comment with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

# UserGame

## POST UserGame - Bearer token needed

Logged-in user can create highscore for each available games. Stores the connection between user and game.

**Endpoint:** `POST /userGame`

### Request Body

|Parameter     |Type    |Description
|-             |-       |-
|`game_id`     |integer |The highscore FK that points to the owner game.

**Example:**
```json
{
  "game_id": 1,
}
```

### Response JSON

#### 201 OK - User game successfully created

```json
{
    "status": 201,
    "msg": "User game successfully created.",
    "userGame": {
        "id": 1,
        "user_id": 1,
        "game_id": 1,
        "high_score": 0,
        "createdAt": "2023-12-12T08:59:34.710Z",
        "updatedAt": "2023-12-12T08:59:34.710Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T08:59:05.068Z",
            "updatedAt": "2023-12-12T08:59:05.068Z"
        },
        "Game": {
            "id": 1,
            "name": "Galactic Dash",
            "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
            "createdAt": "2023-12-12T08:58:55.227Z",
            "updatedAt": "2023-12-12T08:58:55.227Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Game ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Game not found. No game with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET UserGame - Bearer token needed

Retrieves all games in a specific user.

**Endpoint:** `GET /userGame/:user_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`user_id`     |integer|The user id from a react page/view. Each page represent one user.

**Example:**
```json
{
  "user_id": 3,
}
```

### Response JSON

#### 201 OK - Games successfully retrieved

```json
{
    "status": 200,
    "msg": "Games successfully retrieved.",
    "games": [
        {
            "id": 1,
            "user_id": 1,
            "game_id": 1,
            "high_score": 0,
            "createdAt": "2023-12-12T08:59:34.710Z",
            "updatedAt": "2023-12-12T08:59:34.710Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T08:59:05.068Z",
                "updatedAt": "2023-12-12T08:59:05.068Z"
            },
            "Game": {
                "id": 1,
                "name": "Galactic Dash",
                "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
                "createdAt": "2023-12-12T08:58:55.227Z",
                "updatedAt": "2023-12-12T08:58:55.227Z"
            }
        }
    ]
}
```

#### 400

```json
{
    "error": {
        "msg": "User ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "User not found. No user with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET UserGame getUsers - Bearer token needed

Retrieves all users in a specific user.

**Endpoint:** `GET /userGame/user/:game_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`game_id`     |integer|The game id from a react page/view. Each page represent one game.

**Example:**
```json
{
  "game_id": 3,
}
```

### Response JSON

#### 201 OK - Users successfully retrieved

```json
{
    "status": 200,
    "msg": "Users successfully retrieved.",
    "users": [
        {
            "id": 1,
            "user_id": 1,
            "game_id": 1,
            "high_score": 0,
            "createdAt": "2023-12-12T08:59:34.710Z",
            "updatedAt": "2023-12-12T08:59:34.710Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T08:59:05.068Z",
                "updatedAt": "2023-12-12T08:59:05.068Z"
            },
            "Game": {
                "id": 1,
                "name": "Galactic Dash",
                "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
                "createdAt": "2023-12-12T08:58:55.227Z",
                "updatedAt": "2023-12-12T08:58:55.227Z"
            }
        }
    ]
}
```

#### 400

```json
{
    "error": {
        "msg": "Game ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Game not found. No game with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## PATCH UserGame content - Bearer token needed

System can edit logged-in user high score for their associated game. Edit is based on the game user connection id. Passed via query params.

**Endpoint:** `PATCH /userGame/:id`

### Request Params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The connection ID.

**Example:**
```json
userGame/1
```

### Request Body

|Parameter        |Type      |Description
|-                |-         |-
|`high_score`     |integer   |The user highscore on one game.

**Example:**
```json
{
  "high_score": 100,
}
```

### Response JSON

#### 200 OK - User game high score successfully updated

```json
{
    "status": 200,
    "msg": "User game high score successfully updated.",
    "chat": {
        "id": 1,
        "user_id": 1,
        "game_id": 1,
        "high_score": 100,
        "createdAt": "2023-12-12T08:59:34.710Z",
        "updatedAt": "2023-12-12T09:18:53.666Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T08:59:05.068Z",
            "updatedAt": "2023-12-12T08:59:05.068Z"
        },
        "Game": {
            "id": 1,
            "name": "Galactic Dash",
            "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
            "createdAt": "2023-12-12T08:58:55.227Z",
            "updatedAt": "2023-12-12T08:58:55.227Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "User Game ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "User game not found. No user game with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE UserGame content - Bearer token needed

Logged-in user can delete their game record. Delete is based on the connection id. Passed via query params.

**Endpoint:** `DELETE /userGame/:id`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The connection ID.

**Example:**
```json
userGame/1
```

### Response JSON

#### 200

```json
{
    "status": 200,
    "msg": "User game successfully deleted.",
    "user": {
        "id": 1,
        "user_id": 1,
        "game_id": 1,
        "high_score": 100,
        "createdAt": "2023-12-12T08:59:34.710Z",
        "updatedAt": "2023-12-12T09:18:53.666Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T08:59:05.068Z",
            "updatedAt": "2023-12-12T08:59:05.068Z"
        },
        "Game": {
            "id": 1,
            "name": "Galactic Dash",
            "description": "Your mission: collaborate with fellow players to navigate through swarms of asteroids and hostile alien encounters.",
            "createdAt": "2023-12-12T08:58:55.227Z",
            "updatedAt": "2023-12-12T08:58:55.227Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "User Game ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "User game not found. No user game with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

# Gift

## POST Gift - Bearer token needed

Logged-in user can create gift. Gift is a connection with a drink attached to it, connection between users.

**Endpoint:** `POST /gift`

### Request Body

|Parameter          |Type    |Description
|-                  |-       |-
|`recipient_id`     |integer |The one receiving the gift.
|`drink_id`         |integer |FK that points to drinks.

**Example:**
```json
{
  "recipient_id": 1,
  "drink_id": 1,
}
```

### Response JSON

#### 201 OK - Gift successfully created

```json
{
    "status": 201,
    "msg": "Gift successfully created.",
    "gift": {
        "id": 1,
        "sender_id": 2,
        "recipient_id": 1,
        "drink_id": 1,
        "createdAt": "2023-12-12T09:44:41.056Z",
        "updatedAt": "2023-12-12T09:44:41.056Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T08:59:05.068Z",
            "updatedAt": "2023-12-12T08:59:05.068Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T08:58:55.208Z",
            "updatedAt": "2023-12-12T08:58:55.208Z"
        }
    }
}
```

#### 400

```json
{
    "error": {
        "msg": "Recipient ID must be an integer.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "Drink ID must be an integer.",
        "status": 400
    }
}
```

```json
{
    "error": {
        "msg": "You cannot send gift to yourself!",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Recipient user not found. No user with the ID -1 exists.",
        "status": 404
    }
}
```

```json
{
    "error": {
        "msg": "Drink not found. No drink with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Gift - Bearer token needed

Retrieves all gifts in a specific user. (History of sent gifts)

**Endpoint:** `GET /gift/:user_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`user_id`     |integer|The user id from a react page/view. Each page represent one user.

**Example:**
```json
{
  "user_id": 2,
}
```

### Response JSON

#### 201 OK - Sent Gifts successfully retrieved

```json
{
    "status": 200,
    "msg": "Sent Gifts successfully retrieved.",
    "gifts": [
        {
            "id": 3,
            "sender_id": 2,
            "recipient_id": 1,
            "drink_id": 1,
            "createdAt": "2023-12-12T10:12:49.494Z",
            "updatedAt": "2023-12-12T10:12:49.494Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T08:59:05.068Z",
                "updatedAt": "2023-12-12T08:59:05.068Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T08:58:55.208Z",
                "updatedAt": "2023-12-12T08:58:55.208Z"
            }
        },
        {
            "id": 2,
            "sender_id": 2,
            "recipient_id": 2,
            "drink_id": 1,
            "createdAt": "2023-12-12T09:50:20.472Z",
            "updatedAt": "2023-12-12T09:50:20.472Z",
            "User": {
                "id": 2,
                "username": "Alma Armas",
                "email": "Alma@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T09:41:57.866Z",
                "updatedAt": "2023-12-12T09:41:57.866Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T08:58:55.208Z",
                "updatedAt": "2023-12-12T08:58:55.208Z"
            }
        },
        {
            "id": 1,
            "sender_id": 2,
            "recipient_id": 1,
            "drink_id": 1,
            "createdAt": "2023-12-12T09:44:41.056Z",
            "updatedAt": "2023-12-12T09:44:41.056Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T08:59:05.068Z",
                "updatedAt": "2023-12-12T08:59:05.068Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T08:58:55.208Z",
                "updatedAt": "2023-12-12T08:58:55.208Z"
            }
        }
    ]
}
```

#### 400

```json
{
    "error": {
        "msg": "User ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "User sender not found. No user sender with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Gift receiver - Bearer token needed

Retrieves all gifts in a specific user. (History of received gifts)

**Endpoint:** `GET /receiver/:recipient_id`

### Request Param

|Parameter     |Type   |Description
|-             |-      |-
|`user_id`     |integer|The id from a react page/view. Each page represent one user.

**Example:**
```json
{
  "user_id": 3,
}
```

### Response JSON

#### 201 OK - Received gifts successfully retrieved

```json
{
    "status": 200,
    "msg": "Received gifts successfully retrieved.",
    "gifts": [
        {
            "id": 3,
            "sender_id": 2,
            "recipient_id": 1,
            "drink_id": 1,
            "createdAt": "2023-12-12T10:12:49.494Z",
            "updatedAt": "2023-12-12T10:12:49.494Z",
            "User": {
                "id": 1,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T08:59:05.068Z",
                "updatedAt": "2023-12-12T08:59:05.068Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T08:58:55.208Z",
                "updatedAt": "2023-12-12T08:58:55.208Z"
            }
        }
    ]
}
```

#### 400

```json
{
    "error": {
        "msg": "User ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "User recipient not found. No user recipient with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Gift - Bearer token needed

Logged-in user can delete their gift. Delete is based on the gift id. Passed via query params.

**Endpoint:** `DELETE /gift/:id`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The gift ID.

**Example:**
```json
gift/1
```

### Response JSON

#### 200 OK - Gift successfully deleted

```json
{
    "status": 200,
    "msg": "Gift successfully deleted.",
    "gift": {
        "id": 1,
        "sender_id": 2,
        "recipient_id": 1,
        "drink_id": 1,
        "createdAt": "2023-12-12T09:44:41.056Z",
        "updatedAt": "2023-12-12T09:44:41.056Z",
        "User": {
            "id": 1,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T08:59:05.068Z",
            "updatedAt": "2023-12-12T08:59:05.068Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T08:58:55.208Z",
            "updatedAt": "2023-12-12T08:58:55.208Z"
        }
    }
}
```

### 400

```json
{
    "error": {
        "msg": "User Gift ID must be an integer.",
        "status": 400
    }
}
```

#### 404

```json
{
    "error": {
        "msg": "Gift not found. No gift with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

# UserDrink

## POST Drink - Bearer token needed

Logged-in user can buy drink.

**Endpoint:** `POST /userDrink`

### Request Body

|Parameter          |Type    |Description
|-                  |-       |-
|`drink_id`         |integer |FK that points to drinks.

**Example:**
```json
{
  "drink_id": 1,
}
```

### Response JSON

#### 201 OK - User drink successfully created 

```json
{
    "status": 201,
    "msg": "User drink successfully created.",
    "userDrink": {
        "id": 1,
        "user_id": 4,
        "drink_id": 1,
        "createdAt": "2023-12-12T13:46:10.355Z",
        "updatedAt": "2023-12-12T13:46:10.355Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T12:32:28.385Z",
            "updatedAt": "2023-12-12T12:32:28.385Z"
        }
    }
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "Drink ID must be an integer.",
        "status": 400
    }
}
```

#### 404 Not Found

```json
{
    "error": {
        "msg": "Drink not found. No drink with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## GET Drink - Bearer token needed

Retrieves all drinks in a specific user. (List of bought drinks)

**Endpoint:** `GET /userDrink`

### Response JSON

#### 201 OK - User drinks successfully retrieved

```json
{
    "status": 200,
    "msg": "User drinks successfully retrieved.",
    "userDrinks": [
        {
            "id": 2,
            "user_id": 4,
            "drink_id": 1,
            "createdAt": "2023-12-12T13:50:53.510Z",
            "updatedAt": "2023-12-12T13:50:53.510Z",
            "User": {
                "id": 4,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T13:09:56.441Z",
                "updatedAt": "2023-12-12T13:09:56.441Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T12:32:28.385Z",
                "updatedAt": "2023-12-12T12:32:28.385Z"
            }
        },
        {
            "id": 1,
            "user_id": 4,
            "drink_id": 1,
            "createdAt": "2023-12-12T13:46:10.355Z",
            "updatedAt": "2023-12-12T13:46:10.355Z",
            "User": {
                "id": 4,
                "username": "Dorothy Haze",
                "email": "Dorothy@gmail.com",
                "profile_picture": null,
                "bio": null,
                "credit": 0,
                "createdAt": "2023-12-12T13:09:56.441Z",
                "updatedAt": "2023-12-12T13:09:56.441Z"
            },
            "Drink": {
                "id": 1,
                "name": "Bad Touch",
                "description": "We're nothing but mammals after all.",
                "price": 250,
                "createdAt": "2023-12-12T12:32:28.385Z",
                "updatedAt": "2023-12-12T12:32:28.385Z"
            }
        }
    ]
}
```

#### 401

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

## DELETE Drink - Bearer token needed

Logged-in user can delete their drink. Delete is based on the user drink id. Passed via query params.

**Endpoint:** `DELETE /drink/:id`

### Request params

|Parameter        |Type      |Description
|-                |-         |-
|`id`             |integer   |The user drink ID.

**Example:**
```json
userDrink/1
```

### Response JSON

#### 200 OK - User drink successfully deleted

```json
{
    "status": 200,
    "msg": "User drink successfully deleted.",
    "user": {
        "id": 1,
        "user_id": 4,
        "drink_id": 1,
        "createdAt": "2023-12-12T13:46:10.355Z",
        "updatedAt": "2023-12-12T13:46:10.355Z",
        "User": {
            "id": 4,
            "username": "Dorothy Haze",
            "email": "Dorothy@gmail.com",
            "profile_picture": null,
            "bio": null,
            "credit": 0,
            "createdAt": "2023-12-12T13:09:56.441Z",
            "updatedAt": "2023-12-12T13:09:56.441Z"
        },
        "Drink": {
            "id": 1,
            "name": "Bad Touch",
            "description": "We're nothing but mammals after all.",
            "price": 250,
            "createdAt": "2023-12-12T12:32:28.385Z",
            "updatedAt": "2023-12-12T12:32:28.385Z"
        }
    }
}
```

#### 400 Bad Request

```json
{
    "error": {
        "msg": "User drink ID must be an integer.",
        "status": 400
    }
}
```

#### 404 Not Found

```json
{
    "error": {
        "msg": "User drink not found. No user drink with the ID -1 exists.",
        "status": 404
    }
}
```

#### 401 Unauthorized

```json
{
    "error": {
        "msg": "Unauthorized. A valid bearer token is required for access.",
        "status": 401
    }
}
```

