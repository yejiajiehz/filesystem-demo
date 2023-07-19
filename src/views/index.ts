import { ref, watch } from "vue";

import { createFolder, createFile, getDirectory } from "./fs";
import Tree from "./tree.vue";

export default {
  name: "App",
  components: { Tree },
  setup() {
    const dirHandle = ref<FileSystemDirectoryHandle>();
    const tree = ref<any[]>([]);

    const chooseDirectory = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dirHandle = dirHandle.value = await window.showDirectoryPicker({
        mode: "readwrite",
      });

      refreshTree();
    };

    const refreshTree = async () => {
      if (dirHandle.value) {
        tree.value = (await getDirectory(dirHandle.value)) || [];
      }
    };

    const addFile = async () => {
      await createFile(dirHandle.value!);
      await refreshTree();
    };

    const remove = async (key: string) => {
      await dirHandle.value?.removeEntry(key);
      await refreshTree();
    };

    const fileContent = ref("");
    const currFileHandle = ref();
    const showFile = async (item: {
      key: string;
      value: FileSystemFileHandle | FileSystemDirectoryHandle;
    }) => {
      if (item.value.kind === "file") {
        const file = await item.value.getFile();
        fileContent.value = await file.text();
        currFileHandle.value = item;
      } else {
        alert("暂时不支持文件夹");
      }
    };

    async function saveFile() {
      const writable = await currFileHandle.value.value.createWritable();
      // writable.truncate(0);
      await writable.write(fileContent.value);
      await writable.close();
      alert("保存成功！");
    }

    return {
      chooseDirectory,
      dirHandle,
      addFile,
      getDirectory,
      tree,
      remove,
      fileContent,
      showFile,
      saveFile,
    };
  },
};
