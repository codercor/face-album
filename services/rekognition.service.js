// const { Rekognition, Service, Config,S3 } = require("aws-sdk");
// require('dotenv').config()
// const config = new Config({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// })

// const rekognition = new Rekognition({
//     region: "us-east-1",

// });
// rekognition.createCollection({
//     CollectionId:"insanlar"
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
//     CollectionId:"suratlar",
// },(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// }
//     )

// rekognition.deleteCollection({
//     CollectionId:"suratlar",
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




