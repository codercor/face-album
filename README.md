# face-album
Face album is using AWS Rekognition Service.
Face album's purpose is find your photos in s3 bucket  via  your uploaded selfie.
# Endpoints
## _User_
### Search Face By Selfie
- Request : http://localhost:3000/rekognition/searchFace [POST] [FormData]{selfie:file}
- Response : \[key:String](array) [JSON] //key structure folderName/photoName
### Get One Photo By Folder And Photo Name 
- Request : http://localhost:3000/s3/getOne/:folderName/:photoName
- Respone : Image file [image/jpg]
## _Uploader_
### Upload Images
- Request : http://localhost:3000/s3/upload [POST] [FormData]{folder:String,photos[]:files}
- Response : \[uploaded data:Object](array) [JSON]
