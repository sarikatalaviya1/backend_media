const mediaModel = require('../Model/MediaModel');
const randomstring = require("randomstring");

class SongController {
    async createSong(req, res) {
        try {
            const file = req?.files?.audioFile;
            console.log(file)
            if (!file) {
                return res.status(400).send({ message: "File not provided" });
            }

            let name = randomstring.generate({ length: 11 });
            let extension = file.name.split(".").pop(); 
            let mimetype = file.mimetype.split("/")[0];
            let path = `./user/song${mimetype}/${name}.${extension}`;

            await file.mv(path);

            const audio = {
                name,
                extension,
                mimetype,
                path: path.substring(1),
                size: file.size,
                TrackTiming: 0, 
                Image: "default.jpg",
                singerName: "Unknown",
            };

            const result = await mediaModel.insertAudio(audio);
            return res.status(200).send({ data: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async viewSong(req, res) {
        try {
            const result = await mediaModel.getAudio();
            return res.status(200).send({ message: "Success", data: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async getSongById(req, res) {
        try {
            const { id } = req.params;
            const result = await mediaModel.model.findById(id);
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

const songController = new SongController();
module.exports = songController;
