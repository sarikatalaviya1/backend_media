// const mongoose = require("mongoose");

// class MediaModel {
//     constructor() {
//         this.schema = new mongoose.Schema({
//             name: { type: String, required: true },
//             extension: { type: String, required: true },
//             path: { type: String, required: true },
//             mimetype: { type: String, required: true },
//             size: { type: Number, required: true }, 
//             TrackTiming: { type: String, required: true },
//             Image: { type: String, required: true },
//             singerName: { type: String, required: true },
//         }, {
//             timestamps: true
//         });
//         this.model = mongoose.model('Media', this.schema);
//     }

//     insertAudio(audioDetails) {
//         return this.model.create(audioDetails);
//     }

//     getAudio() {
//         return this.model.find(
//             { $or: [{ mimetype: "image" }, { mimetype: "audio" }] },
//             { name: true, mimetype: true, size: true, url: { $concat: ["http://localhost:5001", "$path"] } }
//         );
//     }
// }

// const mediaModel = new MediaModel();
// module.exports = mediaModel;

const mongoose = require('mongoose');

  const musicSchema = new mongoose.Schema({
    songName: { type: String, required: true },
    songURL: { type: String, required: true },
    trackTiming: { type: Number, required: true },    
    image: { type: String, required: true },
    singerName: { type: String, required: true },
    type: { type: String, required: true },
  //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
