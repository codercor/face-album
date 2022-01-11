const { Rekognition, Service, Config, S3 } = require("aws-sdk");
require('dotenv').config()
const config = require('../config/aws.config')

//new rekognition
const rekognition = new Rekognition({
    region: config.region,
});

// rekognition.createCollection({
//     CollectionId:"mc-faces"
// },(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })
// rekognition.listCollections({
//     MaxResults:10,
// },(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })

//get info for collection
// rekognition.describeCollection({
//     CollectionId: "insanlar",
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// }
// )

// rekognition.deleteCollection({
//     CollectionId:"insanlar",
// },(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })
// Index faces
// var params = {
//     CollectionId: "insanlar", 
//     DetectionAttributes: [
//     ], 
//     ExternalImageId: "myphotoid", 
//     Image: {
//      S3Object: {
//       Bucket: "photos-for-my-example", 
//       Name: "deneme.jpg"
//      }
//     }
//    };
//    rekognition.indexFaces(params, function(err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else     console.log(data);    
//    })


// rekognition.searchFacesByImage(
//     {
//         CollectionId:"selami",
//         Image:{
//             S3Object:{
//                 Bucket:"photos-for-my-example",
//                 Name:"IMG_20210731_173113.jpg"
//             }
//         }

//     },
//     (err,data)=>{
//         if(err)console.log(err);
//         else console.log(data);
//     }

// )

// rekognition.searchFaces({
//     CollectionId:"selami",
//     FaceId:"IMG_20210731_173113.jpg	"
// },

// )
// // //önemli
var s3 = new S3()
let folder = "mastherchef"
let bucket  = "face-album-bucket"
let collectionId = folder+"-collection"
let atesFaceId = "839575ed-f8e4-436f-ae3b-9f33ca24a647"
let fs = require('fs')
// rekognition.compareFaces({
//     SourceImage:{
//         S3Object:{
//             Bucket:bucket,
//             Name:folder+"/"+"ates.jpg"
//         },
//     }, 
//     TargetImage:{
//         S3Object:{
//             Bucket:bucket,
//             Name:folder+"/"+"yedili.jpg"
//         },
//     },
// },(err,data)=>{
//     console.log(data.FaceMatches.length);
// })

async function getPhotoKeys(folder){
    let params = {
        Bucket: bucket,
        Prefix: folder
    }
    let data = await s3.listObjectsV2(params).promise()
    let keys = data.Contents.map(item=>item.Key)
    keys.shift();
    return keys
}

async function searchPhotosBySelfie(photo,folder) {
    let results = [];
    console.log(photo,folder);
    try {
        let allPhotos = await getPhotoKeys(folder);
        for (let i = 0; i < allPhotos.length; i++) {
            const item = allPhotos[i];
            let result = await rekognition.compareFaces({
                SourceImage: {
                    Bytes:photo
                },
                TargetImage: {
                    S3Object: {
                        Bucket: bucket,
                        Name: item
                    }
            }          
            }).promise();
            if(result.FaceMatches.length > 0) results.push(item);
        }
    } catch (err) {
        console.log(err);
    }
    console.log(results);
    return results;
}

module.exports = {searchPhotosBySelfie}


// s3.listObjectsV2({
//     Bucket: bucket,
//     Prefix: folder,
// }, (err, data) => {
//     data = data.Contents.map(item => item.Key);
//     data.shift();
//     data.forEach(item => {
//         console.log("mevzu bahis",item);
//         //find photos includes ates face with atesFaceId
//         rekognition.compareFaces({
//             SourceImage: {
//                 Bytes:fs.readFileSync("C:/Users/codercor/Documents/Amazon/Photos/masterchef/ates.jpg")
//             },
//             TargetImage: {
//                 S3Object: {
//                     Bucket: bucket,
//                     Name: item
//                 }
//         }
//         }, (err, data) => {
//             if (err) console.log(err, err.stack); // an error occurred
//             else     data.FaceMatches.length > 0 ? console.log(item) : null;
//         })
//     })
// });

// rekognition.indexFaces({
//     CollectionId: collectionId,
//     Image: {
//         S3Object: {
//             Bucket: bucket,
//             Name: folder+"/ates.jpg"
//         }
//     },
// }, (err, data) => {
//     if (err) {
//         console.log(err, err.stack); // an error occurred
//     } else {
//         console.log(data.FaceRecords[0].Face.FaceId);
//     }

// })
// s3.listObjects({
//     Bucket: "face-album-bucket"
// }, (err, data) => {
//     if (err) console.log(err);
//     //filter begins with a prefix
//     else {
//         rekognition.createCollection({
//             CollectionId: collectionId
//         }, (err, data) => {

//         })
//         let photos = (data.Contents.filter(item => item.Key.indexOf(folder) == 0)).map(item => item.Key);
//         photos.shift();
//         photos.forEach(photo => {
//             rekognition.indexFaces({
//                 CollectionId: collectionId,
//                 Image: {
//                          S3Object: {
//                           Bucket: "face-album-bucket", 
//                           Name: photo
//                          }
//                         }
//             },(err,data)=>{
//                 if(err)console.log(err);
//                 else console.log(data);
//             });
//         })
//     }
// })
// var s3 = new S3()
// s3.listObjects({
//     Bucket:"photos-for-my-example"
// },
// (err,data)=>{
//     if(err) console.log(err);
//     else {
//         let imageNames = [];
//         let result = []
//         data.Contents.forEach((item)=>imageNames.push(item.Key))
//         imageNames.forEach(item=>{
//             rekognition.searchFacesByImage(
//                 {
//                     CollectionId:"insanlar",
//                     Image:{
//                         S3Object:{
//                             Bucket:"photos-for-my-example",
//                             Name:item //IMG_20210728_103228.jpg
//                         }
//                     }

//                 },
//                 (err,data)=>{
//                     if(err)console.log(err);
//                     else {
//                         console.log(data);
//                         data.FaceMatches.forEach(face => {
//                             rekognition.listFaces({
//                                 CollectionId:"insanlar"
//                             },
//                             function(err, data) {
//                                      if (err) console.log(err, err.stack); // an error occurred
//                                      else     {
//                                          if(face.Face.FaceId == data.Faces[0].FaceId){
//                                              result.push(item)
//                                          }
//                                      }  
//                                    }
//                             )

//                         })
//                     }
//                 }

//             )
//         })
//        setTimeout(() => {
//          console.log(result);  
//        }, 15000);
//     }
// })


// rekognition.listFaces({
//     CollectionId:"suratlar"
// },
// function(err, data) {
//          if (err) console.log(err, err.stack); // an error occurred
//          else     console.log(data);    
//        }
// )

//potential 8914a419-14fb-48b2-8773-19662c5d5504




