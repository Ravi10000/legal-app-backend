import Category from "../models/category.model.js";
import Service from "../models/service.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addCategory(req, res) {
  const filename = req?.file?.filename;
  const { name, description } = req?.body;
  if (!name || !description || !filename) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      status: "error",
      message:
        "required fields: name, description, icon, One of more fields are missing",
    });
  }
  try {
    const category = await Category.create({
      icon_url: filename,
      name,
      description,
    });

    return res.status(201).json({ status: "success", category });
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
    return res.status(200).json({ status: "success", categories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getCategoryById(req, res) {
  const { categoryId } = req?.params;
  if (!categoryId) {
    return res
      .status(400)
      .json({ status: "error", message: "categoryId is missing" });
  }
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "invalid categoryId, category not found",
      });
    }

    return res.status(200).json({ status: "success", category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "internal server error" });
  }
}

export async function updateCatgory(req, res) {
  try {
    console.log({ body: req.body });
    if (!req?.body?.categoryId) {
      if (req?.file?.filename) deleteFile(req?.file?.filename);
      return res
        .status(400)
        .json({ status: "error", message: "categoryId is missing" });
    }
    const categoryBody = {};

    if (req?.body?.name) {
      categoryBody.name = req?.body?.name;
    }
    if (req?.body?.description) {
      categoryBody.description = req?.body?.description;
    }
    if (
      typeof req?.body?.is_deactivated === "boolean" ||
      req?.body?.is_deactivated === "false" ||
      req?.body?.is_deactivated === "true"
    ) {
      if (typeof req?.body?.is_deactivated === "boolean") {
        categoryBody.is_deactivated = req?.body?.is_deactivated;
      } else {
        categoryBody.is_deactivated =
          req?.body?.is_deactivated === "true" ? true : false;
      }
    }
    if (req?.file?.filename) {
      categoryBody.icon_url = req?.file?.filename;
    }

    const catgory = await Category.findById(req?.body?.categoryId);
    if (!catgory) {
      if (req?.file?.filename) deleteFile(req?.file?.filename);
      return res
        .status(404)
        .json({ message: "invalid categoryId, category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req?.body?.categoryId,
      categoryBody,
      { new: true }
    );
    console.log({ updatedCategory });

    if (req?.file?.filename) {
      deleteFile(catgory?.icon_url);
    }
    return res
      .status(200)
      .json({ status: "success", category: updatedCategory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req?.params;
    if (!categoryId) {
      return res
        .status(400)
        .json({ status: "error", message: "categoryId is missing" });
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ message: "invalid categoryId, category not found" });
    }
    deleteFile(deletedCategory?.icon_url);
    await Service.deleteMany({ category: categoryId });
    // const servicesToDelete = await Service.find({ category: categoryId });

    // const deletedServices = await Promise.all(
    //   servicesToDelete.map(async (service) => {
    //     await Service.deleteMany({ parentService: service._id });
    //   })
    // );

    return res
      .status(200)
      .json({ status: "success", message: "category deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
