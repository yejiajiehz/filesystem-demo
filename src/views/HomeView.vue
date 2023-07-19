<template>
  <div class="home">
    <button v-if="!dirHandle" @click="chooseDirectory">选择文件夹</button>

    <div class="content" v-if="dirHandle" style="display: flex">
      <div class="tree" style="width: 500px">
        <Tree :data="tree" />
        <button @click="addFile">+ 新建文件</button>
      </div>

      <div style="flex: 1">
        <textarea v-model="fileContent"></textarea>
        <button @click="saveFile">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index"></script>
<style>
textarea {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
}
</style>
