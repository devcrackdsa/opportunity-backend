Before running the app

creat an .env file

in the .env file=>

1=> provide mongodb conncetion string in variable "connection_string"

2=>provide salt for password hashing in variable named "salt"

you can generate salt using-
    const bcrypt = require('bcrypt');
    const salt = bcrypt.genSaltSync(15);

3=> Provide jwt secret key in variable named "jwt_secret"
    jwt secret key can be anything


    TO DO:
    Change Schema as required
    Add update and delete operations for job items
