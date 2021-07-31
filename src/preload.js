const { contextBridge, ipcRenderer } = require('electron')

const Compress = require('./kits/compress.js')

contextBridge.exposeInMainWorld(
  'electron',
  {
      compress_mp4: (file_path) => {
          new Compress(file_path).exec()
      }
  }
)

