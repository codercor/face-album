const router = require('express').Router();
const upload = require("../middlewares/uploads3");
const s3Service = require("../services/s3.service");
//if you want to upload to s3 you can use this code
router.post('/upload',upload.array("photos[]"), async (req, res) => {
            res.json(req.files);
})
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

module.exports = router;
