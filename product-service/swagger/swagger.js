// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "product-service-natallia-adziyanava",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get.products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        },
        "count": {
          "title": "Product.count",
          "type": "number"
        },
        "image": {
          "title": "Product.image",
          "type": "string"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "price",
        "count",
        "image"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "ProductRequest": {
      "properties": {
        "title": {
          "title": "ProductRequest.title",
          "type": "string"
        },
        "description": {
          "title": "ProductRequest.description",
          "type": "string"
        },
        "price": {
          "title": "ProductRequest.price",
          "type": "number"
        },
        "count": {
          "title": "ProductRequest.count",
          "type": "number"
        },
        "image": {
          "title": "ProductRequest.image",
          "type": "string"
        }
      },
      "required": [
        "title",
        "description",
        "price",
        "count",
        "image"
      ],
      "additionalProperties": false,
      "title": "ProductRequest",
      "type": "object"
    }
  },
  "securityDefinitions": {},
  "basePath": "/dev"
};