
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
