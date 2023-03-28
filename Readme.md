
# Opportunity-Backend




## Deployment on your local machine

1. Clone the repo
2. Open it in any ide(VS Code) 
3. Before running the app

        Create an .env file and the content of .env file will be:-

        1. Provide mongodb connection string in variable "connection_string"

        2. Provide salt for password hashing in variable named "salt".

        For generating the Salt you can use:-

        const bcrypt = require('bcrypt'); 
        const salt = bcrypt.genSaltSync(15);

        And then after, copy the salt and store it in the variable named salt.

        3. Provide jwt secret key in variable named "jwt_secret" jwt secret key can be anything.

## Screenshot of .env file

![App Screenshot](https://github.com/RajavJain/opportunity-backend/blob/master/static/img/1.png?raw=true)
        
        

4. Execute npm i
5. Execute npm start 


# API Reference

### Create new Admin

    1.Disable auth from routes/admin.js while creating first Admin
    2.If you want to create IInd admin again then take out the token from Database and pass it into the Bearer section in auth.(As it possible to make new admin from any existing admin only).
    3.Enable the auth from routes/admin.js

```http
  POST /admin/newadmin
```

| Parameter     | Type     | 
| :--------     | :------- | 
| `name`        | `string` | 
| `password`    | `string` | 
| `email`       | `string` | 

### Screenshots for reference:-

#### -All ThunderClient Collections

![App Screenshot](https://raw.githubusercontent.com/RajavJain/opportunity-backend/5ebecdd88fe200c575d02de7d01d27f75831c979/static/img/ThunderClient.png)

#### -Response of  POST /admin/newadmin

![App Screenshot](https://raw.githubusercontent.com/RajavJain/opportunity-backend/5ebecdd88fe200c575d02de7d01d27f75831c979/static/img/2.png)

#### -Bearer Token 

![App Screenshot](https://raw.githubusercontent.com/RajavJain/opportunity-backend/5ebecdd88fe200c575d02de7d01d27f75831c979/static/img/3.png)


&nbsp;


### Login of Admin

    1. Enter the details of admin user.
    2. Copy the token from it from response body.

```http
  POST /admin/login
```

| Parameter     | Type     | 
| :--------     | :------- | 
| `password`    | `string` | 
| `email`       | `string` | 

### Screenshot for reference:-

![App Screenshot](https://github.com/RajavJain/opportunity-backend/blob/master/static/img/4.png?raw=true)


