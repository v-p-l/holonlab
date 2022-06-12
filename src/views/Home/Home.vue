<template>
  <div
    class="d-flex flex-row justify-center align-center flex-grow-1"
    style="width: 100%"
  >
    <div class="d-flex flex-column">
      <h1 class="mb-4 text-center">Holonlab</h1>
      <v-btn :to="'/pca'" color="primary" depressed
        ><span class="mr-2">Accéder à PCA Tracker</span>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
};
</script>