import express from "express";
import Product from "../model/Product.js";


const router=express.Router()

router.post("/products", (req, res) => {
  // Use the imported Product model to create a new entry.
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })
    .then((result) => {
      console.log("Created Product:", result);
      res
        .status(201)
        .json({ message: "Product created successfully!", product: result });
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res
        .status(500)
        .json({ message: "Failed to create product.", error: err });
    });
});

// // Route to get all products.
router.get("/products", (req, res) => {
  // Use the imported Product model to find all entries.
  Product.findAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res
        .status(500)
        .json({ message: "Failed to fetch products.", error: err });
    });
});

router.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  productId ==
    Product.findByPk(productId)
      .then((product) => {
        if (product) res.status(200).json(product);
        else res.status(404).json({ message: "product not found" });
      })
      .catch((err) => {
        res
          .sendStatus(500)
          .json({ message: "failed to fetch the product", error: err });
      });
});

router.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  Product.update(
    {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: productId,
      },
    }
  )
    .then(
      Product.findByPk(productId).then((product) => {
        res.status(200).json({
          message: "Product updated successfully!",
          product: product,
        });
      })
    )
    .catch((err) => {
      res.send(500);
      console.log(err);
    });
});




export default router;