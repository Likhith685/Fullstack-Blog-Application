import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res)=>{
      
    // checking existing user
    const q ="SELECT * FROM users WHERE email=? OR username=?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.json(409).json("USER already exists")


        // hash the password using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt);


        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q,[values],(err,data) => {
            if(err) return res.json(err);
            return res.status(200).json("User has been created");
        })

    })
}

export const login =(req,res) =>{
    // checking user exists or not
    const q="SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("USER NOT found")
        
        // check password is correct or not
        const ispasswordcorrect = bcrypt.compareSync(req.body.password,data[0].password);

        if(!ispasswordcorrect) return res.status(400).json("Wrong username or password")

        // using jwt 
        const token = jwt.sign({id:data[0].id},"jwtkey");
        const {password,...other}=data[0];

    
        res.cookie("access_token",token,{
          httpOnly:true 
        }).status(200).json(other);
    })
}

export const logout = (req,res)=>{

    res.clearCookie("access_token",{
        httpOnly:true
    }).status(200).json("User has been successfully logged out")

}