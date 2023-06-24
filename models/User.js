const { model, Schema } = require('mongoose');

// the schema definition of an attribute, we don't use ! here because graphql is a 'middleman'
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdat: String
})


module.exports = model('User', userSchema);