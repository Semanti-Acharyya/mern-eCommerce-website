import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// since we will be sending multiple images via '/add',
// we are adding the upload middleware to the addProduct route to upload files to the server
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
