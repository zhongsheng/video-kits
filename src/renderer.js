// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


function submit(event){
    let files = document.getElementById('file').files
    if(files.length == 0) {
        alert('选择文件')
        return
    }
    let files_ary = Array.from(files);
    files_ary.forEach( file => {
        console.log(file.path)
        electron.compress_mp4(file.path)
        document.getElementById('info').innerHTML = `${file.name} 开始转换, 请稍候`
    } )
}

