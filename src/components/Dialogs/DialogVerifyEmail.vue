<template>
  <v-dialog v-model="dialog" width="450">
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-alert</v-icon>
        <span>Vérifiez votre email</span>
      </v-card-title>

      <v-card-text class="pb-0"
        ><span
          >Nous vous avons envoyé un mail à <b>{{ userEmail }}</b> à la création
          de votre compte.<br />Si vous n'avez rien reçu, vous pouvez en
          redemander un à nouveau.</span
        >
      </v-card-text>

      <v-card-text class="pb-0" v-if="error.length > 0">
        <small class="red--text">{{ error }}</small>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Annuler</v-btn>
        <ButtonDefault
          text="Demander"
          color="primary"
          :loading="loading"
          @action="handleEmailVerification()"
          class="mt-2"
        ></ButtonDefault>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";

export default {
  components: {
    ButtonDefault,
  },
  data() {
    return {
      email: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters("dialogs", ["showVerifyEmailDialog"]),
    ...mapGetters("auth", ["userEmail"]),
    dialog: {
      get() {
        return this.showVerifyEmailDialog;
      },
      set(value) {
        this.updateVerifyEmailDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations("dialogs", ["updateVerifyEmailDialog"]),
    async handleEmailVerification() {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/newEmailVerification");
        this.loading = false;
        this.updateVerifyEmailDialog(false);
      } catch (err) {
        this.loading = false;
        this.error = err;
      }
    },
  },
};
</script>