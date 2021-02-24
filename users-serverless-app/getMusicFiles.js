const dbService = require("./dbService");
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

function getMusicFiles(value) {
  const params = {
    Bucket: "fv-training-pooja-s3bucket", // pass bucket name
    Key: value, // file will be saved as testBucket/contacts.csv
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, function (error, data) {
      log.info("getMusicFiles", log.methodStart);
      if (error) {
        log.error(
          "getMusicFiles",
          "Error in getMusicFiles function " + error.message
        );
        reject(params, error);
      } else {
        var result = data.Body.toString("base64");
        resolve(result);
        log.info("getMusicFiles", log.methodEnd);
      }
    });
  });
}

module.exports = { getMusicFiles };
