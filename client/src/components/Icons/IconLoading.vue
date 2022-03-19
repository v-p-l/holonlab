<template>
  <v-progress-circular
    indeterminate
    :color="color"
		:size="size"
		:width="width"
  ></v-progress-circular>
</template>

<script>
export default {
  props: {
		color: {
			type: String,
			default: "white"
		},
		size: {
			type: String,
			default: "20"
		},
		width: {
			type: String,
			default: "3"
		},
	},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>