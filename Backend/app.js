const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const Connectdb = require("./config/connectdb")
const userController = require('./Controller/UserController');
const musicController = require('./Controller/MusicController');
// const songController = require('./Controller/SongController')
// const upload = require('./config/multer')
const app = express()



app.use(cors())
app.use(express.json())
Connectdb()

app.use(fileUpload());
const PORT = 5001
app.listen(PORT, () => {
  console.log("Server Started")
})
// app.set('view engine', 'ejs');

// app.use(express.static('public'));
app.use("/uploads", express.static("./images"))

// app.get("/", (req, res) => {
//   res.render('home', { message: "hello" });

// })
// app.post('/add-music', (req, res) => {
//   res.render('addMusic.ejs');

// })

// app.use(fileUpload())

app.post("/user/Register", userController.Registretion)
app.post("/user/Login", userController.LoginUser)
// app.post("/user/song",songController.createSong)
app.post('/add', musicController.addMusic);
// app.post('/add',  upload.single('image'), musicController.addMusic);

app.get("/user/song/:id", musicController.getSongById)
app.get("/user/viewSong", musicController.viewSong)
