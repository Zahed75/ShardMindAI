// service.js
const { s3Client } = require('../../utility/digitalOcenStorage');
 // Import your S3 client configuration
const { PutObjectCommand } = require("@aws-sdk/client-s3");

class FileService {
  async uploadFile(file, userId) {
    try {
      const uploadParams = {
        Bucket: 'shardmind', // Replace with your DigitalOcean Space name
        Key: `users/${userId}/${file.originalname}`, // Modify the key as needed
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadCommand = new PutObjectCommand(uploadParams);
      const result = await s3Client.send(uploadCommand);
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

module.exports = new FileService();

