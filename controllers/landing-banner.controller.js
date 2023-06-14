import LandingBanner from "../models/landing-banner.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addLandingBanner(req, res) {
  const { title, description, btnText, urlToLoad } = req?.body;
  const filename = req?.file?.filename;

  if (!title || !description || !btnText || !urlToLoad || !filename) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      message:
        "required fields: title, description, btnText, urlToLoad, image, one or more required fields are missing",
    });
  }

  try {
    const landingBanner = await LandingBanner.create({
      title,
      description,
      btn_text: btnText,
      url_to_load: urlToLoad,
      image_url: req?.file?.filename,
    });

    return res.status(201).json({ status: "success", landingBanner });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getLandinBannerById(req, res) {
  const { landingBannerId } = req?.params;
  if (!landingBannerId) {
    return res.status(400).json({ message: "landingBannerId is missing" });
  }
  try {
    const landingBanner = await LandingBanner.findById(landingBannerId);

    if (!landingBanner) {
      return res.status(404).json({
        message: "invalid landingBannerId, landingBanner not found",
      });
    }
    return res.status(200).json({ status: "success", landingBanner });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllLandingBanners(req, res) {
  try {
    const landingBanners = await LandingBanner.find();
    return res.status(200).json({ status: "success", landingBanners });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateLandingBanner(req, res) {
  const { landingBannerId, title, description, btnText, urlToLoad } = req?.body;
  const filename = req?.file?.filename;
  if (!landingBannerId) {
    if (filename) deleteFile(filename);
    return res.status(400).json({ message: "landingBannerId is missing" });
  }
  const landingBannerUpdates = {};
  if (title) landingBannerUpdates.title = title;
  if (description) landingBannerUpdates.description = description;
  if (btnText) landingBannerUpdates.btn_text = btnText;
  if (urlToLoad) landingBannerUpdates.url_to_load = urlToLoad;
  if (filename) landingBannerUpdates.image_url = filename;

  try {
    const landingBanner = await LandingBanner.findById(landingBannerId);
    if (!landingBanner) {
      if (filename) deleteFile(filename);
      return res.status(404).json({
        message: "invalid landingBannerId, landingBanner not found",
      });
    }

    const updatedLandingBanner = await LandingBanner.findByIdAndUpdate(
      landingBannerId,
      landingBannerUpdates,
      { new: true }
    );

    return res
      .status(200)
      .json({ status: "success", landingBanner: updatedLandingBanner });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteLandingBanner(req, res) {
  const { landingBannerId } = req?.params;

  if (!landingBannerId) {
    return res.status(400).json({ message: "landingBannerId is missing" });
  }

  try {
    const landingBanner = await LandingBanner.findByIdAndDelete(
      landingBannerId
    );
    if (!landingBanner) {
      return res.status(404).json({
        message: "invalid landingBannerId, landingBanner not found",
      });
    }
    deleteFile(landingBanner?.image_url);
    res.status(200).json({
      status: "success",
      message: "landingBanner deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
