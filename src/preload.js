const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const Compress = require('./kits/compress.js')

contextBridge.exposeInMainWorld(
  'electron',
  {
    compress_mp4: (file_path, size, callback) => {
      new Compress(file_path).exec(size, callback)
    },
    open_dir: (file_path) => {
      console.log(file_path)
      ipcRenderer.send('open--dir', file_path)
    }
  }
)

