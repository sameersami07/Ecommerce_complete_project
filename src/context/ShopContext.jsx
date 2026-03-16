import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency ='$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const[showSearch,setShowSearch]= useState(false);
    const [cartItems,setCartItems] = useState({});

    const addToCart =async (ItemId,size) =>{ 
        let cartData = structuredClone(cartItems);
        if(cartData[ItemId]){
            if(cartData[ItemId][size]){
                cartData[ItemId][size] += 1;
            } else {
                cartData[ItemId][size] = 1;
            }
        } else {
            cartData[ItemId] = {};
            cartData[ItemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const removeFromCart = async (ItemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[ItemId]) {
            delete cartData[ItemId][size];
            if (Object.keys(cartData[ItemId]).length === 0) {
                delete cartData[ItemId];
            }
        }
        setCartItems(cartData);
    }

    const updateQuantity = async (ItemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[ItemId]) {
            if (quantity > 0) {
                cartData[ItemId][size] = quantity;
            } else {
                delete cartData[ItemId][size];
                if (Object.keys(cartData[ItemId]).length === 0) {
                    delete cartData[ItemId];
                }
            }
        }
        setCartItems(cartData);
    }
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const value  ={
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems,setCartItems,addToCart,removeFromCart,updateQuantity
        
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider; 