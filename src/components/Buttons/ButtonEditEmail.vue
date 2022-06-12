<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" depressed :disabled="disabled" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-pencil</v-icon>
        <span>Edit email</span>
      </v-card-title>
      <v-card-text>
        Are you sure you want to <b>edit your email</b>?<br />As a
        <b>security measure</b>, you will need to provide your password and to <b>verify your new email</b> ({{ newEmail }}).
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
          depressed
          color="primary"
          @click="handleEditEmail(newEmail, password)"
        >
          <span v-if="!loading">Edit</span>
          <IconLoading v-else />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  components: {
    IconLoading,
  },
	props: {
		newEmail: String,
    disabled: Boolean,
	},
  data() {
    return {
      dialog: false,
      password: "",
      isPasswordVisible: false,
      error: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations("auth", ["updateUser"]),
    async handleEditEmail(email, password) {
      this.loading = true;
			try {
				await this.$store.dispatch("auth/updateUserEmail", { email, password })
				this.loading = false;
				this.dialog = false;
			} catch (err) {
				this.loading = false;
				this.error = err;
			}
    },
  },
};
</script>