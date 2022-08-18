const fs = require('fs')

// Image Uploader
const multer = require("multer")
const sharp = require('sharp')

// Utils
const { replaceSpaces } = require('../lib/utils.js')


const imageFolder = `${__dirname}\\data\\images\\`

function checkIfDuplicates(filename) {
    fs.access(imageFolder, (err) => {
        if (err) {
            fs.mkdirSync(imageFolder)
        }
    })

    fs.readdir(imageFolder, function (err, filenames) {
        if (err) {
            console.error(err)
            return
        } else {
            for (const item of filenames) {
                const currentPath = `${imageFolder}/${item}`
                const imageName = currentPath.split('_')[1]
                if (imageName.toLowerCase() === filename.toLowerCase()) {
                    fs.unlinkSync(currentPath)
                }
            }

        }
    })
}

console.log('MIDDLEWARE: Upload')


const storage = multer.memoryStorage()

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkIfDuplicates(file.originalname)
        cb(null, true);
    }
})

async function resizeImg(req, res, next) {

    const fileExt = req.file.originalname.split('.')[1]
    const fileName = `${replaceSpaces(req.body.text)}.${fileExt}`

    if (req.file === undefined) {
        next()
    } else {
        const filename = new Date().toISOString().replace(/:/g, '-') + '_' + fileName
        await sharp(req.file.buffer)
            .resize({ width: 500, height: 500 })
            .toFile(imageFolder + filename)

        req.file.filename = filename
        next();
    }

}

module.exports = {
    upload,
    resizeImg
}

