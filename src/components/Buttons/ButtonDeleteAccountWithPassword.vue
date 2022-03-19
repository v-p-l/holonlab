<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" outlined v-bind="attrs" v-on="on">
        <span>Delete account</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
				<v-icon class="mr-2">mdi-delete</v-icon>
				<span>Delete account</span>
			</v-card-title>
      <v-card-text>
        Are you sure you want to <b>delete your account</b>? You will lose all the data
        related to it.<br />As a <b>security measure</b>, you need to provide your
        password.
      </v-card-text>
      <v-text-field
        v-model="password"
        dense
        outlined
        :type="isPasswordVisible ? 'text' : 'password'"
        label="Password"
        placeholder="············"
        :append-icon="
          isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        hide-details
        @click:append="isPasswordVisible = !isPasswordVisible"
        class="px-5 mb-1"
      ></v-text-field>
      <small v-if="error.length > 0" class="px-5 red--text">{{ error }}</small>
      <v-card-actions class="mt-4">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn
          :disabled="password.length === 0"
          color="error"
          @click="handleDeleteUser(password)"
        >
          <span v-if="!loading">Delete</span>
					<IconLoading v-else />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  getAuth,
	EmailAuthProvider,
  reauthenticateWithCredential,
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
      password: "",
      isPasswordVisible: false,
      error: "",
			loading: false
    };
  },
  methods: {
    handleDeleteUser(password) {
			this.loading = true;
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
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