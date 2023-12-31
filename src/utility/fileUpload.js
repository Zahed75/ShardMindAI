// // Step 1: Import the S3Client object and all necessary SDK commands.
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import Axios from 'axios';
// import { BadRequest } from './error.js';

// const objectStorage = 'https://shardmind.nyc3.digitaloceanspaces.com';

// const axios = Axios.create({
//   baseURL: objectStorage,
// });








// // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
// const uploadObject = async () => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(params));
//     console.log(
//       "Successfully uploaded object: " +
//         params.Bucket +
//         "/" +
//         params.Key
//     );
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };


// // Step 5: Call the uploadObject function.
// uploadObject();
