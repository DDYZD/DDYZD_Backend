const User = require("../models/index").User;
const isEmpty = async () => {
    const users = await User.findAll();
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