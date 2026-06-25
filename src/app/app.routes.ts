import { Routes } from '@angular/router';
import { ProductListComponent } from './components/prduct-list/product-list-component/product-list-component';
import { ProductDetailsComponent } from './components/prduct-details/product-details-component/product-details-component';
import { CartComponent } from './components/cart/cart-component/cart-component';
import { CheckoutComponent } from './components/checkout/checkout-component/checkout-component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation-component/order-confirmation-component';

export const routes: Routes = [
    {path:'', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'confirmation/:orderId', component: OrderConfirmationComponent},
    {path: 'confirmation', component: OrderConfirmationComponent},
    {path: '**', redirectTo: ''}
];
