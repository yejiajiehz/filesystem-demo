<template>
  <div class="home">
    <button v-if="!dirHandle" @click="chooseDirectory">Choose Directory</button>
    <button v-else-if="requestedPermission" @click="askPermission">Permission {{ dirHandle.name }}</button>

    <div class="content" v-else-if="dirHandle" style="display: flex">
      <div class="tree" style="width: 500px">
        <Tree :data="tree" @showFile="showFile" @remove="remove" />
        <button @click="addFile">+ New File</button>
      </div>

      <div style="flex: 1">
        <textarea v-model="fileContent"></textarea>
        <button @click="saveFile">Save</button>
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
