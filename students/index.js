const User = require("../models/index").User;
const isEmpty = () => {
    const users = User.findAll();
    if(!users)
    {
           
    }
    else
    {
        message: "users table이 비어있지 않습니다."
    }
}

module.exports = {
    isEmpty
}