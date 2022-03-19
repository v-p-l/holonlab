<template>
  <v-fade-transition mode="out-in">
    <v-icon
      @click="toggleDarkMode()"
    >
      {{ darkMode ? "mdi-weather-sunny" : "mdi-weather-night" }}
    </v-icon>
  </v-fade-transition>
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