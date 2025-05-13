import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setsearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // this limits to the search bar only appearing if current URL path contains the word 'collection'
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // return <div></div> only if showSearch  & setVisible is true, else return null
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
