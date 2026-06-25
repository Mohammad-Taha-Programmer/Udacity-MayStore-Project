# My Store E-Commerce Application

A complete Angular e-commerce application with product listings, shopping cart, checkout, and order confirmation. The app connects to a **remote Supabase backend** - no local database setup is required

## Prerequisites

- **Node.js** (version 18 or later) and **npm** (Node package manager)
- Angular CLI (optional; `npm start` will use the local version)

## Backend Setup (Supabase)

This application uses a **Live Supabase instance** with an anonymous public API key.
**No additional backend configuration is needed** - the app will work as needed.

> The provided live Supabase instance already contains sample data. But If you wish to use your own Supabase project, replace the `supabaseUrl` > and `supabaseKey` in `src/app/services/supabase-service.ts` with your own credentials.

### Required Database Tables

The app expects the following tables in your Supabase schema:

- categories table with id, name, slug, and image_url.
- products tables with id, name, description, price, image_url, category_id, stock, and created_at.
- cart_items with id, session_id, product_id, and quantity.

## App Subsections

- **Product List Page**: Browse products with category filtering
- **Product Detail Page**: View product details with quantity selection
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Checkout Form**: Validated form for shipping and payment information
- **Order Confirmation**: Success page after checkout completion

### App Models (TypeScript Interfaces)

- `ProductModel`: id, name, description, price, image_url, category_id, stock
- `CategoryModel`: id, name, slug, image_url
- `CartItemModel`: id, product_id, quantity, product
- `ShippingInfoModel`: fullName, email, address, city, zip
- `PaymentInfoModel`: cardNumber, expiry, cvv
- `OrderModel`: id, items, shipping, total, createdAt

### App Services

- **SupabaseService**: API communication with Supabase backend
- **ProductService**: Product and category data management
- **CartService**: Shopping cart state (shared via Angular signals)
- **OrderService**: Order creation and management

## How To Run The Application

1. **Clone the repository** (or download the source code).
   2 . Open a terminal in the project root.
2. Install the dependencies.

```bash
npm install
```

4. Run the command

```bash
npm start
```

The application cant be reached at the url: `http://localhost:4200`

## Routes

- `/` : Home page
- `/products/:id` : Product details page
- `/cart` : Shopping cart page
- `/checkout` : Checkout form page
- `/confirmation/:orderId` :Order confirmation page

## Form Validation

The checkout form includes client-side validation:

- **Full Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Address**: Required
- **City**: Required
- **ZIP Code**: Required, 5 digits
- **Card Number**: Required, 16 digits
- **Expiry Date**: Required, MM/YY format
- **CVV**: Required, 3-4 digits

## How To Use It

1. Browse all products on the home page.
2. There is a filter by category on the left.
3. Click a product card to show its details.
4. Add products to the cart with the desired quantity.
5. Click the cart icon to change quantity or remove items, to checkout and view confirmation.
