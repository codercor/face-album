const router = require('express').Router();
const uploadSelfie = require('../middlewares/uploadSelfie');
const rekognitionService = require('../services/rekognition.service');
const path = require('path');
const fs = require('fs');
router.post( "/searchFace",(req,res,next)=>{
    console.log(req.body);
    next();
},uploadSelfie.single("selfie"),async (req,res) => {
    const { file } = req;
    const folder = req.body.folder
    let filePath = path.resolve(file.destination+"/"+file.filename);
    let selfie =  fs.readFileSync(filePath);
    console.log("Yüz bulunuyor inşAllah");
    let results = await rekognitionService.searchPhotosBySelfie(selfie,folder);
    console.log("wola !");
    res.json(results);
    fs.rmSync(filePath)
})

module.exports = router;