<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click="updateNavBar()"></v-app-bar-nav-icon>
    <v-img
      :src="require('@/assets/logo.svg')"
      max-height="30px"
      max-width="30px"
      alt="logo"
      contain
    ></v-img>
    <v-spacer></v-spacer>
    <ThemeSwitcher class="mr-4" />
    <ButtonLogin v-if="!isLoggedIn" />
    <UserMenu v-if="isLoggedIn" />
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher.vue";
import UserMenu from "@/components/AppBar/UserMenu.vue";
import ButtonLogin from "@/components/AppBar/ButtonLogin.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ThemeSwitcher,
    UserMenu,
    ButtonLogin,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
		...mapMutations("utilities", ["updateNavBar"]),
  },
};
</script>