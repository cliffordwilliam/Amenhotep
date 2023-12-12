const multer = require('multer');
const ImageKit = require("imagekit");


const storage = multer.memoryStorage(); // multer's storage


module.exports = class Utils {
  // both are used to upload to imagekit (NEED CREDS)
  // const RESULT = await Util.imagekit.upload({file:IMAGE_BASE_64,fileName:req.file.originalname,tags:[`${req.file.originalname}`]})
  static imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
  static upload = multer({storage});
}
