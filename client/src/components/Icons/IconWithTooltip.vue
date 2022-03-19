<template>
  <v-tooltip top :color="color">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        small
        :color="color"
        class="mr-1"
        v-bind="attrs"
        v-on="on"
        >mdi-{{ mdi }}</v-icon
      >
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
		color: {
			type: String,
			default: ""
		},
		mdi: String,
		text: String
	},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>