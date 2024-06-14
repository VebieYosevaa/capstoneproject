const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'buckettry0101';

const getUserData = async (userId) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`users/${userId}.json`);
    const data = await file.download();
    return JSON.parse(data);
};

module.exports = getUserData;
