<template>
  <v-app>
    <v-main>
      <div
        class="d-flex flex-column justify-start align-start"
        style="height: 100%"
      >
        <slot></slot>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>