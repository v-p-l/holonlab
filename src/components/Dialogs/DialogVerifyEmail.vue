<template>
  <v-dialog v-model="dialog" width="450">
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-alert</v-icon>
        <span>Verify your email</span>
      </v-card-title>

      <v-card-text class="pb-0"
        ><span>We have sent a verification mail to <b>{{ userEmail }}</b
        >.<br />If you haven't received anything yet, you can
        <b>request a new one</b> below.</span>
      </v-card-text>

			<v-card-text class="pb-0" v-if="error.length > 0">
        <small class="red--text">{{
          error
        }}</small>
			</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" depressed class="mb-1" @click="handleEmailVerification()">
          <span v-if="!loading">Send</span>
          <IconLoading v-if="loading" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  components: {
    IconLoading,
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