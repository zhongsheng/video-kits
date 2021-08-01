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
        // let options = [
        //     `-vf scale=${size}`,
        //     '-r 20'
        // ].join(' ')
        // let cmd = `${this.__ffmpeg} -i ${this.file} ${options} ${this.__target}`
        // console.log(cmd)
        ffmpeg(this.file).output(this.__target).outputOptions([
            '-r 20'
        ]).size(`${size}%`).on('end', function() {
            console.log('Finished processing');
            callback.call()
        }).run()
    }

    get __target(){
        const regex = /\.mov$|\.mp4$/i;
        return this.file.replace(regex, '_resized.mp4')
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
