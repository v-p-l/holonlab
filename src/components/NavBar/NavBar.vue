<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown || !showNavBar"
    hide-overlay
    floating
    color="background"
    width="260"
  > 
    <div class="pa-4">
      <Logo></Logo>
    </div>
    <v-list expand shaped dense nav class="pt-0 pl-0 pr-5">
      <v-list-item-group
        v-model="selectedItem"
        v-for="item in items"
        :key="item.title"
        :color="darkMode ? 'white' : 'primary'"
        class="mb-2"
      >
        <v-list-item
          v-if="!item.adminRequired"
          link
          :to="item.to"
          style="height: 44px"
        >
          <v-list-item-icon class="pl-5 mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="font-size: 16px">{{
              item.title
            }}</v-list-item-title>
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
              text="Please verify your email to access this page"
            />
          </v-list-item-icon>
        </v-list-item>
        <v-list-item v-if="item.adminRequired && isAdmin" link :to="item.to" style="height: 44px">
          <v-list-item-icon class="pl-5 mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="font-size: 16px">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import IconWithTooltip from "@/components/Icons/IconWithTooltip.vue";
import Logo from "@/components/Logo/Logo.vue";

export default {
  components: {
    IconWithTooltip,
    Logo
  },
  data() {
    return {
      items: [
        // {
        //   title: "Home",
        //   icon: "mdi-home",
        //   to: "/",
        //   authRequired: false,
        //   adminRequired: false,
        // },
        {
          title: "PCA Tracker",
          icon: "mdi-cards",
          to: "/pca",
          authRequired: false,
          adminRequired: false,
        },
        {
          title: "Favoris",
          icon: "mdi-heart",
          to: "/favorites",
          authRequired: true,
          adminRequired: false,
        },
        {
          title: "À propos",
          icon: "mdi-help-circle",
          to: "/about",
          authRequired: false,
          adminRequired: false,
        },
        {
          title: "Admin",
          icon: "mdi-account-cog",
          to: "/admin",
          authRequired: true,
          adminRequired: true,
        },
      ],
      selectedItem: 1,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isEmailVerified", "isAdmin"]),
    ...mapGetters("utilities", ["showNavBar", "darkMode"]),
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