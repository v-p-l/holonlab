<template>
  <v-menu offset-y left max-width="230">
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="11" offset-y="11" dot>
        <v-btn small depressed fab color="primary" v-bind="attrs" v-on="on">
          <span v-if="userName" style="font-size: 18px">{{
            userName.slice(0, 1)
          }}</span>
        </v-btn>
      </v-badge>
    </template>
    <v-list class="py-0">
      <!-- User -->
      <div class="d-flex flex-column py-4 px-4">
        <span class="text--primary font-weight-semibold">
          {{ userName }}
        </span>
        <div class="d-flex flex-row">
          <IconWithTooltip
            v-if="isEmailVerified"
            :color="'success'"
            :mdi="'check-circle'"
            text="Email verified"
          />
          <IconWithTooltip v-else :mdi="'alert'" text="Email not verified" />
          <small v-if="userEmail" class="text--disabled">{{
            userEmail.length > 28 ? userEmail.slice(0, 25) + "..." : userEmail
          }}</small>
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
import IconWithTooltip from "@/components/Icons/IconWithTooltip.vue";

export default {
  components: {
    IconWithTooltip,
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
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>