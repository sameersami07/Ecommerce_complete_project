import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext({
  products: [],
  currency: '$',
  delivery_fee: 0,
  search: '',
  showSearch: false,
  cartItems: {},
  user: null,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getCartCount: () => 0,
  clearCart: () => {},
  logout: () => {}
});

const ShopContextProvider = (props) => {
    const currency ='$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const[showSearch,setShowSearch]= useState(false);
    const [cartItems,setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : {};
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

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
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(sizesObj => {
            Object.values(sizesObj).forEach(quantity => {
                totalCount += quantity;
            });
        });
        return totalCount;
    };

    const clearCart = () => {
        setCartItems({});
    }

    const logout = () => setUser(null);


    const value  ={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        clearCart,
        user,
        setUser,
        logout
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider; 