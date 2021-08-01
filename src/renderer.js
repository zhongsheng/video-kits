// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


function submit(btn){
    let files = document.getElementById('file').files
    let result = document.getElementById('info')
    if(files.length == 0) {
        alert('选择文件')
        return
    }

    btn.style.display = 'none'
    let counter = 0
    let files_ary = Array.from(files);
    const size = document.getElementById('size').value
    files_ary.forEach( file => {
        let div = document.createElement('div')
        counter++
        console.log(file.path)
        electron.compress_mp4(file.path, size, (target)=> {
            counter--
            if(counter == 0) btn.style.display = ''
            div.innerHTML = `<p class='text-green-500'>${file.name}
<button class='bg-yellow-300 text-gray-900' onclick='electron.open_dir("${target}")'>打开</button>
</p>`
        })

        div.innerHTML = `<p>${file.name} 转换开始</p>`
        result.appendChild(div)
    } )
}

