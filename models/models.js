const User = require('./userModel.js');
const Cart = require('./cartModel.js');
const CartProduct = require('./cartProductModel.js');
const Product = require('./productModel.js');
const Type = require('./typeModel.js');
const Rating = require('./ratingModels.js');
const Brand = require('./brandModel.js');
const TypeBrand = require('./typeBrandModel.js');
//Product relation
Product.belongsTo(Brand);
Product.belongsTo(Type);
Product.hasMany(Rating);
Product.hasMany(CartProduct);

//Brand relation
Brand.hasMany(Product);
Brand.belongsToMany(Type, { through: TypeBrand });

//Cart relation
Cart.belongsTo(User);
Cart.hasMany(CartProduct);

//Rating relation
Rating.belongsTo(User);
Rating.belongsTo(Product);

//Type relation
Type.hasMany(Product);
Type.belongsToMany(Brand, { through: TypeBrand });

//User relation
User.hasOne(Cart);
User.hasMany(Rating);

module.exports = {
  User,
  Cart,
  CartProduct,
  Product,
  Type,
  Rating,
  Brand,
  TypeBrand,
};
