import React from 'react'
import { useCart } from '../context/Cart';
import {useAuth} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
function CartPage() {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    console.log("All information about cart", cart);

    const handleRemove = (id)=>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item)=>item._id === id);
            if(index !== -1){
                myCart.splice(index,1);
                setCart(myCart);
                localStorage.setItem("cart",JSON.stringify(myCart));
            }
        } catch (error) {
            console.log(error);
        }
    }

   
    const totalPrice = ()=>{
        try {
            return cart.reduce((total,item)=> total + item.price, 0)
            .toLocaleString("en-US",{
                style:"currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error);
            return "$0.00"
        }
    }
  return (
    <div>CartPage</div>
  )
}

export default CartPage