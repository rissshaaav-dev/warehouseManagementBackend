# Inventory Management API Documentation

## Overview

The Inventory Management API provides a robust system to manage products, warehouses, and stock efficiently. It includes authentication and authorization for admins to perform restricted actions.

## Features

- User Authentication & Authorization (JWT-based)
- Product Management (CRUD operations)
- Warehouse Management (CRUD operations)
- Stock Management (Track stock levels in warehouses)
- Admin-Only Operations (Product, warehouse, and stock modifications)
- Public API Access (For retrieving product and warehouse data)
- Error Handling & Validation

## Installation

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

### Steps to Set Up

1. Clone the repository:

git clone https://github.com/rissshaaav-dev/warehouseManagementBackend.git
cd inventory-management

2. Install dependencies:

npm install

3. Create a `.env` file and configure environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Start the server:

npm start

The API will be running at `http://localhost:5000/api`.

## API Endpoints

### Products

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/products` | Create a new product | Admin Only |
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get a product by ID | Public |
| PUT | `/api/products/:id` | Update product details | Admin Only |
| DELETE | `/api/products/:id` | Delete a product | Admin Only |

### Warehouses

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/warehouses` | Create a new warehouse | Admin Only |
| GET | `/api/warehouses` | Get all warehouses | Public |
| GET | `/api/warehouses/:id` | Get a warehouse by ID | Public |
| PUT | `/api/warehouses/:id` | Update warehouse details | Admin Only |
| DELETE | `/api/warehouses/:id` | Delete a warehouse | Admin Only |

### Stock Management

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/stocks` | Add stock to a warehouse | Admin Only |
| GET | `/api/stocks/:productId/:warehouseId` | Get stock details for a product in a warehouse | Public |
| PUT | `/api/stocks/:id` | Update stock quantity | Admin Only |
| DELETE | `/api/stocks/:id` | Delete stock record | Admin Only |

## Authentication

This API uses JWT-based authentication. To access protected routes, include the token in the request headers:

Authorization: Bearer YOUR_ACCESS_TOKEN

## Error Handling

All errors return JSON responses with appropriate HTTP status codes:

{
  "message": "Error message here"
}

## Authorization Setup in Swagger UI

1. Open Swagger UI at `http://localhost:5000/api-docs`
2. Click on the **Authorize** button (🔑)
3. Enter your token in the format: `Bearer YOUR_ACCESS_TOKEN`
4. Click **Authorize** and test protected routes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, feel free to reach out!
