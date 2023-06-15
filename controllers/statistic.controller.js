import Statistic from "../models/statistic.model.js";

export async function addStatistic(req, res) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: "error",
      message: "required field :title, description, one or more missing fields",
    });
  }
  try {
    const statistic = await Statistic.create({
      title,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: "success",
      message: "Statistic Added Successfully",
      statistic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function getAllStatistics(req, res) {
  try {
    const statistics = await Statistic.find();

    return res.status(200).json({
      status: "success",
      message: "Statistics fetched successfully",
      statistics,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getStatisticById(req, res) {
  const { statisticId } = req?.params;
  if (!statisticId) {
    return res
      .status(400)
      .json({ status: "error", message: "statisticId is missing" });
  }
  try {
    const statistic = await Statistic.findById(statisticId);
    if (!statistic) {
      return res.status(404).json({
        status: "error",
        message: "invalid statisticId, service not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Statistic Sent Successfully",
      statistic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
export async function deleteStatistic(req, res) {
  const { statisticId } = req?.params;
  if (!statisticId) {
    return res
      .status(400)
      .json({ status: "error", message: "statisticId is missing" });
  }
  try {
    const statistic = await Statistic.findByIdAndDelete(statisticId);
    if (!statistic) {
      return res.status(404).json({
        status: "error",
        message: "invalid statisticId, service not found",
      });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Statistic deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function updateStatistic(req, res) {
  const { title, description, statisticId } = req.body;
  if (!statisticId) {
    return res.status(400).json({
      success: "error",
      message: "required field : statisticId, one or more missing fields",
    });
  }
  const statisticData = { updatedBy: req.user._id };
  if (title) statisticData.title = title;
  if (description) statisticData.description = description;
  try {
    const statistic = await Statistic.findByIdAndUpdate(
      statisticId,
      statisticData,
      { new: true }
    );
    res.status(201).json({
      success: "success",
      message: "Statistic Updated Successfully",
      statistic,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}
