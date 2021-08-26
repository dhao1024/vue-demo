<template>
  <div class="comments">
    <div
      class="comment"
      v-for="({ username, content, date, like, id, replys }, idx) in comments"
      :key="idx"
    >
      <section class="meta flex-container font-light">
        <div class="flex-container">
          <span class="avatar-container">
            <img
              class="avatar"
              :style="{
                backgroundColor: colorList[username.length % colorList.length],
              }"
            />
          </span>
          <span>
            <div>{{ username }}</div>
            <div>{{ date }}</div>
          </span>
        </div>
        <div class="flex-container">
          <span :class="liked[idx] && 'liked'" @click="clickLike(idx)">
            <icon-svg icon-name="icon-like" small />
            <span class="like-count">{{ like + (liked[idx] ? 1 : 0) }}</span>
          </span>
          <icon-svg
            icon-name="icon-comment"
            small
            @click="$emit('reply', username, id)"
          />
        </div>
      </section>

      <section class="content-reply">
        <p class="content">{{ content }}</p>
        <div class="reply" v-if="replys.length">
          <li
            v-for="({ username, content, to }, idx2) in replys.length <= max ||
            !hiddenReply[idx]
              ? replys
              : replys.slice(0, max)"
            :key="idx2"
            @click="$emit('reply', username, id)"
          >
            <span>{{ username }}</span>
            <span class="font-light" v-if="to !== comments[idx].username">
              回复
            </span>
            <span v-if="to !== comments[idx].username">{{ to }}</span>
            <span class="font-light">: </span>
            <span class="font-light">{{ content }}</span>
          </li>

          <div
            v-if="replys.length > max && hiddenReply[idx]"
            class="display"
            @click="hiddenReply[idx] = false"
          >
            展开全部{{ replys.length }}项回复
          </div>
          <div
            v-if="replys.length > max && !hiddenReply[idx]"
            class="display"
            @click="hiddenReply[idx] = true"
          >
            收起
          </div>
        </div>
      </section>
    </div>

    <v-tip :enable="isBusy" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import IconSvg from "@/svg/IconSvg.vue";
import VTip from "@/components/VTip.vue";

const colorList = [
  "indianred",
  "green",
  "greenyellow",
  "blueviolet",
  "paleturquoise",
];

const defaultArray = (bool = false) =>
  new Proxy([], {
    get(target, idx, receiver) {
      const res = Reflect.get(target, idx, receiver);
      if (typeof idx === "string" && !Number.isNaN(parseInt(idx, 10))) {
        return res == null ? bool : res;
      }
      return res;
    },
  });

export default {
  components: {
    IconSvg,
    VTip,
  },
  props: {
    comments: {
      default: [],
    },
    max: {
      type: Number,
      default: 3,
    },
  },
  emits: ["reply"],

  setup(props) {
    const state = reactive({
      liked: defaultArray(false),
      hiddenReply: defaultArray(true),
      isBusy: false,
    });

    let likeClicked = false;
    const clickLike = (idx) => {
      if (!likeClicked) {
        likeClicked = true;
        setTimeout(() => {
          likeClicked = false;
        }, 1000);
        state.liked[idx] = !state.liked[idx];
      } else if (!state.isBusy) {
        state.isBusy = true;
        setTimeout(() => {
          state.isBusy = false;
        }, 1000);
      }
    };

    return {
      ...toRefs(state),
      colorList,
      clickLike,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/index.less";

@avatar-size: 35px;

.comment {
  padding: 10px;
  .meta {
    font-size: @font-size-small;
    .avatar-container {
      width: @avatar-size;
      height: @avatar-size;
      padding: 3px;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .like-count {
      display: inline-block;
      width: 30px;
      text-align: left;
    }
    .liked {
      color: red;
    }
  }
  .content-reply {
    padding-left: @avatar-size;
    .content {
      margin: 5px 0;
    }
  }
}
.reply {
  background-color: #f0f0f0;
  padding: 10px;
}
.display {
  color: blue;
  margin-top: 10px;
}
</style>
