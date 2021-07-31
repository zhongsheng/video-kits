const { exec } = require('child_process');
const platform = require("os").platform;
const path = require('path')
const { app } = require('electron')

module.exports = class {
    constructor(file) {
        console.log(file)
        this.file = file
        // this.app_path = app.getAppPath()
    }

    exec() {
        let options = [
            '-vf scale=640:360',
            '-r 20'
        ].join(' ')
        let cmd = `${this.__ffmpeg} -i '${this.file}' ${options} '${this.__target}'`
        console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            alert('转换成功')
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
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
            ffpath = path.join(__dirname, "../vendor/bin/win32/ffmpeg")
            console.log(ffpath)
        }
        return ffpath
    }
}
