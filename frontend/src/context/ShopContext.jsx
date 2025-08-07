import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  // initialize with an empty object insead of an empty array
  // because we will store cart items as key-value pairs
  // where key is the product id and value is the quantity
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId: ItemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId: ItemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const getProductsData = async () => {
    try {
      console.log("Backend URL is:", backendUrl);
      const response = await axios.get(backendUrl + "/api/products/list");
      console.log("Products API response:", response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    // Check if token exists in localStorage and set it to state
    // we do this to maintain the token state even after page refresh
    if (!token && localStorage.getItem("token")) {
      // update the token state from localStorage
      setToken(localStorage.getItem("token"));
      // fetch the user cart data from backend
      // using the token from localStorage
      // now even when the page is refreshed, the cart data will be same
      // as it was before the refresh
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

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
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
