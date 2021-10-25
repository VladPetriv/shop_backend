import User from './userModel.js';
import Cart from './cartModel.js';
import CartProduct from './cartProductModel.js';
import Product from './productModel.js';
import Type from './typeModel.js';
import Rating from './ratingModels.js';
import Brand from './brandModel.js';
import TypeBrand from './typeBrandModel.js';

//Product relation
Product.belongsTo(Brand);
Product.belongsTo(Type);
Product.hasMany(Rating);
Product.hasMany(CartProduct, { as: 'cart_products' });

//Brand relation
Brand.hasMany(Product);
Brand.belongsToMany(Type, { through: TypeBrand });

//Cart relation
Cart.belongsTo(User);
Cart.hasMany(CartProduct, { as: 'cart_products' });

//Cart product realation
CartProduct.belongsTo(Cart, { as: 'cart' });
CartProduct.belongsTo(Product, { as: 'product' });

//Rating relation
Rating.belongsTo(User);
Rating.belongsTo(Product);

//Type relation
Type.hasMany(Product);
Type.belongsToMany(Brand, { through: TypeBrand });

//User relation
User.hasOne(Cart);
User.hasMany(Rating);

export { User, Cart, CartProduct, Product, Type, Rating, Brand, TypeBrand };
