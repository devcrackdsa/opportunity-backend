const bcrypt = require('bcrypt');
// const salt = bcrypt.genSaltSync(15);
// console.log(salt)
async function hash(password){
    let res = await bcrypt.hash(password, process.env.salt)
    return res
}
async function compare(pass,hash1){
    res = await bcrypt.compare(pass, hash1);

    return res;

}
module.exports= {hash,compare}