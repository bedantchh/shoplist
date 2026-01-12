import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("error getting products", error);
    res.status(500).json({ error: "Failed finding products" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("error getting products", error);
    res.status(500).json({ error: "Failed finding products" });
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product", error);
    res.status(500).json({ error: "Failed to get product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ error: "Failed creating the product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You are not the owner" });
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.error("error updating product:",error)
    res.status(500).json({error:"error updating product"})
  }
};

export const deleteProduct = async(req: Request, res: Response)=>{
  try {
    const {userId} = getAuth(req);
    if(!userId) return res.status(401).json({error: "Unauthorized"});

    const {id} = req.params;
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You are not the owner" });
    }
    await queries.deleteProduct(id);
    return res.status(200).json({message:"Product deleted"})
  } catch (error) {
    console.error("error updating product:",error)
    res.status(500).json({error:"error deleting product"})
  }
}
