var fs = require('fs');
var crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

let iv = crypto.randomBytes(16);
var covertedString = iv.toString('hex');
let originalSTring = Buffer.from(covertedString, 'hex');

/**
 * Its return Encrypted video on destination path.
 * @param {String }filename 
 */
function enpt(filename) {
  const inputfile = fs.createReadStream(filename);
  const encrypt = crypto.createCipheriv(algorithm, secretKey, originalSTring);
  const outputfile = fs.createWriteStream('1.mp4.enc');

  inputfile
    .pipe(encrypt)
    .pipe(outputfile)
    .on('finish', function () {
      console.log('done encrypting');
    }).on('error', error => {
      console.log("error on encrypting video", error);
    });
}

/**
 * it's return decrypted video from encryption.
 * @param {String} filename 
 */
function dnpt(filename) {
  const inputfile = fs.createReadStream(filename + '.enc');
  const encrypt = crypto.createDecipheriv(algorithm, secretKey, originalSTring);
  const outputfile = fs.createWriteStream(filename);

  inputfile
    .pipe(encrypt)
    .pipe(outputfile)
    .on('finish', function () {
      console.log('done decrypting');
    }).on('error', error => {
      console.log("error on decrypting", error);
    });
}

enpt('./1.mp4');
setTimeout(() => {
  dnpt('./1.mp4');
}, 5000);