<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="11" offset-y="11" dot>
        <v-avatar v-if="userImg" size="40px" v-bind="attrs" v-on="on">
          <v-img referrerpolicy="no-referrer" :src="userImg"></v-img>
        </v-avatar>
        <v-btn v-else small fab color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list>
      <!-- User -->
      <div class="d-flex flex-column pb-3 pt-3 px-4">
        <div class="d-flex flex-row justify-center mb-3">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="11"
            offset-y="11"
            dot
          >
            <v-avatar v-if="userImg" size="40px">
              <v-img referrerpolicy="no-referrer" :src="userImg"></v-img>
            </v-avatar>
            <v-btn v-else small fab color="primary">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-badge>
        </div>
        <span class="text--primary font-weight-semibold">
          {{ userName }}
        </span>
        <div class="d-flex flex-row">
					<IconWithTooltip v-if="isEmailVerified" :color="'success'" :mdi="'check-circle'" text="Email verified" />
					<IconWithTooltip v-else :mdi="'alert'" text="Email not verified" />
          <small class="text--disabled">{{ userEmail }}</small>
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
		IconWithTooltip
	},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", [
      "userImg",
      "userName",
      "userEmail",
      "isEmailVerified",
    ]),
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