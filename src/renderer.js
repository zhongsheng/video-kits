// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const NOTIFICATION_TITLE = 'Hi Title'
const NOTIFICATION_BODY = 'HI'
const CLICK_MESSAGE = 'Notification clicked!'


const { exec } = require('child_process');

platform = require("os").platform;

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}


function submit(event){

    let files = document.getElementById('file').files

    if(files.length == 0) {
        alert('选择文件')
        return
    }
    let files_ary = Array.from(files);

    files_ary.forEach( file => {
        console.log(file.path)
        compress_mp4(file.path)
        document.getElementById('info').innerHTML = `${file.name} 开始转换, 请稍候`
    } )

    console.log(123)
    return
}

function compress_mp4(file_path){
    exec(`ffmpeg -i ${file_path} -vf scale=640:360 -r 20 ${file_path}.scaled.mp4 -hide_banner`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        alert('转换成功')
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
