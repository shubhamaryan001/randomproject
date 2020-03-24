const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

h_userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated: Date
});


// virtual field

h_userSchema.virtual("password")
.set(function(password){
    // create a variable _password
    this._password = password
    // Generate a time stamp
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//methods

h_userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password) return("");
        try{
            return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
        }catch(err){
            return "" ;
        }
    }
}

module.exports = mongoose.model("h_User", h_userSchema);