import NewsImage from "../models/news-image.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addNewsImage(req, res) {
  const filename = req?.file?.filename;

  if (!filename) {
    return res.status(400).json({
      status: "error",
      message: "required fields: image",
    });
  }
  try {
    const newsImage = await NewsImage.create({
      imageUrl: filename,
      addedBy: req.user._id,
    });
    if (!newsImage) {
      return res.status(400).json({ status: "error", message: "Invalid Data" });
    }
    return res.status(201).json({
      status: "success",
      message: "News Image Added Successfully",
      newsImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function getAllNewsImages(req, res) {
  try {
    const newsImages = await NewsImage.find();
    res.status(200).json({ status: "success", newsImages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function getNewsImageById(req, res) {
  const { newsImageId } = req.params;
  if (!newsImageId)
    return res
      .status(400)
      .json({ status: "error", message: "required fields: newsImageId" });
  try {
    const newsImage = await NewsImage.findById(newsImageId);
    if (!newsImage) {
      res.status(400).json({
        status: "error",
        message: "Invalid image id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "News Image Sent Successfully",
      newsImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function updateNewsImage(req, res) {
  const { newsImageId } = req.body;
  const filename = req?.file?.filename;
  if (!newsImageId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: newsImageId",
    });
  }
  if (!filename) {
    return res.status(400).json({
      status: "error",
      message: "required fields: image",
    });
  }
  try {
    const oldNewsImage = await NewsImage.findById(newsImageId);
    if (!oldNewsImage) {
      return res.status(400).json({
        status: "error",
        message: "Invalid newsImageId",
      });
    }

    const newsImage = await NewsImage.findByIdAndUpdate(
      newsImageId,
      {
        imageUrl: filename,
      },
      { new: true }
    );

    deleteFile(oldNewsImage.imageUrl);

    return res.status(200).json({
      status: "success",
      message: "News Image Updated Successfully",
      newsImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

export async function deleteNewsImage(req, res) {
  const { newsImageId } = req.params;
  if (!newsImageId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: newsImageId",
    });
  }

  try {
    const newsImage = await NewsImage.findByIdAndDelete(newsImageId);

    if (!newsImage) {
      return res.status(400).json({
        status: "error",
        message: "Invalid newsImageId",
      });
    }
    deleteFile(newsImage.imageUrl);
    res.status(200).json({
      status: "success",
      message: "News Image Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
