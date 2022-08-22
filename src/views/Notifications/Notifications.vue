<template>
  <v-row no-gutters class="justify-center" style="width: 100%">
    <v-col cols="12" lg="8" md="8">
      <v-list
        class="py-0"
        color="cards"
      >
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-title class="text-center">Notifications</v-list-item-title>
          </v-list-item>
          <v-divider v-if="loading"></v-divider>
          <v-list-item v-if="loading" class="d-flex flex-row justify-center">
            <IconLoading :color="'primary'"></IconLoading>
          </v-list-item>
          <template v-for="(item, i) in notifications">
            <v-divider :key="`divider-${i}`"></v-divider>
            <v-list-item
              v-if="item.type === 'Nouvelles populations'"
              :to="`/pca/${item.cardId}`"
              :key="`item-${i}`"
              class="py-3"
            >
              <v-list-item-avatar v-if="item.img" rounded class="mt-0">
                <v-img :src="item.img"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="py-0">
                <v-list-item-title class="mb-0 body-2 mb-1"
                  >{{ item.type }} !</v-list-item-title
                >
                <v-list-item-subtitle class="primary--text body-2">{{
                  item.content
                }}</v-list-item-subtitle>
                <p class="caption text--secondary mb-0">
                  {{ item.createdAt.seconds | moment("from", "now") }}
                </p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :key="`item-${i}`" class="py-4">
              <v-list-item-content class="py-0">
                <v-list-item-title class="mb-1"
                  >{{ item.type }} !</v-list-item-title
                >
                <div class="text--secondary body-2">{{ item.content }}</div>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import IconLoading from "@/components/Icons/IconLoading.vue";
import { mapActions } from "vuex";
export default {
  components: {
    IconLoading
  },
  data() {
    return {
      loading: false,
      notifications: [],
    };
  },
  computed: {},
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    ...mapActions("pcatracker", [
      "getNotifications",
    ]),
    async getDataFromApi() {
      this.loading = true;
      try {
        this.notifications = await this.getNotifications();
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>