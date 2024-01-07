// service.js
const { s3Client } = require('../../utility/digitalOcenStorage');
const { S3, PutObjectCommand,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { BadRequest } = require('../../utility/errors');
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");

// Upload File
const uploadFile = async (file, userId) => {
  try {
    const uploadParams = {
      Bucket: 'shardmind.ai', // Replace with your DigitalOcean Space name
      Key: `users/${userId}/${file.originalname}`, // Modify the key as needed
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    const result = await s3Client.send(uploadCommand);
    return { ...result, originalFilename: file.originalname };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};






// Get All Files
const getAllFiles = async (userId) => {
  try {
    const listParams = {
      Bucket: 'shardmind.ai', // Digital Ocean Bucket Name
      Prefix: `users/${userId}/`,
    };

    const listCommand = new ListObjectsV2Command(listParams);
    const result = await s3Client.send(listCommand);

    // Ensure that Contents array is available before mapping
    const files = result.Contents ? result.Contents.map(item => ({
      Key: item.Key,
      LastModified: item.LastModified,
      Size: item.Size,
    })) : [];

    return files;
  } catch (error) {
    console.error('Error getting files:', error);
    throw error;
  }
};




//Remove File from Bucket

// Remove Specific File
const removeFile = async (userId, fileKey) => {
  try {
    const deleteParams = {
      Bucket: 'shardmind.ai', // Digital Ocean Bucket Name
      Key: `users/${userId}/${fileKey}`,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    const result = await s3Client.send(deleteCommand);

    return result;
  } catch (error) {
    console.error('Error removing file:', error);
    throw error;
  }
};



module.exports = {
  uploadFile,
  getAllFiles,
  removeFile
  
};
