# E_CommerceWeb

Full-stack MERN e-commerce app with:

- Customer storefront (React + Vite + Tailwind CSS)
- Seller/admin product and order management
- Node.js + Express API with MongoDB
- Image upload support via Cloudinary

## Tech Stack

- Frontend: React 19, Vite 6, Tailwind CSS 4, React Router, Axios, GSAP
- Backend: Node.js, Express 5, MongoDB (Mongoose), JWT auth, Cookies, Multer
- Media: Cloudinary

## Project Structure

```text
E_CommerceWeb/
	client/   # React frontend
	server/   # Express API
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (Atlas or local)
- Cloudinary account (for product image upload)

## 1) Clone And Install

```bash
git clone <your-repo-url>
cd E_CommerceWeb

# Install frontend deps
cd client
npm install

# Install backend deps
cd ../server
npm install
```

## 2) Environment Variables

Create these files:

- `server/.env`
- `client/.env`

### `server/.env`

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>
JWT_SECRET=your_super_secret_jwt_key

SELLER_EMAIL=seller@example.com
SELLER_PASSWORD=your_seller_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# optional
NODE_ENV=development
```

Notes:

- The app connects to `${MONGODB_URI}/greencart`, so keep `MONGODB_URI` as the base URI.
- In production, cookie behavior changes based on `NODE_ENV`.

### `client/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=$
```

## 3) Run The App

Open two terminals.

### Terminal 1: Backend

```bash
cd server
npm run server
```

Backend runs at `http://localhost:4000`.

### Terminal 2: Frontend

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run ESLint

### Server (`server/package.json`)

- `npm run server` - Start backend with Nodemon
- `npm start` - Start backend with Node

## API Base And Main Routes

Base URL: `http://localhost:4000`

- `/api/user` - register, login, auth check, logout
- `/api/seller` - seller login/auth/logout
- `/api/product` - add/list/product-by-id/stock update
- `/api/cart` - update cart
- `/api/address` - add/get addresses
- `/api/order` - COD order, user orders, seller orders

## Common Setup Issues

- CORS error:
  - Make sure frontend is running on `http://localhost:5173`.
  - Server currently allows `http://localhost:5173`.
- Auth not persisting:
  - Ensure `VITE_BACKEND_URL` is correct.
  - Keep `axios.defaults.withCredentials = true` behavior intact.
- MongoDB not connecting:
  - Check `MONGODB_URI` value and network/IP allow list in Atlas.
- Cloudinary upload failing:
  - Verify all three Cloudinary env vars.

## Production Notes

- Set `NODE_ENV=production` on server.
- Update CORS allowlist in `server/server.js` to include your deployed frontend URL.
- Set `VITE_BACKEND_URL` to deployed API URL.
- Use secure secrets (JWT and database credentials) via hosting provider environment settings.

## License

ISC
