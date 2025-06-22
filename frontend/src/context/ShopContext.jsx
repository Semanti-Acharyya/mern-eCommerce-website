import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const getCartItemsCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (ItemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[ItemId][size] = quantity;

    setCartItems(cartData);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue; // skip if product not found

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return totalAmount;
  };

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
    getCartItemsCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
