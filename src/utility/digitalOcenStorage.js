// s3Config.js
const { S3 } = require("@aws-sdk/client-s3");

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint:"https://nyc3.digitaloceanspaces.com/shardmind.ai/",
    region: "nyc3",
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    }
});

module.exports = { s3Client };



