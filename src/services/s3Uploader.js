const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const {Upload} = require("@aws-sdk/lib-storage");
const {v4: uuidv4} = require('uuid');

const s3Client = new S3Client({region: process.env.BUCKET_REGION});

exports.uploadFileToS3 = async (fileData, fileName, mimeType) => {
    const directoryPath = getDirectoryStructure();
    const bucketName = process.env.S3_BUCKET;
    const uniqueIdentifier = uuidv4();
    
    const sanitizedFileName = fileName.replace(/\s+/g, '-');
    const uniqueFileName = `${uniqueIdentifier}-${sanitizedFileName}`;

    try {
        const uploader = new Upload({
            client: s3Client,
            params: {
                Bucket: bucketName,
                Key: `${directoryPath}/${uniqueFileName}`,
                Body: fileData,
                ContentType: mimeType,
            },
        });

        const result = await uploader.done();
        return {
            location: result.Location,
            originalName: fileName,
            uniqueName: uniqueFileName
        };
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};


function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

function getDirectoryStructure() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0'); // JS months are 0-indexed
    const day = `${now.getDate()}`.padStart(2, '0');

    return `${year}/${month}/${day}`;
}
