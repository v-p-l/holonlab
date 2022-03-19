<template>
  <v-container v-if="alertWarning">
    <v-alert
      v-model="alertWarning"
      icon="mdi-alert"
      type="warning"
			class="mb-0"
      dismissible
    >
      Don't forget to
      <a
        class="text-decoration-underline cursor-pointer white--text"
        @click="updateVerifyEmailDialog(true)"
        >verify your email</a
      >
      to access some functionnalities.
    </v-alert>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      alertWarning: true,
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations("dialogs", ["updateVerifyEmailDialog"]),
  },
  mounted() {},
};
</script>