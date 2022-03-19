<template>
  <v-container fluid>
    <v-card width="100%">
      <!-- tabs -->
      <v-tabs v-model="tab" show-arrows>
        <v-tab v-for="tab in tabs" :key="tab.icon">
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
  </v-container>
</template>

<script>
import SettingsAccount from "@/views/Settings/SettingsAccount.vue";
import SettingsSecurity from "@/views/Settings/SettingsSecurity.vue";

export default {
  components: {
    SettingsAccount,
    SettingsSecurity
  },
  data() {
    return {
      tab: "",
      tabs: [
        { title: "Account", icon: "account-outline" },
        { title: "Security", icon: "lock-open-outline" },
      ],
    };
  },
};
</script>