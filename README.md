#  Urban Farming Platform — Backend API

> Junior Backend Developer Assignment Submission  
> Node.js · Express · TypeScript · Prisma · PostgreSQL

---

##  Quick Links

- **Live API:** https://urban-farming-backend.vercel.app
- **GitHub:** https://github.com/asadatik/Urban_Farming_backend

---

##  What This Platform Does

A RESTful API connecting urban farmers (Vendors), gardening enthusiasts (Customers), and platform admins. Think of it as a marketplace where vendors sell fresh produce, rent out garden spaces, and customers can track their plants in real-time.

### Core Features

- **Authentication & RBAC** — 3 roles (Admin, Vendor, Customer) with JWT + bcrypt
- **Produce Marketplace** — Search, filter by category/price, paginated listings
- **Garden Rental System** — Location-based space rentals for urban farming
- **Order Management** — Transactional stock updates, order tracking
- **Plant Lifecycle Tracker** — Monitor plants from seedling to harvest
- **Community Forum** — Posts with tags and search
- **Sustainability Certs** — Vendors submit, admins approve/reject
- **Rate Limiting** — Protection on auth routes (10 requests/15 min)

---

##  Project Structure

```
src/
├── config/              # Environment configuration
├── app/
│   ├── middlewares/     # Auth, validation, rate limiting, error handling
│   ├── utils/           # Helpers (JWT, bcrypt, pagination, Prisma client)
│   ├── modules/         # Feature modules
│   │   ├── auth/        # Signup, login
│   │   ├── user/        # User management (Admin)
│   │   ├── vendor/      # Vendor profiles
│   │   ├── produce/     # Marketplace
│   │   ├── rental/      # Garden spaces
│   │   ├── order/       # Order processing
│   │   ├── community/   # Forum posts
│   │   ├── certification/ # Sustainability certs
│   │   └── tracking/    # Plant tracking
│   └── routes/          # Master router
├── app.ts               # Express setup
└── server.ts            # Entry point

prisma/
├── schema.prisma        # Database schema with indexes
└── seed.ts              # Seeder (Faker.js)
```

---

##  Database Schema

```
User (Admin/Vendor/Customer)
  ├── VendorProfile (1:1)
  │   ├── Produce (1:M)
  │   ├── RentalSpace (1:M)
  │   └── SustainabilityCert (1:M)
  ├── Order (1:M)
  ├── CommunityPost (1:M)
  └── PlantTracking (1:M)
```

**8 Models:** User, VendorProfile, Produce, RentalSpace, Order, CommunityPost, SustainabilityCert, PlantTracking

---

##  Roles & Permissions

| Feature | Admin | Vendor | Customer | Public |
|---------|:-----:|:------:|:--------:|:------:|
| Signup/Login | ✅ | ✅ | ✅ | ✅ |
| Manage Users | ✅ | — | — | — |
| Approve Vendors/Certs | ✅ | — | — | — |
| Create Produce | — | ✅ | — | — |
| Browse Marketplace | ✅ | ✅ | ✅ | ✅ |
| Place Orders | — | — | ✅ | — |
| Manage Orders | ✅ | ✅ (own) | ✅ (own) | — |
| Create Rental Spaces | — | ✅ | — | — |
| Track Plants | — | — | ✅ | — |
| Community Posts | ✅ | ✅ | ✅ | ✅ (view) |

---

## API Endpoints

### Auth — `/api/v1/auth`
```
POST   /signup          Register (Customer or Vendor)
POST   /login           Login with JWT
GET    /me              Get profile [Auth required]
```

### Users — `/api/v1/users` [Admin only]
```
GET    /                List all users (?role=VENDOR&status=ACTIVE)
PATCH  /:id/status      Update user status
DELETE /:id             Delete user
```

### Vendors — `/api/v1/vendors`
```
GET    /                [Admin] All vendors
GET    /:id             [Public] Vendor profile
PATCH  /me/profile      [Vendor] Update own profile
PATCH  /:id/approve     [Admin] Approve/reject vendor
```

### Produce — `/api/v1/produce`
```
GET    /                [Public] Browse (?search&category&minPrice&maxPrice)
GET    /:id             [Public] Product details
POST   /                [Vendor] Create listing
PATCH  /:id             [Vendor] Update own listing
PATCH  /:id/certification [Admin] Approve/reject certification
```

### Orders — `/api/v1/orders`
```
POST   /                [Customer] Place order
GET    /my              [Customer] My orders
PATCH  /:id/cancel      [Customer] Cancel pending order
PATCH  /:id/status      [Admin/Vendor] Update order status
GET    /                [Admin] All orders
```

### Rentals — `/api/v1/rentals`
```
GET    /                [Public] Search spaces (?location&availability)
POST   /                [Vendor] Create rental space
PATCH  /:id             [Vendor] Update space
```

### Community — `/api/v1/community`
```
GET    /                [Public] All posts (?search&tag)
POST   /                [Auth] Create post
PATCH  /:id             [Auth] Update own post
DELETE /:id             [Auth/Admin] Delete post
```

### Certifications — `/api/v1/certifications`
```
POST   /                [Vendor] Submit certification
GET    /my              [Vendor] My certifications
PATCH  /:id/review      [Admin] Approve/reject
```

### Plant Tracking — `/api/v1/tracking`
```
POST   /                [Customer] Start tracking
GET    /my              [Customer] My plants
PATCH  /:id/status      [Customer] Update plant status
```

**Plant Status Flow:** SEEDLING → GROWING → FLOWERING → FRUITING → HARVESTING → HARVESTED

---

##  Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/urban_farming"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed Data
```bash
npm run seed
```

**Test Accounts:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@urbanfarming.com | Admin@1234 |
| Customer | customer@urbanfarming.com | Customer@1234 |

**Seeded Data:**
- 10 Vendors with profiles
- 100+ Produce items
- 20 Community posts
- 15 Sample orders
- 10-30 Rental spaces

### 5. Run Server
```bash
npm run dev
```
API runs at `http://localhost:5000/api/v1`

---

##  API Response Format

All endpoints return this structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

**Errors:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "data": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

---

##  Performance Optimizations

### Database Indexing
Indexed fields for faster queries:
- **Users:** email, role, status
- **Produce:** category, price, name, vendorId
- **Orders:** userId, status, orderDate
- **Rentals:** location, availability

### Other Optimizations
- **Parallel queries** with `Promise.all` for pagination
- **Prisma transactions** for order placement (atomic stock updates)
- **Single PrismaClient** instance across the app
- **Selective field loading** — never fetch unnecessary data

---

##  Security Features

### Rate Limiting
| Route | Limit | Window |
|-------|-------|--------|
| Auth endpoints | 10 requests | 15 minutes |
| All other routes | 100 requests | 15 minutes |

### Authentication
- JWT tokens (7-day expiry)
- Bcrypt password hashing (12 rounds)
- Real-time status check on every request
- Generic error messages (prevents user enumeration)

### HTTP Security
- Helmet middleware for security headers
- Input validation with Zod
- Protected routes with role-based access

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Validation:** Zod
- **Auth:** JWT + bcryptjs
- **Rate Limiting:** express-rate-limit
- **Seeding:** Faker.js

---

##  Developer

**Asadujjaman Atik**  
Junior Backend Developer Task Submission