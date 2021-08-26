<template>
  <form
    class="comment-input"
    @submit.prevent="addComment({ username, email, content, to, id })"
  >
    <section class="form-item">
      <label for="username" class="left">用户名</label>
      <input
        type="text"
        id="username"
        class="right"
        v-model="username"
        required
        autofocus
      />
    </section>
    <section class="form-item">
      <label for="email" class="left">邮箱</label>
      <input type="email" id="email" class="right" v-model="email" />
    </section>
    <section class="form-item">
      <label for="content" class="left">评论</label>
      <textarea
        rows="5"
        id="content"
        v-model="content"
        class="right"
        required
      ></textarea>
    </section>
    <section class="action">
      <span>
        <label for="submit" class="button">完成</label>
        <input type="submit" id="submit" hidden />
      </span>
      <span class="button" @click="$emit('close')">取消</span>
    </section>
  </form>
</template>

<script>
import { reactive, toRefs } from "vue";
import { postComment } from "@/service";

export default {
  props: {
    to: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  emits: ["close"],

  setup(props, { emit }) {
    const state = reactive({
      username: "",
      email: "",
      content: "",
    });

    const addComment = (comment) => {
      postComment(comment);
      emit("close");
    };

    return {
      ...toRefs(state),
      addComment,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/index.less";

.comment-input {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  padding: 10px;
  background-color: #f0f0f0;
  border: 2px solid black;
  border-radius: 5%;
  .form-item {
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
    .left {
      width: 25%;
      text-align: center;
    }
    .right {
      width: 75%;
      text-align: left;
    }
  }
}
.action {
  margin: 10px 0;
  text-align: center;
  .button {
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 10px;
  }
}
</style>
