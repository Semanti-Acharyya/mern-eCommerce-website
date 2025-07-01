import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function to add product
const addProduct = async (req, res) => {
  try {
    // get all the product details from the request body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // doing null helps us test the api even if the images are not uploaded
    const image1 = req?.files?.image1?.[0] || null;
    const image2 = req?.files?.image1?.[0] || null;
    const image3 = req?.files?.image1?.[0] || null;
    const image4 = req?.files?.image1?.[0] || null;

    // adding the images to an array
    const images = [image1, image2, image3, image4].filter(
      // filter out any undefined or null values
      (item) => item !== null && item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        // if image is null, return null
        if (!item) return null;

        // upload the image to cloudinary and get the url
        let result_url = await cloudinary.uploader.upload(
          item.path,
          (resource_type = "image")
        );
        return result_url.secure_url; // return the secure url of the image
      })
    );

    // show all the product details
    console.log(name, price, category, subCategory, sizes, bestseller);
    // show all the images
    console.log(imageUrl);

    const productData = {
      name,
      description,
      price: Number(price), // convert price to number
      image: imageUrl, // store the image urls
      category,
      subCategory,
      sizes: JSON.parse(sizes), // parse sizes from JSON string to object
      bestseller: bestseller === "true" ? true : false, // convert to boolean
      date: Date.now(), // store the current date
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save(); // save the product to the database

    res.json({ sucess: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({}); // find all products in the database
    res.json({ success: true, products }); // send the products array as response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function to remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id); // find the product by id and delete it
    res.json({ success: true, message: "Product removed successfully" }); // send success response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function to list single product's info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body; // get productId from request body
    const product = await productModel.findById(productId); // find the product by id
    res.json({ success: true, product }); // send the product as response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
