<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" outlined v-bind="attrs" v-on="on">
        <span>Supprimer le compte</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
				<v-icon class="mr-2">mdi-delete-outline</v-icon>
				<span>Supprimer le compte</span>
			</v-card-title>
      <v-card-text>
       Êtes-vous sûr de vouloir <b>supprimer votre compte</b>? Vous perdrez toutes les données associées.<br />Comme <b>mesure de sécurité</b>, vous devez vous reconnecter avec votre compte Google.
      </v-card-text>
      <small v-if="error.length > 0" class="px-6 red--text">{{ error }}</small>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Annuler</v-btn>
        <v-btn
          color="error"
          depressed
          @click="handleDeleteUser()"
        >
          <span v-if="!loading">Supprimer</span>
					<IconLoading v-else />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  getAuth,
	GoogleAuthProvider,
  reauthenticateWithPopup,
  deleteUser,
} from "firebase/auth";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
	components: {
		IconLoading
	},
  data() {
    return {
      dialog: false,
      error: "",
			loading: false
    };
  },
  methods: {
    handleDeleteUser() {
			this.loading = true;
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = new GoogleAuthProvider(user);
      reauthenticateWithPopup(user, credential)
        .then(() => {
          deleteUser(user)
            .then(() => {
							this.loading = false;
							this.dialog = false;
							this.$router.push("/");
            })
            .catch((error) => {
							this.loading = false;
							this.error = error.code;
            });
        })
        .catch((error) => {
					this.loading = false;
          switch (error.code) {
            case "auth/invalid-email":
              this.error = "Invalid email";
              break;
            case "auth/user-not-found":
              this.error = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.error = "Incorrect password";
              break;
            default:
              this.error = "Email or password was incorrect";
              break;
          }
        });
    },
  },
};
</script>