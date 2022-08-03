# shop_backend

## Description

shop_backend - is backend side for online store.

## Technology

NodeJS, PostgreSQL, Express, JWT, Sequelize, Jest, Supertest

## API Endpoints

```bash
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

### Before start you need to create .env file with this fields:

- PORT - port for application
- POSTGRES_NAME - database name
- POSTGRES_USER - database user
- POSTGRES_PASSWORD - database password
- POSTGRES_HOST - database host
- POSTGRES_PORT - database port
- SECRET_KEY - secret key for json web token
- IMAGE_PATH - path to image for test suites [use - ./image.jpg]

### Starting the server:

```bash
# install dependencies:
$ npm install

# run in development mode:
$ npm run dev

# run in production mode:
$ npm run start
```

### Start server with docker-compose in development mode:

```bash
$ docker-compose build

$ docker-compose up
```

### Running the test suite

```bash
# Before start run the tests please switch the database name in .env file
$ npm install --dev

$ npm test
```
