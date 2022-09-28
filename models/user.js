const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        let req = /[^a-zA-Z]/;
        return !req.test(value);
      },
      message: "please use only alphabet",
    },
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        let req = /^[\w\.]+@[a-z]+\.[\w]{2,3}/;
        return req.test(value);
      },
      message: "please use right email pattern",
    },
  },
  password: {
    type: String,
    required: true,
    validate: function (val) {
      let reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/;
      return reg.test(val);
    },
    message: "please use the valid password",
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
validate:function(val){
  let reg=/^[0-9]{10}$/
 return reg.test(val)
},message:"please use right mobile no"
  },
  address: {
    type: String,
    required: true,
  },
  tokens: [{ token: { type: String } }],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
