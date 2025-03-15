import express from "express"
import cors from "cors"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app=express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser())


// using multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/src/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })


app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file
     res.status(200).json(file.filename)
  })



app.use("/api/posts",postRoutes)
// app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


app.listen(8800,()=>{
    console.log("connected")
})