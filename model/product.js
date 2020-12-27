var mongoose=require("mongoose");
const Joi = require("@hapi/joi");
var productSchema=mongoose.Schema({

    name:String,
    address:String,
    dresses:String,
    size:String
});

var Product=mongoose.model("product",productSchema);

function validateProduct(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      address: Joi.string().min(3).max(20).required(),
      dresses: Joi.number().min(0).required(),
      size: Joi.string().min(3).max(7).required()

    });
    return schema.validate(data, { abortEarly: false });
  }
module.exports.Product=Product;
module.exports.validate = validateProduct;