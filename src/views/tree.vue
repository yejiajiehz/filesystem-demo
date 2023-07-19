<template>
  <ul>
    <li v-for="item in data" :key="item.key">
      <span @click="showFile(item)">{{ item.key }}</span>
      <span @click="remove(item.key)">删除</span>
      <tree :data="item.children"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree",
  props: {
    data: Object,
  },
};
</script>
