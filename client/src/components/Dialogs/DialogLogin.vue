<template>
  <v-dialog v-model="dialog" width="450">
    <v-card class="pa-5">
      <!-- logo -->
      <v-card-title class="d-flex align-center justify-center py-5">
        <Logo />
      </v-card-title>

      <!-- tabs -->
      <v-tabs v-model="tab" centered class="mb-4">
        <v-tab key="login">Login</v-tab>
        <v-tab key="signup">New user</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="login">
          <!-- login form -->
          <v-card-text class="pb-0">
            <v-form>
              <v-text-field
                v-model="login.email"
                outlined
                label="Email"
                placeholder="john@vuetify.com"
                hide-details
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="login.password"
                outlined
                :type="login.isPasswordVisible ? 'text' : 'password'"
                label="Password"
                placeholder="············"
                :append-icon="
                  login.isPasswordVisible
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                hide-details
                @click:append="
                  login.isPasswordVisible = !login.isPasswordVisible
                "
              ></v-text-field>

              <div class="d-flex align-center justify-end mt-2">
                <!-- forgot link -->
                <a
                  @click="
                    updateLoginDialog(false);
                    updateForgotPasswordDialog(true);
                  "
                >
                  Forgot Password?
                </a>
              </div>

              <v-btn
                block
                color="primary"
                class="mt-6 mb-1"
                @click="handleLoginWithEmail(login.email, login.password)"
              >
                <span v-if="!login.loading">Login</span>
                <IconLoading v-if="login.loading" />
              </v-btn>

              <p v-if="login.errMsg.length > 0" class="red--text">{{ login.errMsg }}</p>
            </v-form>
          </v-card-text>

          <!-- create new account  -->
          <v-card-text class="d-flex align-center justify-center flex-wrap pb-1">
            <span class="mr-2"> New on our platform? </span>
            <a @click="tab = 1"> Create an account </a>
          </v-card-text>

          <!-- divider -->
          <v-card-text class="d-flex align-center">
            <v-divider></v-divider>
            <span class="mx-5">or</span>
            <v-divider></v-divider>
          </v-card-text>

          <!-- social links -->
          <v-card-actions class="d-flex justify-center px-4 py-2">
            <v-btn class="pa-4" @click="handleLoginWithGoogle()">
              <v-icon color="#db4437" class="mr-4"> mdi-google </v-icon>
              <span>Continue with Google</span>
            </v-btn>
          </v-card-actions>
        </v-tab-item>
        <v-tab-item key="signup">
          <!-- sign up form -->
          <v-card-text class="pb-0">
            <v-form>
              <v-text-field
                v-model="signUp.username"
                outlined
                label="Username"
                placeholder="john84"
                hide-details
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="signUp.email"
                outlined
                label="Email"
                placeholder="john@vuetify.com"
                hide-details
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="signUp.password"
                outlined
                :type="signUp.isPasswordVisible ? 'text' : 'password'"
                label="Password"
                placeholder="············"
                :append-icon="
                  signUp.isPasswordVisible
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                hide-details
                @click:append="
                  signUp.isPasswordVisible = !signUp.isPasswordVisible
                "
              ></v-text-field>

              <v-btn
                block
                color="primary"
                class="mt-6 mb-1"
                @click="
                  handleRegisterWithEmail(
                    signUp.username,
                    signUp.email,
                    signUp.password
                  )
                "
              >
                <span v-if="!signUp.loading">Submit</span>
                <IconLoading v-if="signUp.loading" />
              </v-btn>

              <p v-if="signUp.errMsg.length > 0" class="red--text">{{ signUp.errMsg }}</p>
            </v-form>
          </v-card-text>

          <!-- create new account  -->
          <v-card-text class="d-flex align-center justify-center flex-wrap pb-1">
            <span class="mr-2"> Already have an account? </span>
            <a @click="tab = 0"> Sign in instead </a>
          </v-card-text>

          <!-- divider -->
          <v-card-text class="d-flex align-center">
            <v-divider></v-divider>
            <span class="mx-5">or</span>
            <v-divider></v-divider>
          </v-card-text>

          <!-- social links -->
          <v-card-actions class="d-flex justify-center px-4 py-2">
            <v-btn class="pa-4" @click="handleLoginWithGoogle()">
              <v-icon color="#db4437" class="mr-4"> mdi-google </v-icon>
              <span>Continue with Google</span>
            </v-btn>
          </v-card-actions>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import IconLoading from "@/components/Icons/IconLoading.vue";
import Logo from "@/components/Logo/Logo.vue";

export default {
  components: {
    IconLoading,
    Logo,
  },
  data() {
    return {
      tab: 0,
      login: {
        email: "",
        password: "",
        isPasswordVisible: false,
        errMsg: "",
        loading: false,
      },
      signUp: {
        username: "",
        email: "",
        password: "",
        isPasswordVisible: false,
        errMsg: "",
        loading: false,
      },
    };
  },
  computed: {
    ...mapGetters("dialogs", ["showLoginDialog"]),
    dialog: {
      get() {
        return this.showLoginDialog;
      },
      set(value) {
        this.updateLoginDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations("dialogs", ["updateLoginDialog", "updateForgotPasswordDialog"]),
    async handleRegisterWithEmail(username, email, password) {
      this.signUp.loading = true;
			const credentials = { username, email, password };
			try {
				await this.$store.dispatch("auth/registerWithEmail", credentials);
				this.$store.commit("dialogs/updateLoginDialog", false);
			} catch (error) {
				this.signUp.loading = false;
        this.signUp.errMsg = error;
			}
    },
    async handleLoginWithEmail(email, password) {
      this.login.loading = true;
      const credentials = { email, password };
      try {
        await this.$store.dispatch("auth/loginWithEmail", credentials);
        this.login.loading = false;
        this.$store.commit("dialogs/updateLoginDialog", false);
      } catch (error) {
				this.login.loading = false;
        this.login.errMsg = error;
      }
    },
    async handleLoginWithGoogle() {
			try {
				await this.$store.dispatch("auth/loginWithGoogle");
				this.$store.commit("dialogs/updateLoginDialog", false);
			} catch (error) {
        this.login.errMsg = error;
			}
    },
  },
};
</script>