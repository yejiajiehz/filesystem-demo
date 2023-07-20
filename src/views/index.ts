import { onMounted, reactive, ref, watch } from "vue";

import { createFolder, createFile, getDirectory } from "./fs";
import Tree from "./tree.vue";
import { initDb } from "./db";

export default {
  name: "App",
  components: { Tree },
  setup() {
    const dirHandle = ref<FileSystemDirectoryHandle>();
    const tree = reactive<any[]>([]);

    const chooseDirectory = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dirHandle = dirHandle.value = await window.showDirectoryPicker({
        mode: "readwrite",
      });

      addFs(dirHandle.value);

      refreshTree();
    };

    let getFs: any, addFs: any;
    onMounted(() => {
      const r = initDb(async () => {
        dirHandle.value = await getFs();
        if (dirHandle.value) {
          refreshTree();
        }
      });

      getFs = r.getFs;
      addFs = r.addFs;
    });

    const refreshTree = async () => {
      tree.length = 0;
      if (dirHandle.value) {
        tree.push(...((await getDirectory(dirHandle.value)) || []));
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
    let prevFileContent = "";
    let currFileHandle: FileSystemFileHandle;
    let currFolderHandle: FileSystemDirectoryHandle;

    const showFile = async (item: {
      key: string;
      value: FileSystemFileHandle | FileSystemDirectoryHandle;
      children: any[];
    }) => {
      if (item.value.kind === "file") {
        const file = await item.value.getFile();
        fileContent.value = await file.text();
        currFileHandle = item.value;
        prevFileContent = fileContent.value;
      } else {
        item.children = await getDirectory(item.value);
        currFolderHandle = item.value;
      }
    };

    async function saveFile() {
      const writable = await currFileHandle.createWritable();
      // writable.truncate(0);
      await writable.write(fileContent.value);
      await writable.close();
      alert("保存成功！");
      prevFileContent = fileContent.value;
    }

    const syncContent = async () => {
      if (!currFileHandle) return;
      if (prevFileContent !== fileContent.value) return;

      const file = await currFileHandle.getFile();
      fileContent.value = await file.text();
      prevFileContent = fileContent.value;
    };

    let timid = 0;
    function time() {
      clearTimeout(timid);
      timid = setTimeout(async () => {
        try {
          await syncContent();
          time();
        } catch (e) {
          clearTimeout(timid);
        }
      }, 1000);
    }

    time();

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
