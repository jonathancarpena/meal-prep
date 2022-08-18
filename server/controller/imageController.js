const fs = require('fs')

const imageFolder = `${__dirname.split('controller')[0]}\\data\\images`
const get_Image = async (req, res) => {
    const { imgName } = req.params

    try {
        const imgPath = `${imageFolder}\\${imgName}`

        const img = fs.readFileSync(imgPath)

        if (!img) {
            throw new Error()
        }
        //response header, use set
        res.set('Content-Type', 'image/jpeg')
        res.send(img)
    } catch (e) {
        res.status(404).send(imgName)
    }
}

module.exports = get_Image