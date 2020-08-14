const fs = require("fs");
const mime = require('mime-types');
const formidable = require('formidable')

let currentDir = __dirname; //this variable contains the current user directory


// main route
async function main(req, res){
    console.log(`Device: ${req.ip} connected!`)
    let command;
    let files, fileArray;

    //verifying which kind of command was used by user
    if(req.body.command){
        //returning to main folder
        if(req.body.command == '../'){
            command = __dirname;
            currentDir = __dirname;
        }
        //return one folder back
        else if(req.body.command == './'){
            const lastBackslash = currentDir.lastIndexOf('\\') != -1 ? currentDir.lastIndexOf('\\') : currentDir.lastIndexOf('/');
            if(lastBackslash != -1){
                currentDir = currentDir.slice(0, lastBackslash);
                command = currentDir.slice(0, lastBackslash);
            }else{
                command = __dirname;
                currentDir = __dirname;
            }
        }
        //the 'new' command followed by a path sends the user to the chosen path
        else if(req.body.command.split(' -> ')[0] == 'new'){ 
            command = req.body.command.split(' -> ')[1];
            currentDir = req.body.command.split(' -> ')[1];
        }
        // otherwise it would just go to the next folder selected
        else{
            command = `${currentDir}\\${req.body.command}`;
            currentDir = `${currentDir}\\${req.body.command}`;
        }

    }
    // in this case there was no command.
    else{
        command = currentDir;
    }


    try {
        //getting the files from the current folder and returning an array with [file-name,
        // file-type (image, video, application, etc.) and the current folder of the file]
        files = await fs.promises.readdir(command);
        fileArray = files.map((item)=>{
            const fileExt = mime.lookup(item.split('.').pop());
            if(fileExt == false) return [item, 'folder'];
            else{
                const fileType = fileExt.split('/')[0];
                return [item, fileType, currentDir];
            }
    
        })
    } catch (error) {
        command = "Error in selected directory";
    }

    

    const response = {fileArray, currentDir}
    return await res.render("index.html", {response});
}

// this route will be accessed when the user clicks on any file on the screen.

function downloadFrom(req, res){
    var file = req.params.file;
    console.log(`Sending file ${file} to device's ${req.ip}`);
    res.download(file);
}

function uploadTo(req, res){
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) =>{
        if(err) throw err;

        const oldPath = files.myFile.path;
        const newPath = `${currentDir}\\${files.myFile.name}`;
        fs.rename(oldPath, newPath, (err) =>{
            if(err) throw err;
            console.log(`File received: ${files.myFile.name} \n in folder ${currentDir}`);

        })
    })
    res.redirect('/');
}


module.exports = {
    main,
    downloadFrom,
    uploadTo
}