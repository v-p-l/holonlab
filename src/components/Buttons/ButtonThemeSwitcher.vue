<template>
  <ButtonDefault
    small
    :iconOnly="true"
    :icon="darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    @action="toggleDarkMode()"
  ></ButtonDefault>
</template>

<script>
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ButtonDefault
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