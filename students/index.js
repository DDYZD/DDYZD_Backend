const { Sequelize } = require("sequelize");

const User = require("../models/index").User;

const min = 100000;
const max = 999999;
let i = 0;

function getRandomCode(min, max) {
        const code = Math.floor(Math.random() * (max - min + 1)) + min;
        return code;
}

const userName = [{name: '박상우', classNo: '1405'}, {name: '유명철', classNo: '2213'}];

function putCode(){
    const user = User.findAll();
    if(user) return 0;
    for(let i = 0; i < userName.length; i++)
    {
        let randomCode = getRandomCode(min, max);
        userName[i].code = randomCode;
    }
    User.bulkCreate(userName);
}

const isEmpty = () => {
    putCode();
}

module.exports = {
    isEmpty
}