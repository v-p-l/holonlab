<template>
  <v-app-bar app flat color="background">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown"
      class="mr-2"
      @click="updateNavBar()"
    ></v-app-bar-nav-icon>
    <Logo v-if="$vuetify.breakpoint.smAndDown"></Logo>
    <v-spacer></v-spacer>
    <div class="d-flex flex-row align-center" :style="isLoggedIn ? { 'gap': '8px' } : { '': '' }">
      <ButtonNotifications v-if="isLoggedIn" />
      <ButtonThemeSwitcher />
      <div class="ml-4">
        <ButtonLogin v-if="!isLoggedIn" />
        <ButtonUserMenu v-if="isLoggedIn" />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import Logo from "@/components/Logo/Logo.vue";
import ButtonNotifications from "@/components/Buttons/ButtonNotifications.vue";
import ButtonThemeSwitcher from "@/components/Buttons/ButtonThemeSwitcher.vue";
import ButtonLogin from "@/components/Buttons/ButtonLogin.vue";
import ButtonUserMenu from "@/components/Buttons/ButtonUserMenu.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Logo,
    ButtonNotifications,
    ButtonThemeSwitcher,
    ButtonUserMenu,
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