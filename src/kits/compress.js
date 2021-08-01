const { exec } = require('child_process');
const platform = require("os").platform;
const path = require('path')
const { app } = require('electron')
const chmodSync = require('fs').chmodSync
const ffmpeg = require('fluent-ffmpeg');


module.exports = class {
    constructor(file) {
        console.log(file)
        this.file = file
        ffmpeg.setFfmpegPath(this.__ffmpeg);
    }

    exec(size, callback) {
        ffmpeg(this.file).output(this.__target).outputOptions([
            '-r 20'
        ]).size(`${size}%`).on('end', ()=>{
            callback(this.__target)
        }).run()
        return this
    }

    get __target(){
        const regex = /\.mov$|\.mp4$/i;
        return path.normalize(
             this.file.replace(regex, '_resized.mp4')
        )
    }

    get __ffmpeg(){
        let ffpath = ''
        switch (platform()) {
        case "darwin":
            ffpath = path.join(__dirname, "../../vendor/bin/mac/ffmpeg")
            console.log(ffpath)
            break;
        case "win32":
            ffpath = path.join(__dirname, "../../vendor/bin/win32/ffmpeg.exe")
           
            console.log(ffpath)
        }
        chmodSync(ffpath,0x1ed)
        //process.chdir(path.join(__dirname, "../../vendor/bin/win32"))
        return ffpath  // 'ffmpeg.exe'
    }
}
