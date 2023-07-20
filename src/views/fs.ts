// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle

export async function createFile(
  dirHandle: FileSystemDirectoryHandle,
  name = Date.now().toString()
) {
  const file = await dirHandle.getFileHandle(name, {
    create: true,
  });

  const writable = await file.createWritable();
  // writable.truncate(0);
  await writable.write(name);
  await writable.close();

  return file;
}

export function createFolder(
  dirHandle: FileSystemDirectoryHandle,
  name = Date.now().toString()
) {
  return dirHandle.getDirectoryHandle(name, {
    create: true,
  });
}

export async function getDirectory(dirHandle: FileSystemDirectoryHandle) {
  const array = [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for await (const [key, value] of dirHandle.entries()) {
    array.push({ key, value, children: [] });
  }
  return array;
}
