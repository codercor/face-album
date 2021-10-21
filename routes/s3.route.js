const router = require('express').Router();
const upload = require("../middlewares/uploads3");
const s3Service = require("../services/s3.service");
//if you want to upload photos to folder in s3 you can use this endpoint [form-data] {file: file, folder: folder} [post]
router.post('/upload',upload.array("photos[]"), async (req, res) => {
            res.json(req.files);
})
//get an image from s3 folder [get]
router.get("/getOne/:folder/:photo", async (req, res) => {
    try {
        console.log(req.params);
        const photo = await s3Service.getOne(req.params.folder, req.params.photo);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(photo, 'binary');
        res.end(photo, 'binary');
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error);
    }
});
//get all images from s3 folder [get]
router.get("/getAll/:folder", async (req, res) => {
    try {
        let photos = await s3Service.getAll(req.params.folder);
        photos = photos.map(photo =>  {return{ key: photo.Key }} );
        res.json(photos);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error);
    }
})

module.exports = router;
