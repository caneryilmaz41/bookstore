"use client"
import { useDispatch } from "react-redux";
import{actions}from"@/stores/basket-store";

export function AddBasketButton({product}){
    const dispatch=useDispatch();
    const handleAddBasket=()=>{
        dispatch(actions.addToBasket(product))
    }
    return <button onClick={handleAddBasket}> Sepete Ekle</button>
}