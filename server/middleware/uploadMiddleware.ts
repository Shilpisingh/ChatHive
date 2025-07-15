import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
});

export const uploadFileToS3 = async (
  buffer: Buffer,
  originalName: string,
  mimetype: string,
  folder = "avatars"
): Promise<string> => {
  const fileName = `${folder}/${Date.now()}-${originalName}`;

  console.log("Uploading file to S3:", process.env);
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
    //ACL: "public-read",
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
};

export default uploadFileToS3;
