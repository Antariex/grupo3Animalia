const Category = require('./models/Category');
const Order_item = require('./models/Ordeer_item');
const Permission = require('./models/Permission');
const Product = require('./models/Product');
const Subcategory = require('./models/Subcategory');
const User = require('./models/User');


//https://www.youtube.com/watch?v=ocysQ07G4PQ
//y
//https://www.youtube.com/watch?v=wgLo_0FL0yc


//Uno a muchos o 1 a N
//Un Permission puede tener muchos Users
Permission.hasMany(User, {as: "User", foreignKey: "user_id"});
User.belongsTo(Permission, {as: "User"})
//Un User puede tener muchos Order_item
User.hasMany(Order_item, {as: "Order_item", foreignKey: "order_item_id"});
Order_item.belongsTo(User, {as: "Order_item"})
//Un Product puede tener muchos Order_item
Product.hasMany(Order_item, {as: "Order_item", foreignKey: "order_item_id"});
Order_item.belongsTo(Product, {as: "Order_item"})
//Una Category puede tener muchos Products
//Se añade una FK Category a la tabla Products. A revisar estos nombres!!
Category.hasMany(Product, {as: "Product", foreignKey: "product_id"});
Product.belongsTo(Category, {as: "product"})
//Una subategory puede tener muchos Products
Subcategory.hasMany(Product, {as: "Product", foreignKey: "product_id"});
Product.belongsTo(Subcategory, {as: "product"})