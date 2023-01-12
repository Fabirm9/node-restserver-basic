const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadFile = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const cuttedName = file.name.split('.');
        const extention = cuttedName[cuttedName.length - 1];


        if (!allowedExtensions.includes(extention)) {
            return reject(`${extention} extention no allowed`)
        }

        const tempName = uuidv4() + '.' + extention;

        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve(tempName)
        });
    })


}

module.exports = {
    uploadFile
}