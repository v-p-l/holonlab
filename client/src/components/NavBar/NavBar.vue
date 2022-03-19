<template>
  <v-navigation-drawer
    app
    clipped
    v-model="drawer"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    width="200"
    mini-variant-width="60"
    :mini-variant="!showNavBar"
  >
    <v-list dense nav>
      <v-subheader>Menu</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            v-if="
              (item.authRequired && !isLoggedIn) ||
              (item.authRequired && isLoggedIn && !isEmailVerified)
            "
            class="mx-0"
          >
            <IconWithTooltip
              v-if="!isLoggedIn"
              :color="''"
              :mdi="'lock'"
              text="You need to login to access this page"
            />
            <IconWithTooltip
              v-if="isLoggedIn && !isEmailVerified"
              :color="''"
              :mdi="'lock'"
              text="You need to verify your email to access this page"
            />
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import IconWithTooltip from "@/components/Icons/IconWithTooltip.vue";

export default {
  components: {
    IconWithTooltip,
  },
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: "/",
          authRequired: false,
        },
        {
          title: "About",
          icon: "mdi-help-box",
          to: "/about",
          authRequired: false,
        },
        {
          title: "Authenticated",
          icon: "mdi-security",
          to: "/auth",
          authRequired: true,
        },
      ],
      selectedItem: 1,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isEmailVerified"]),
    ...mapGetters("utilities", ["showNavBar"]),
    drawer: {
      get() {
        return this.showNavBar;
      },
      set(value) {
        if (value === this.drawer) {
          return;
        } else {
          this.updateNavBar();
        }
      },
    },
  },
  methods: {
    ...mapMutations("utilities", ["updateNavBar"]),
  },
};
</script>