<template>
  <v-card flat color="cards" class="py-4 px-6">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="pa-4">
          <v-row no-gutters class="justify-space-between mb-4">
            <v-avatar tile size="80" class="ma-0" color="primary">
              <v-icon x-large color="white"
                >mdi-account</v-icon
              >
            </v-avatar>
            <div class="text-overline">Utilisateur</div>
          </v-row>
          <div class="text-h5">{{ userName }}</div>
          <v-row no-gutters>
            <IconWithTooltip
              v-if="isEmailVerified"
              :color="'success'"
              :mdi="'check-circle'"
              text="Email vérifié"
            />
            <IconWithTooltip v-else :mdi="'alert'" text="Email non vérifié" />
            <span>{{ userEmail.length > 22 ? userEmail.slice(0,19) + "..." : userEmail }}</span>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex flex-row align-center mb-4">
          <v-text-field
            v-model="newUserName"
            clearable
            maxlength="15"
            counter
            outlined
            dense
            hide-details
            type="text"
            label="Nouveau pseudo"
            class="mr-2"
          ></v-text-field>
          <v-btn
            color="primary"
            depressed
            :disabled="!newUserName"
            @click="handleUpdateUserName(newUserName)"
          >
            <v-icon v-if="!loading">mdi-pencil</v-icon>
						<IconLoading v-else />
          </v-btn>
        </div>
        <div v-if="userProvider === 'password'" class="d-flex flex-row align-center">
          <v-text-field
            v-model="newUserEmail"
            clearable
            outlined
            dense
            type="text"
            label="Nouvel email"
            hide-details
            class="mr-2"
          ></v-text-field>
          <ButtonEditEmail :disabled="!newUserEmail" :newEmail="newUserEmail" />
        </div>
        <small v-if="error.length > 0" class="px-5 red--text">{{
          error
        }}</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-center pb-5">
        <ButtonDeleteAccountWithPassword v-if="userProvider === 'password'" />
        <ButtonDeleteAccountWithGoogle v-if="userProvider === 'google.com'" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonEditEmail from "@/components/Buttons/ButtonEditEmail.vue";
import ButtonDeleteAccountWithPassword from "@/components/Buttons/ButtonDeleteAccountWithPassword.vue";
import ButtonDeleteAccountWithGoogle from "@/components/Buttons/ButtonDeleteAccountWithGoogle.vue";
import IconWithTooltip from "@/components/Icons/IconWithTooltip.vue";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  components: {
    ButtonEditEmail,
    ButtonDeleteAccountWithPassword,
    ButtonDeleteAccountWithGoogle,
    IconWithTooltip,
		IconLoading
  },
  data() {
    return {
      newUserName: "",
      error: "",
      newUserEmail: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
      },
			loading: false,
    };
  },
  computed: {
    ...mapGetters("auth", [
      "userEmail",
      "userName",
      "userProvider",
      "isEmailVerified",
    ]),
  },
  mounted() {
  },
  methods: {
    async handleUpdateUserName(newUserName) {
      this.loading = true;
      try {
        await this.$store.dispatch("auth/updateUserName", newUserName);
        this.$toast.success("Username modifié !");
        this.loading = false;
      } catch (error) {
        this.$toast.error("a");
        this.loading = false;
        console.log(error)
      }
    },
  },
};
</script>