<template>
  <v-row style="width: 100%">
    <v-col cols="12">
      <h1 class="mb-4">À propos</h1>
      <v-row>
        <v-col lg="6" md="6" sm="12" cols="12">
          <Creators class="mb-4"></Creators>
          <Contributors></Contributors>
        </v-col>
        <v-col lg="6" md="6" sm="12" cols="12">
          <FAQ></FAQ>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Creators from "./components/Creators.vue";
import Contributors from "./components/Contributors.vue";
import FAQ from "./components/FAQ.vue";
export default {
  name: "About",
  components: {
    Creators,
    Contributors,
    FAQ
  },
  data() {
    return {};
  },
};
</script>