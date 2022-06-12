<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <Navbar />
    <Appbar />
    <v-main>
      <div class="d-flex flex-column justify-start align-start px-4 py-6" style="height: 100%">
        <AlertVerifyEmail v-if="isLoggedIn && !isEmailVerified" class="mb-4" />
        <slot></slot>
      </div>
    </v-main>
		<Footer />
    <DialogLogin v-if="!isLoggedIn" />
    <DialogForgotPassword v-if="!isLoggedIn" />
    <DialogVerifyEmail v-if="isLoggedIn && !isEmailVerified" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Appbar from "@/components/AppBar/AppBar.vue";
import Navbar from "@/components/NavBar/NavBar.vue";
import Footer from "@/components/Footer/Footer.vue";
import DialogLogin from "@/components/Dialogs/DialogLogin.vue";
import DialogForgotPassword from "@/components/Dialogs/DialogForgotPassword.vue";
import DialogVerifyEmail from "@/components/Dialogs/DialogVerifyEmail.vue";
import AlertVerifyEmail from "@/components/Alerts/AlertVerifyEmail.vue";

export default {
  components: {
    Appbar,
    Navbar,
    Footer,
    DialogLogin,
    DialogForgotPassword,
    DialogVerifyEmail,
    AlertVerifyEmail,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isEmailVerified"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>