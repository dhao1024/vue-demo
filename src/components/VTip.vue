<template>
  <div class="tip" v-if="enable">
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    enable: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "操作太频繁",
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
  border-radius: 25px;
  background-color: black;
}
.message {
  display: block;
  color: white;
  text-align: center;
  padding: 40px 0;
}
</style>
