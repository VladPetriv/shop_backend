# shop_backend

Example of backend side for online store
## Technology
NodeJS,Postgresql,Express,JWT,Bcrypt,Sequelize,Jest,Supertest



## Installation

```bash
# make sure postgresql is installed on your system

# Clone the repo and install dependencies
$ git clone https://github.com/VladPetriv/shop_backend
$ cd shop_backend
$ npm install
#After this you need to create .env file with fields like:[PORT,DB_NAME,DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,SECRET_KEY,IMAGE_PATH]
```



## API Endpoints
This is a RESTful API which exposes basic CRUD methods. All communication
with the server (requests and responses) must be in JSON.
```

User 
POST /api/registration/                       Register on site
POST /api/login/                              Login to site
GET  /api/auth/                               Check user status


Type
GET  /api/type/items/                         Get a list of all types
POST /api/type/create/                        Create a new type
GET  /api/type/items/[type_id]/               Get a specific type
PUT  /api/type/items/[type_id]/               Update a type
DELETE /api/type/items/[type_id]/             Delete a type


Brand
GET  /api/brand/items/                        Get a list of all brands
POST /api/brand/create/                       Create a new brand
GET  /api/brand/items/[brand_id]              Get a specific brand
PUT  /api/brand/items/[brand_id]              Update a brand
DELETE /api/brand/items/[brand_id]            Delete a brand


Product
GET  /api/product/items/                      Get a list of all products
POST /api/product/create/                     Create a new product
GET  /api/productct/items/[product_id]        Get a specific product
PUT  /api/product/items/[product_id]          Update a product
DELETE /api/product/items/[product_id]        Delete a product
 

Cart  Product
GET  /api/cart_product/cart_id/items/         Get a list of all cart products
POST /api/cart_product/cart_id/create         Create a new cart product
GET  /api/cart_product/cart_id/items/[cart_product_id]   Get a specific cart product
PUT  /api/cart_product/cart_id/items/[cart_product_id]          Update a cart product
DELETE /api/cart_product/cart_id/items/[cart_product_id]        Delete a cart product
 

```

## Usage
Starting the server:
```bash
# To start the server make sure you're in the 'shop_backend'
# root directory and run for development:
$ npm run dev 
# root directory and run for production:
$ npm run start 

```

## Running the test suite
```bash
# Make sure you're in the shop_backend root directory and run:
$ npm install --dev
$ npm test
```


