<template>
  <ul>
    <li v-for="item in data" :key="item.key">
      <span @click="$emit('showFile', item)">{{ item.key }}</span> &nbsp;
      <span @click="$emit('remove', item.key)">删除</span>
      <f-tree v-if="item.children.length" :data="item.children" v-bind="$attrs" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "f-tree",
  props: {
    data: Object,
  },
};
</script>
