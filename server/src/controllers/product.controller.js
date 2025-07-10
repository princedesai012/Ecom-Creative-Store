import Product from "../models/product.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";


// add a new product
export const Addproduct =  async (req, res) => {

try {
    const {name ,description,price,category,brand,stock} = req.body;
    // Validate required fields
    if (!name || !description || !price || !category || !brand || !stock) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
    }

    const imagePath = req.file.path;
    console.log("Uploading image at path:", imagePath); // Log the local file path

    const imageUrl = await uploadOnCloudinary(imagePath);

    console.log("Cloudinary upload result:", imageUrl); // Log the result from Cloudinary

    if (!imageUrl) {
        console.error("Image upload failed for path:", imagePath);
        return res.status(500).json({ message: "Image upload failed" });
    }

    // Create a new product
    const newProduct = await Product.create({
        name,
        description,
        imageUrl, // Use the URL returned from Cloudinary
        price,
        category,
        brand,
        stock
    });

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
}
catch(error){
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}





// get all products with query, filter, and pagination
export const getAllProducts = async (req, res) => {
    try {
        // Query options
        const { page = 1, limit = 10, search, category, brand, minPrice, maxPrice } = req.query;

        // Build filter object
        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }
        if (category) {
            filter.category = category;
        }
        if (brand) {
            filter.brand = brand;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// get product by id
export const getProductById = async (req, res) => {
    try {
       const  ProductId = req.params.id;
        const product = await Product.findById(ProductId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        res.status(200).json({
            message: "Product fetched successfully",
            product
        });
        
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}

// update product by id
export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category, brand, stock } = req.body;

        

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product details
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.brand = brand;
        product.stock = stock;

        // If an image is uploaded, update the image URL
        if (req.file) {
            const imagePath = req.file.path; // Assuming you're using multer for file uploads
            product.imageUrl = await uploadOnCloudinary(imagePath); // Function to upload image to Cloudinary
            if (!product.imageUrl) {
                return res.status(500).json({ message: "Image upload failed" });
            }
        }

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
        
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }


}

// delete product by id

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
        
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }


}

export const addReview = async (req, res) => {

    try {
        const productId = req.params.id;
        const { comment, rating } = req.body;

        // Validate required fields
        if (!comment || !rating) {
            return res.status(400).json({ message: "Comment and rating are required" });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Add the review
        product.reviews.push({
            user: req.user._id, // Assuming user ID is available in req.user
            comment,
            rating
        });

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(201).json({
            message: "Review added successfully",
            product: updatedProduct
        });
        
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

// get all reviews for a specific product
export const getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId).populate("reviews.user", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return only reviews
    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

