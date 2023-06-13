import Category from "../models/category.model.js";
import fs from "fs";
import { uploadPath } from "../middlewares/upload.js";

export async function addCategory(req, res) {
  console.log(req?.body, req?.file);

  if (!req?.body?.name || !req?.body?.description || !req?.file?.filename) {
    return res.status(400).json({ message: "One of more fields are missing" });
  }
  try {
    const category = await Category.create({
      icon_url: req?.file?.filename,
      name: req?.body?.name,
      description: req?.body?.description,
    });

    return res.status(201).json({ category });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCategories(req, res) {
  try {
    let query = {};
    if (req?.query?.status) {
      if (req?.query?.status == "deactivated") {
        query = { is_deactivated: true };
      } else if (req?.query?.status == "activated") {
        query = { is_deactivated: false };
      }
    }
    const categories = await Category.find(query);
    return res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req?.params?.categoryId);
    return res.status(200).json({ category });
  } catch (err) {
    console.log(err);
  }
}

export async function updateCatgory(req, res) {
  try {
    if (!req?.body?.categoryId) {
      return res.status(400).json({ message: "categoryId is missing" });
    }
    const categoryBody = {};

    if (req?.body?.name) {
      categoryBody.name = req?.body?.name;
    }
    if (req?.body?.description) {
      categoryBody.description = req?.body?.description;
    }
    if (req?.body?.is_deactivated) {
      categoryBody.is_deactivated = req?.body?.is_deactivated;
    }
    if (req?.file?.filename) {
      categoryBody.icon_url = req?.file?.filename;
    }

    const catgory = await Category.findById(req?.body?.categoryId);
    fs.unlinkSync(`${uploadPath}/${catgory?.icon_url}`);

    const updatedCategory = await Category.findByIdAndUpdate(
      req?.body?.categoryId,
      categoryBody,
      { new: true }
    );

    return res.status(200).json({ category: updatedCategory });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req?.params;
    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is missing" });
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    fs.unlinkSync(`${uploadPath}/${deletedCategory?.icon_url}`);

    return res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
}
