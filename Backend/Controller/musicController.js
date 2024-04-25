const Music = require('../Model/MediaModel');
const fs = require('fs');
const randomstring = require('randomstring');

class MusicController {
    async addMusic(req, res) {
        try {
            let { image } = req.files
            const { songName, songURL, trackTiming, singerName, type } = req.body;
            let name = randomstring.generate({
                length: 10
            })
            let ext = image.name.split('.')
            ext = ext[ext.length - 1]
            name = name + "." + ext
            const filepath = `./images/${name}`

            await image.mv(filepath)

            image = `http://localhost:5001/uploads/${name}`
            console.log(image)
            const result = await Music.create({ ...req.body, image: image })
            if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })
            res.status(201).json({ message: 'Music added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async viewSong(req, res) {
        try {
            const result = await Music.find();
            return res.status(200).send({ message: "Success", data: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async getSongById(req, res) {
        try {
            const { id } = req.params;
            const result = await Music.findById(id);
            if (!result) {
                return res.status(404).send({ message: "Song not found" });
            }
            return res.status(200).send({ message: "Success", data: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

}

const musicController = new MusicController();

module.exports = musicController