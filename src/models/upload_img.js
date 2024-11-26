"use strict"
const { Storage } = require('@google-cloud/storage')
const path = require('path');

const path_key = path.resolve('serviceaccount.json')

const gcs = new Storage({
    projectId: 'c242-ps119',
    keyFilename: path_key
})

console.log("path_key", path_key);

const bucket_name = 'daunsehat'
const bucket = gcs.bucket(bucket_name)

async function upload_to_gcs (file, folder_name){
    return new Promise((resolve, reject) => {
        const date = new Date().toISOString().replace(/:/g, '-');
        const name = `${folder_name}/${date}`;
        const blob = bucket.file(name);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket_name}/${name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
}

module.exports = { upload_to_gcs }