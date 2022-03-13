# shop_backend

Example of backend side for online store

## Technology

NodeJS,Postgresql,Express,JWT,Sequelize,Jest,Supertest

## Installation

```bash
# make sure postgresql is installed on your system

# Clone the repo and install dependencies
$ git clone https://github.com/VladPetriv/shop_backend
$ cd shop_backend
$ docker-compose build
$ docker-compose up
#Before this you need to create .env file with fields:[
#PORT,- port for application
#POSTGRES_NAME - database name
#POSTGRES_USER - database user
#POSTGRES_PASSWORD - database password
#POSTGRES_HOST - database host
#POSTGRES_PORT - database port
#SECRET_KEY - secrete key for json web token
#IMAGE_PATH - path to image for test suite
#]

```

## API Endpoints

``` bash
User
POST /api/registration/                       Register on site
POST /api/login/                              Login to site
POST /api/updateUser                          Update user fields
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
DELETE /api/cart_product/cart_id/items/[cart_product_id]        Delete a cart product


Rating
GET /api/rating/items/[productId]             Get all rating for product
GET /api/rating/item/[productId]              Get own rating for product
POST /api/rating/items/[productId]            Create rating for product
DELETE /api/rating/items/[productId]          Delete own rating for product
PUT /api/rating/item/[productId]              Update own rating for product

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

Start server with docker in development mode:

```bash
# Make sure that docker installed on your system
$ docker-compose build
$ docker-compose up 
```

## Running the test suite

```bash
# You can run the test only locally.There are no docker image for it
# Before start run the tests please switch the database name in .env file
# Make sure you're in the shop_backend root directory and run:
$ npm install --dev
$ npm test
```
