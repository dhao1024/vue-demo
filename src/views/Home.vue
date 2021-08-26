<template>
  <div class="main">
    <section class="header flex-container">
      <div class="font-bold">评论({{ comments.length }})</div>
      <div class="right flex-container" @click="addComment()">
        <icon-svg icon-name="icon-edit" />
        <span>添加评论</span>
      </div>
    </section>

    <section>
      <div class="no-comment" v-if="comments.length === 0">
        <img class="img" src="~@/assets/logo.png" />
        <div class="font-light">快来发表你的评论吧</div>
      </div>
      <v-comment v-else :comments="comments" @reply="addComment" />
    </section>

    <comment-input v-if="editting" :to="to" :id="id" @close="close" />
    <v-tip :enable="isBusy" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import IconSvg from "@/svg/IconSvg.vue";
import VTip from "@/components/VTip.vue";
import VComment from "@/components/VComment.vue";
import CommentInput from "@/components/CommentInput.vue";
import { getComment } from "@/service";

export default {
  components: {
    IconSvg,
    VTip,
    VComment,
    CommentInput,
  },

  setup() {
    const state = reactive({
      editting: false,
      to: "",
      id: 0,
      comments: getComment(),
      isBusy: false,
    });

    let operated = false;
    const addComment = (to, id) => {
      if (operated) {
        state.isBusy = true;
        setTimeout(() => {
          state.isBusy = false;
        }, 1000);
      } else {
        operated = true;
        setTimeout(() => {
          operated = false;
        }, 3000);

        state.editting = true;
        state.to = to;
        state.id = id;
      }
    };
    const close = () => {
      state.editting = false;
      state.comments = getComment();
    };

    return {
      ...toRefs(state),
      addComment,
      close,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/index.less";

.main {
  width: 100%;
}
.header {
  width: 100%;
  padding: 5px;
  font-size: @font-size-large;
  background-color: #f0f0f0;
  .right {
    color: blue;
  }
}
.no-comment {
  text-align: center;
  .img {
    width: 100px;
    height: 100px;
  }
}

.input-bar {
  position: fixed;
  background-color: #f0f0f0;
}
</style>
