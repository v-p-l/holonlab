<template>
  <v-dialog v-model="dialog" width="450">
    <v-card class="pa-5">
      <!-- logo -->
      <v-card-title class="d-flex align-center justify-center py-7">
        <div class="d-flex align-center">
          <v-img
            :src="require('@/assets/logo.svg')"
            max-height="30px"
            max-width="30px"
            alt="logo"
            contain
            class="mr-3"
          ></v-img>

          <h2>Vuetify</h2>
        </div>
      </v-card-title>

      <v-card-text>
        If an account associated to this email exists, you will receive a reset link.
      </v-card-text>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            outlined
            label="Email"
            placeholder="john@vuetify.com"
            hide-details
            class="mb-3"
          ></v-text-field>

          <v-btn
            block
            color="primary"
            class="mt-6 mb-1"
            @click="handleResetUserPassword(email)"
          >
            <span v-if="!loading">Reset my password</span>
            <IconLoading v-if="loading" />
          </v-btn>

          <small v-if="error.length > 0" class="red--text mb-0">{{ error }}</small>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  components: {
		IconLoading
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