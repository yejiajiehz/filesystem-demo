// 使用 fileSystem 下载，不建议在生产环境使用
// 参考 https://github.com/jimmywarting/native-file-system-adapter/blob/3.0.0/src/adapters/downloader.js
export async function downloadByFileSystem(url: string, filename: string) {
  console.warn('FileSystem is experimental. Expect behavior to change in the future.');
  // chrome & edge 86+, safari & firefox no support
  // https://caniuse.com/?search=showSaveFilePicker
  if ('showSaveFilePicker' in window) {
      try {
          const response = await fetch(url);
          const stream = response.body;

          // @ts-ignore
          const handle: FileSystemFileHandle = await window.showSaveFilePicker({
              id: 'GD_DAM_WEB_FS_DOWNLOAD_ID',
              startIn: 'downloads',
              // 不提供 name 会导致，默认下载的文件名非法
              suggestedName: filename,
          });
          const writable = await handle.createWritable();

          // Use the pipeTo method to consume the stream and write it to the file stream
          await stream.pipeTo(writable);
      } catch (_e) {
          console.error(`fetch remote file failed: ${url}.`);
      }
  } else {
      console.log('FileSystem is not supported in this browser.');
  }
}
