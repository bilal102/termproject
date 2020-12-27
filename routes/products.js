var express = require('express');
var router = express.Router();
const validateProduct = require("../middlewares/validateProduct");
var {Product}= require("../model/product");
var checkSessionAuth=require("../middlewares/checkSessionAuth");
/* GET products page. */
router.get('/', checkSessionAuth, async function(req, res, next) {
  let products=await Product.find();
  //console.log(products);
  //console.log(req.session);
  res.render("products/list", { title:"YOUR ORDER!!!", products});
});

router.get('/add', checkSessionAuth,async function(req, res, next) {
  res.render("products/add");
});
//store data in database
router.post('/add',validateProduct, async function(req, res, next) {
  let product=new Product(req.body);
  await product.save();
  res.redirect("/products");
});

//delete product
router.get("/delete:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

// Fetching data from form
router.get('/edit/:id', async function(req, res, next) {
  let product=await Product.findById(req.params.id);
  res.redirect("/products");
});
// Add to cart
router.get('/cart:id', async function(req, res, next) {
  let product=await Product.findById(req.params.id);
  let cart=[];
  if(req.cookies.cart) cart= req.cookies.cart;
  cart.push(product);
  res.cookie("cart",cart);
  res.redirect("/products");
});
// Remove to cart
router.get('/cart/remove:id', async function(req, res, next) {
  let cart=[];
  if(req.cookies.cart) cart= req.cookies.cart;
  cart.splice(
       cart.findIndex((c)=> c._id == req.params.id),1
  );
  res.cookie("cart",cart);
  res.redirect("/cart");
});
router.get('/edit:id', async function(req, res, next) {
  let product=await Product.findById(req.params.id);
  res.render("products/edit",{product});
});

router.post('/edit:id', validateProduct, async function(req, res, next) {
  let product=await Product.findById(req.params.id);
  product.name=req.body.name;
  product.address=req.body.address;
  product.dresses=req.body.dresses;
  productsize=req.body.size;
  await product.save();
  res.redirect("/products");
});

module.exports = router;
