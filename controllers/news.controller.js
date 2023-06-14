import News from "../models/news.model.js";

export async function addNews(req, res) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Fields missing required: title & description" });
  }
  const news = await News.create({ title, description });

  res.status(201).json({ status: "success", news });
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllNews(req, res) {
  try {
    const news = await News.find();
    res.status(200).json({ status: "success", news });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNewsById(req, res) {
  const newsId = req?.params?.newsId;
  if (!newsId) {
    return res.status(400).json({ message: "News Id is required" });
  }
  try {
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(400).json({ message: "News not found" });
    }
    res.status(200).json({ status: "success", news });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNews(req, res) {
  const { title, description, newsId } = req.body;

  if (!newsId) {
    return res.status(400).json({ message: "News Id is required" });
  }

  const newsUpdates = {};
  if (title) newsUpdates.title = title;
  if (description) newsUpdates.description = description;

  const news = await News.findByIdAndUpdate(newsId, newsUpdates, { new: true });
  if (!news) {
    return res.status(400).json({ message: "News not found" });
  }

  res.status(200).json({ status: "success", news });

  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNews(req, res) {
  const { newsId } = req?.params;
  if (!newsId) {
    return res.status(400).json({ message: "News Id is required" });
  }
  try {
    const news = await News.findByIdAndDelete(newsId);
    if (!news) {
      return res.status(400).json({ message: "News not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "News Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
