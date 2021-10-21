const router = require('express').Router();
const uploadSelfie = require('../middlewares/uploadSelfie');
const rekognitionService = require('../services/rekognition.service');
const path = require('path');
const fs = require('fs');
router.post( "/searchFace",uploadSelfie.single("selfie"),async (req,res) => {
    const { file } = req;
    const folder = req.body.folder
    let filePath = path.resolve(file.destination+"/"+file.filename);
    let selfie =  fs.readFileSync(filePath);
    let results = await rekognitionService.searchPhotosBySelfie(selfie,folder);
    res.json(results);
    fs.rmSync(filePath)
})

module.exports = router;