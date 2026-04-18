# 🌱 Urban Farming Platform — Backend API

> **Junior Backend Developer Assignment Submission**  
> **Tech Stack:** Node.js, Express, TypeScript, Prisma, PostgreSQL (Neon)

---

##  Quick Links

- **Live API:** https://urban-farming-backend.vercel.app
- **Source Code:** https://github.com/asadatik/Urban_Farming_backend
- **Postman Collection:** `Urban_Farming_Postman.json` (Included in root folder)

---

##  Key Features

-  **Role-Based Access Control (RBAC):** Admin, Vendor, Customer with protected routes and role validation
-  **Produce Marketplace:** Search, filter by category, price range sorting
-  **Garden Rental System:** Location-based rental space for urban farming users
-  **Order System:** Secure stock management using Prisma Transactions
-  **Plant Lifecycle Tracking:** Seedling → Growing → Harvested flow management
-  **Security:** JWT auth, bcrypt password hashing, rate limiting protection

---

##  Performance & Design Highlights

- **Prisma Indexing:** Optimized frequently queried fields (`email`, `category`, `price`, `location`)
- **Parallel Processing:** Used `Promise.all` for faster aggregated responses
- **Standardized API Response Format:** Consistent structure across all endpoints

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": [],
  "meta": {}
}
```
Validation Layer: Strict request validation using Zod before database operations
🏗️ Folder Structure
src/
├── app/
│   ├── modules/        # Feature modules (Auth, User, Produce, Order, etc.)
│   ├── middlewares/    # Auth, Validation, Rate Limit, Error Handling
│   └── utils/          # Prisma singleton, helpers, AppError class
├── config/             # Environment configuration
├── app.ts              # Express app setup
└── server.ts           # Entry point
🚀 Setup & Run Instructions
1. Install Dependencies
npm install
2. Setup Environment
cp .env.example .env

Then configure your database URL and secrets.

3. Prisma Setup
npx prisma generate
npx prisma db push
4. Seed Database
npm run seed
5. Run Server
npm run dev
 Seeder Data Includes
1 Admin → admin@urbanfarming.com / Admin@1234
1 Customer → customer@urbanfarming.com / Customer@1234
10 Vendors with sustainability profiles
100+ Produce items across categories
20 Community posts
15 Sample orders
 Tech Stack
Node.js
Express.js
TypeScript
Prisma ORM
PostgreSQL (Neon)
Zod Validation
JWT Authentication
Bcrypt Security
Developer

Asadujjaman Atik
Junior Backend Developer Task Submission
