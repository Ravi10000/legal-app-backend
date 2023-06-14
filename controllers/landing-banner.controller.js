import LandingBanner from "../models/landing-banner.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addLandingBanner(req, res) {
  const { title, description, btnText, urlToLoad } = req?.body;

  if (
    !title ||
    !description ||
    !btnText ||
    !urlToLoad ||
    !req?.file?.filename
  ) {
    deleteFile(req?.file?.filename);
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

    return res.status(201).json({ landingBanner });
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
    return res.status(200).json({ landingBanner });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllLandingBanners(req, res) {
  try {
    const landingBanners = await LandingBanner.find();
    return res.status(200).json({ landingBanners });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
