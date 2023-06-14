import Category from "../models/category.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addCategory(req, res) {
  console.log(req?.body, req?.file);

  if (!req?.body?.name || !req?.body?.description || !req?.file?.filename) {
    deleteFile(req?.file?.filename);
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
    res.status(500).json({ message: "internal server error" });
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
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getCategoryById(req, res) {
  const { categoryId } = req?.params;
  if (!categoryId) {
    return res.status(400).json({ message: "categoryId is missing" });
  }
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ message: "invalid categoryId, category not found" });
    }

    return res.status(200).json({ category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateCatgory(req, res) {
  try {
    if (!req?.body?.categoryId) {
      deleteFile(req?.file?.filename);
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

    const updatedCategory = await Category.findByIdAndUpdate(
      req?.body?.categoryId,
      categoryBody,
      { new: true }
    );

    deleteFile(catgory?.icon_url);
    return res.status(200).json({ category: updatedCategory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req?.params;
    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is missing" });
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    // fs.unlinkSync(`${uploadPath}/${deletedCategory?.icon_url}`);
    deleteFile(deletedCategory?.icon_url);

    return res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
