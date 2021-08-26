<template>
  <icon-base>
    <component :is="iconName" />
  </icon-base>
</template>

<script>
import { defineAsyncComponent as _ } from "vue";
import IconBase from "./IconBase.vue";

const components = { IconBase };
const r = require.context("@/svg/icons/", true, /.*\.vue$/);
r.keys().forEach((path) => {
  const name = path.slice(2, -4);
  components[name] = _(() => import(`@/svg/icons/${path.slice(2)}`));
});

export default {
  props: {
    iconName: "",
  },
  components,
};
</script>
