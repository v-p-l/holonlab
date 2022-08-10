<template>
  <v-menu offset-y bottom left min-width="250" max-width="250">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        icon
        @click="handleSetNewNotificationsToFalse()"
      >
        <v-badge
          :value="newNotificationsCount > 0"
          color="error"
          :content="newNotificationsCount"
          overlap
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list
      :height="notifications.length > 4 ? '288' : 'auto'"
      class="py-0 overflow-y-auto"
      color="cards"
    >
      <v-list-item-group color="primary">
        <template v-for="(item, i) in notifications">
          <v-divider :key="`divider-${i}`"></v-divider>
          <v-list-item
            v-if="item.type === 'Nouvelles populations'"
            :to="item.redirectURL"
            :key="`item-${i}`"
            class="py-2"
          >
            <v-list-item-avatar v-if="item.img" rounded class="mt-0">
              <v-img :src="item.img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="py-0">
              <v-list-item-title class="primary--text mb-1 body-2"
                >{{ item.type }} !</v-list-item-title
              >
              <v-list-item-subtitle class="body-2 mb-0">{{
                item.content
              }}</v-list-item-subtitle>
              <p class="caption text--secondary mb-0">
                {{ item.createdAt.seconds | moment("from", "now") }}
              </p>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else disabled :key="`item-${i}`" class="py-4">
            <v-list-item-content class="py-0">
              <v-list-item-title class="font-weight-bold mb-1"
                >{{ item.type }} !</v-list-item-title
              >
              <div class="text--secondary body-2">{{ item.content }}</div>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-list class="py-0" color="cards">
      <v-divider></v-divider>
      <v-list-item class="d-flex flex-direction justify-center py-2">
        <v-btn block depressed color="primary" to="/notifications"
          >Voir tout</v-btn
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      notifications: [],
      newNotificationsCount: 0,
    };
  },
  computed: {},
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    ...mapActions("pcatracker", [
      "getLimitedNotifications",
      "getTotalNewNotifications",
      "setNewNotificationsToFalse",
    ]),
    async getDataFromApi() {
      try {
        this.notifications = await this.getLimitedNotifications(5);
        this.newNotificationsCount = await this.getTotalNewNotifications();
      } catch (err) {
        console.log(err);
      }
    },
    async handleSetNewNotificationsToFalse() {
      if (this.newNotificationsCount === 0) {
        return;
      }
      try {
        await this.setNewNotificationsToFalse(this.newNotificationsCount);
        this.newNotificationsCount = await this.getTotalNewNotifications();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>