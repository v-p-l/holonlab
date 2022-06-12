<template>
  <v-btn icon @click="toggleDarkMode()">
    <v-icon>
      {{ darkMode ? "mdi-weather-sunny" : "mdi-weather-night" }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("utilities", ["darkMode"]),
  },
	methods: {
		...mapMutations("utilities", ["updateDarkMode"]),
		toggleDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.updateDarkMode();
		}
	}
};
</script>