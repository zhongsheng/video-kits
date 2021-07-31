const { exec } = require('child_process');
const path = require('path')
const platform = require("os").platform;

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
      compress_mp4: (file_path) => { compress_mp4(file_path) }
  }
)

function compress_mp4(file_path){
    cmd = `${ffmpeg()} -i '${file_path}' -vf scale=640:360 -r 20 '${file_path}.scaled.mp4' -hide_banner`
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

function ffmpeg() {
    let ffpath = ''
    console.log(platform())
    switch (platform()) {
    case "darwin":
        ffpath = path.join(__dirname, "../vendor/bin/mac/ffmpeg")
        console.log(ffpath)
        break;
    case "win32":
        ffpath = path.join(__dirname, "../vendor/bin/win32/ffmpeg")
        console.log(ffpath)
    }
    return ffpath
}
