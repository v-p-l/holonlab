<template>
  <v-dialog v-model="dialog" width="450">
    <v-card class="pa-5">
      <!-- logo -->
      <v-card-title class="d-flex align-center justify-center py-7">
        <Logo></Logo>
      </v-card-title>

      <v-card-text>
        Si un compte associé à cet email existe, vous recevrez un lien de
        réinitialisation.
      </v-card-text>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            placeholder="hello@holonlab.io"
            hide-details
            class="mb-3"
          ></v-text-field>

          <ButtonDefault
            text="Réinitialiser"
            color="primary"
            :loading="loading"
            block
            class="mt-6 mb-1"
            @action="handleResetUserPassword(email)"
          ></ButtonDefault>

          <small v-if="error.length > 0" class="red--text mb-0">{{
            error
          }}</small>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Logo from "@/components/Logo/Logo.vue";
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";

export default {
  components: {
    Logo,
    ButtonDefault
  },
  data() {
    return {
      email: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters("dialogs", ["showForgotPasswordDialog"]),
    dialog: {
      get() {
        return this.showForgotPasswordDialog;
      },
      set(value) {
        this.updateForgotPasswordDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations("dialogs", ["updateForgotPasswordDialog"]),
    async handleResetUserPassword(email) {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/resetUserPassword", email);
        this.loading = false;
        this.updateForgotPasswordDialog(false);
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    },
  },
};
</script>