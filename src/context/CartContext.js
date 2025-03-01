'use client';

import { CartProvider as USCProvider } from 'react-use-cart';

export function CartProvider({ children }) {
return <USCProvider>{children}</USCProvider>;
}