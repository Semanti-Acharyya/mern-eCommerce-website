import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  // initialize with an empty object insead of an empty array
  // because we will store cart items as key-value pairs
  // where key is the product id and value is the quantity
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (ItemId, size) => {
    if (!size) {
      toast.error("Select product size to add it to cart!");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[ItemId]) {
      if (cartData[ItemId][size]) {
        cartData[ItemId][size] += 1; // increment quantity if item already exists
      } else {
        cartData[ItemId][size] = 1; // add new size with quantity 1
      }
    } else {
      cartData[ItemId] = {};
      cartData[ItemId][size] = 1; // add new item with size and quantity 1
    }
    setCartItems(cartData);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  // adding the variables/state variables here to acess it anywhere in the program
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
