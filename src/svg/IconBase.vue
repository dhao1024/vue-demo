
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    :class="[tiny && !small && 'tiny', !tiny && small && 'small']"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: { type: String, default: "currentColor" },
    tiny: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
  },
};
</script>
