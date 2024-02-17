import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from "@/app/layout/TopBar";
import { store } from '@/stores';
import { fetchUser } from '@/stores/user-store';
import { StoreProvider } from '@/stores/store-provider';
import { fetchDetails, fetchProducts } from '@/stores/products-store';

const inter = Inter({ subsets: ['latin'] })


export default async function RootLayout({ children }) {
 await store.dispatch(fetchUser())
 await store.dispatch(fetchProducts())
 
  //  console.log(store.getState().details.details)
  return (
   

<html lang="en">
      
      
      <body
      style={{backgroundColor:'white'}}
      className={inter.className}>
        <StoreProvider>
        <TopBar />
      {children}
        </StoreProvider>
      
      </body>
      </html>

   
      
  )
}
