# My Store E-Commerce Application

A complete Angular e-commerce application with product listings, shopping cart, checkout, and order confirmation.

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

```bash
npm install
ng serve
```

The application cant be reached at the url: `http://localhost:4200`

## Routes

- `/` : Home page
- `/products/:id` : Product details page
- `/cart` : Shopping cart page
- `/checkout` :  Checkout form page
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
