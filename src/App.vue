<template>
  <div>
    <component v-if="!loading" :is="resolveLayout">
      <v-slide-x-transition mode="out-in">
        <router-view></router-view>
      </v-slide-x-transition>
    </component>
    <div
      v-else
      style="
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <div>
        <Logo style="margin-bottom: 16px"></Logo>
        <IconLoading color="black"></IconLoading>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutBlank from "@/layouts/Blank.vue";
import LayoutContent from "@/layouts/Content.vue";
import Logo from "@/components/Logo/Logo.vue";
import IconLoading from "@/components/Icons/IconLoading.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    LayoutBlank,
    LayoutContent,
    Logo,
    IconLoading,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("utilities", ["darkMode"]),
    resolveLayout() {
      if (this.$route.meta.layout === "blank" || this.$route.name === null) {
        return "layout-blank";
      } else {
        return "layout-content";
      }
    },
  },
  created() {
    this.handleUserAuth();
  },
  methods: {
    async handleUserAuth() {
      this.loading = true;

      this.darkMode === true
        ? (this.$vuetify.theme.dark = true)
        : (this.$vuetify.theme.dark = false);

      try {
        await this.$store.dispatch("auth/onUserAuthStateChanged");
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>