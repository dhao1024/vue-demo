<template>
  <router-view />
</template>

<style lang="less" >
@import "~@/style/index.less";

html {
  font-size: 10vmin;
}
body {
  margin: 0;
}
li {
  list-style: none;
}
p {
  margin: 0;
}
textarea {
  resize: none;
}
svg {
  display: inline-block;
  vertical-align: text-bottom;
  width: @icon-size;
  height: @icon-size;
  &.tiny {
    width: @icon-size-tiny;
    height: @icon-size-tiny;
  }
  &.small {
    width: @icon-size-small;
    height: @icon-size-small;
  }
}
* {
  box-sizing: border-box;
}
::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  font-size: @font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.font-bold {
  font-weight: bold;
}
.font-light {
  color: gray;
}
</style>
