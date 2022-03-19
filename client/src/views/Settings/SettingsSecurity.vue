<template>
  <v-card flat class="py-4 px-6">
    <div>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card outlined class="pa-4">
            <v-row no-gutters class="justify-space-between mb-4">
              <v-avatar tile size="80" class="ma-0" color="primary">
                <v-icon x-large color="white">mdi-lock-outline</v-icon>
              </v-avatar>
              <div class="text-overline">Provider</div>
            </v-row>
            <div v-if="userProvider === 'google.com'" class="text-h5">Google</div>
						<div v-if="userProvider === 'password'" class="text-h5">Email/password</div>
            <v-row no-gutters>
              <span v-if="userProvider === 'google.com'">Authenticated using Google provider.</span>
							<span v-if="userProvider === 'password'">Authenticated using email and password.</span>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" v-if="userProvider === 'password'">
          <v-text-field
            v-model="currentPassword"
            outlined
            dense
            :type="isCurrentPasswordVisible ? 'text' : 'password'"
            label="Current Password"
            placeholder="············"
            :append-icon="
              isCurrentPasswordVisible
                ? 'mdi-eye-off-outline'
                : 'mdi-eye-outline'
            "
            hide-details
            class="mb-4"
            @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            outlined
            dense
            :type="isNewPasswordVisible ? 'text' : 'password'"
            label="New Password"
            placeholder="············"
            :append-icon="
              isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            hide-details
            class="mb-4"
            @click:append="isNewPasswordVisible = !isNewPasswordVisible"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            outlined
            dense
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            label="Confirm New Password"
            placeholder="············"
            :append-icon="
              isConfirmPasswordVisible
                ? 'mdi-eye-off-outline'
                : 'mdi-eye-outline'
            "
            hide-details
            class="mb-4"
            @click:append="isConfirmPasswordVisible = !isConfirmPasswordVisible"
          ></v-text-field>
          <v-row>
            <v-col cols="12" class="d-flex flex-column align-end">
              <v-btn
                color="primary"
                class="mb-1"
                :disabled="!isConfirmPasswordValid"
                @click="handleUpdatePassword(currentPassword, newPassword)"
              >
                <span v-if="!loading">Update password</span>
                <IconLoading v-else />
              </v-btn>
              <small v-if="success" class="green--text"
                >Password successfully updated!</small
              >
              <small v-if="error.length > 0" class="red--text">{{
                error
              }}</small>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-card>
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
      currentPassword: "",
      isCurrentPasswordVisible: false,
      newPassword: "",
      isNewPasswordVisible: false,
      confirmPassword: "",
      isConfirmPasswordVisible: false,
      loading: false,
      success: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["userEmail", "userProvider"]),
    isConfirmPasswordValid() {
      return (
        this.currentPassword.length > 0 &&
        this.newPassword.length > 0 &&
        this.newPassword === this.confirmPassword &&
        this.newPassword != this.currentPassword
      );
    },
  },
  methods: {
    ...mapMutations("auth", ["updateUser"]),
    async handleUpdatePassword(currentPw, newPw) {
      this.loading = true;
      this.success = false;
      this.error = "";

      try {
        await this.$store.dispatch("auth/updateUserPassword", {
          currentPw,
          newPw,
        });
        this.loading = false;
        this.success = true;
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (err) {
        this.loading = false;
        this.error = err;
      }
    },
  },
};
</script>