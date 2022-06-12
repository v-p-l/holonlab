<template>
  <v-app-bar app flat color="background">
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="updateNavBar()"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <Notifications v-if="isLoggedIn" />
    <ThemeSwitcher class="mr-2" />
    <ButtonLogin v-if="!isLoggedIn" />
    <UserMenu v-if="isLoggedIn" />
  </v-app-bar>
</template>

<script>
import Notifications from "@/components/AppBar/Notifications.vue";
import ThemeSwitcher from "@/components/AppBar/ThemeSwitcher.vue";
import UserMenu from "@/components/AppBar/UserMenu.vue";
import ButtonLogin from "@/components/AppBar/ButtonLogin.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Notifications,
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