import bcrypt from "bcryptjs";
const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Hriday",
        email: "hriday@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Suraj",
        email: "suraj@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
   
]

export default users;