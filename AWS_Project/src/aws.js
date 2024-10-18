import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_S3_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_S3_ACCESS_SECRET_KEY
  }
});

export default s3Client;