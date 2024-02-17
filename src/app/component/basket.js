"use client"
import React from 'react'
import { useSelector } from 'react-redux'; 

function Basket() {
    const basket=useSelector(state=>state.basket.basket);
    const totalAmount=basket.reduce((acc,product)=>{
        return acc+product.price;
    },0);
  return (
    <div>Basket</div>
  )
}

export default Basket