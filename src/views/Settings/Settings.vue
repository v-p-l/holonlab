<template>
  <v-card width="100%">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows background-color="cards">
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
        :active-class="darkMode ? 'white--text' : ''"
      >
        <v-icon size="20" class="me-3"> mdi-{{ tab.icon }} </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab" height="100%">
      <v-tab-item>
        <SettingsAccount />
      </v-tab-item>

      <v-tab-item>
        <SettingsSecurity />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import SettingsAccount from "@/views/Settings/components/SettingsAccount.vue";
import SettingsSecurity from "@/views/Settings/components/SettingsSecurity.vue";

export default {
  components: {
    SettingsAccount,
    SettingsSecurity,
  },
  data() {
    return {
      tab: "",
      tabs: [
        { title: "Compte", icon: "account-outline" },
        { title: "Sécurité", icon: "lock-open-outline" },
      ],
    };
  },
  computed: {
    ...mapGetters("utilities", ["darkMode"]),
  },
};
</script>