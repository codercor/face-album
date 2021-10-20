const { S3 } = require('aws-sdk');
module.exports.getOne = function (folder, photo) {
    const s3 = new S3();
    const params = {
        Bucket: "face-album-bucket",
        Key: folder + "/" + photo
    };
    console.log(params);
    return new Promise((resolve, reject) => {
        s3.getObject(params, async (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(data.Body.toString('binary'));
                } catch (error) {
                    reject(error);
                }
            }
        });
    })

}
module.exports.getAll = function (folder) {
    const s3 = new S3();
    const params = {
        Bucket: "face-album-bucket",
        Prefix: folder
    };
    return new Promise((resolve, reject) => {
        s3.listObjects(params, async (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(data.Contents);
                } catch (error) {
                    reject(error);
                }
            }
        });
    })

}