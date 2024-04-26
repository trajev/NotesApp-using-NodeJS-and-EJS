const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')) )
app.set('view engine', 'ejs')


app.get("/", (req,res)=>{
    fs.readdir('./files', function(err,files){
        res.render("index", {files: files} )
    })
})

app.post("/create", (req,res)=>{
    if( req.body.title!="" ){
        fs.writeFile( `./files/${req.body.title.split(" ").join('_')}.txt` , req.body.description , function(err){
            if(err) { console.log(err) }
            else {
                res.redirect('/'); 
                console.log("successfully created file") 
            }
        } )
    }
})

app.get("/edit/:filename", (req, res)=>{
    res.render("edit", {filename: req.params.filename} );
})

app.get('/file/:filename' , (req,res)=>{
    fs.readFile( `./files/${req.params.filename}` , 'utf-8' , (err, filedata)=>{
        res.render("fileview", {filename: req.params.filename, filedata: filedata});
    } )
})

app.post('/edit' , (req, res)=>{
    if( req.body.newtitle != "" ){
        fs.rename( `./files/${req.body.oldtitle.split(" ").join("_")}` , `./files/${req.body.newtitle.split(" ").join('_')}.txt`, (err)=>{
            console.log( req.body );
            if( err ){ console.log(err) }
            else {
                res.redirect('/');
            }
        })
    }
})

app.listen(3000, ()=>{
    console.log('Server Running at 3000!')
})


/*
to use ejs files - install ejs package and then set middleware and render page.
*/