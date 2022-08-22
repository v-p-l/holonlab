<template>
  <v-menu offset-y bottom left min-width="250" max-width="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small depressed fab color="primary" v-bind="attrs" v-on="on">
        <v-icon>{{ "mdi-account" }}</v-icon>
      </v-btn>
    </template>
    <v-list class="py-0">
      <!-- User -->
      <div class="d-flex flex-row justify-center py-4 px-4">
        <div
          class="d-flex flex-row justify-center text--primary font-weight-bold"
        >
          {{ userName }}
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link to="/settings">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-cog </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Logout -->
      <v-list-item link @click="handleSignOut">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-logout </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["userName", "userEmail", "isEmailVerified"]),
  },
  methods: {
    ...mapActions("utilities", ["resetGlobalState"]),
    async handleSignOut() {
      try {
        await this.$store.dispatch("auth/signOutUser");
        this.$router.go();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>