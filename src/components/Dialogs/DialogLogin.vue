<template>
  <v-dialog v-model="dialog" width="450">
    <v-card class="pa-5" color="cards">
      <!-- logo -->
      <v-card-title class="d-flex align-center justify-center py-5">
        <Logo />
      </v-card-title>

      <!-- tabs -->
      <v-tabs v-model="tab" centered background-color="cards" class="mb-4">
        <v-tab key="login" :active-class="darkMode ? 'white--text' : ''">Connexion</v-tab>
        <v-tab key="signup" :active-class="darkMode ? 'white--text' : ''">Inscription</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- login form -->
        <v-tab-item key="login">
          <v-card color="cards">
            <v-card-text class="px-0 pb-0">
              <v-form>
                <v-text-field
                  v-model="login.email"
                  outlined
                  label="Email"
                  placeholder="hello@holonlab.io"
                  hide-details
                  class="mb-3"
                ></v-text-field>

                <v-text-field
                  v-model="login.password"
                  outlined
                  :type="login.isPasswordVisible ? 'text' : 'password'"
                  label="Mot de passe"
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
                    Mot de passe oublié?
                  </a>
                </div>

                <v-btn
                  block
                  depressed
                  color="primary"
                  class="mt-6 mb-1"
                  @click="handleLoginWithEmail(login.email, login.password)"
                >
                  <span v-if="!login.loading">Connexion</span>
                  <IconLoading v-if="login.loading" />
                </v-btn>

                <p v-if="login.errMsg.length > 0" class="red--text">
                  {{ login.errMsg }}
                </p>
              </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text
              class="d-flex align-center justify-center flex-wrap pb-1 px-0"
            >
              <span class="mr-2"> Nouveau sur l'application ?</span>
              <a @click="tab = 1"> Créer un compte </a>
            </v-card-text>

            <!-- divider -->
            <v-card-text class="d-flex align-center px-0">
              <v-divider></v-divider>
              <span class="mx-5">ou</span>
              <v-divider></v-divider>
            </v-card-text>

            <!-- social links -->
            <v-card-actions class="d-flex justify-center px-4 py-2">
              <v-btn class="pa-4" depressed @click="handleLoginWithGoogle()">
                <v-icon color="#db4437" class="mr-4"> mdi-google </v-icon>
                <span>Connexion avec Google</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <!-- sign up form -->
        <v-tab-item key="signup">
          <v-card color="cards">
            <v-card-text class="px-0 pb-0">
              <v-form>
                <v-text-field
                  v-model="signUp.username"
                  outlined
                  label="Pseudo"
                  placeholder="ex : wid"
                  hide-details
                  class="mb-3"
                ></v-text-field>

                <v-text-field
                  v-model="signUp.email"
                  outlined
                  label="Email"
                  placeholder="hello@holonlab.io"
                  hide-details
                  class="mb-3"
                ></v-text-field>

                <v-text-field
                  v-model="signUp.password"
                  outlined
                  :type="signUp.isPasswordVisible ? 'text' : 'password'"
                  label="Mot de passe"
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
                  depressed
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
                  <span v-if="!signUp.loading">Créer</span>
                  <IconLoading v-if="signUp.loading" />
                </v-btn>

                <p v-if="signUp.errMsg.length > 0" class="red--text">
                  {{ signUp.errMsg }}
                </p>
              </v-form>
            </v-card-text>

            <!-- create new account  -->
            <v-card-text
              class="d-flex align-center justify-center flex-wrap pb-1 px-0"
            >
              <span class="mr-2"> Déjà un compte ? </span>
              <a @click="tab = 0"> Connectez-vous </a>
            </v-card-text>

            <!-- divider -->
            <v-card-text class="d-flex align-center px-0">
              <v-divider></v-divider>
              <span class="mx-5">ou</span>
              <v-divider></v-divider>
            </v-card-text>

            <!-- social links -->
            <v-card-actions class="d-flex justify-center px-4 py-2">
              <v-btn depressed class="pa-4" @click="handleLoginWithGoogle()">
                <v-icon color="#db4437" class="mr-4"> mdi-google </v-icon>
                <span>Continuer avec Google</span>
              </v-btn>
            </v-card-actions>
          </v-card>
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
      tab: "login",
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
    ...mapGetters("utilities", ["darkMode"]),
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
    ...mapMutations("dialogs", [
      "updateLoginDialog",
      "updateForgotPasswordDialog",
    ]),
    async handleRegisterWithEmail(username, email, password) {
      this.signUp.loading = true;
      const credentials = { username, email, password };
      try {
        await this.$store.dispatch("auth/registerWithEmail", credentials);
        this.$store.commit("dialogs/updateLoginDialog", false);
        this.$router.go();
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
        this.$router.go();
      } catch (error) {
        this.login.loading = false;
        this.login.errMsg = error;
      }
    },
    async handleLoginWithGoogle() {
      try {
        await this.$store.dispatch("auth/loginWithGoogle");
        this.$store.commit("dialogs/updateLoginDialog", false);
        this.$router.go();
      } catch (error) {
        this.login.errMsg = error;
      }
    },
  },
};
</script>