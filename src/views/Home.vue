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

    <comment-form
      v-if="openCommentForm"
      :mentionedComment="mentionedComment"
      @submit="flushComment"
      @close="openCommentForm = false"
    />
    <v-tip :enable="isBusy" />
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import IconSvg from "@/svg/IconSvg.vue";
import VTip from "@/components/VTip.vue";
import VComment from "@/components/VComment.vue";
import CommentForm from "@/components/CommentForm.vue";
import { getComment } from "@/service";

export default {
  components: {
    IconSvg,
    VTip,
    VComment,
    CommentForm,
  },

  setup() {
    const state = reactive({
      error: "",
      loading: false,
      comments: [],
      openCommentForm: false,
      mentionedComment: {
        usrname: "",
        id: 0,
      },
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

        state.openCommentForm = true;
        state.mentionedComment.usrname = to;
        state.mentionedComment.id = id;
      }
    };
    const flushComment = async () => {
      state.error = "";
      state.loading = true;
      try {
        state.comments = await getComment();
        state.comments.push(1);
        state.comments.pop(1);
      } catch (err) {
        state.error = err.message;
      }
      state.loading = false;
    };

    onMounted(() => {
      flushComment();
    });

    return {
      ...toRefs(state),
      addComment,
      flushComment,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/index.less";

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
</style>
