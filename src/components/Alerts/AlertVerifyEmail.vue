<template>
  <v-alert
    v-if="alertWarning"
    v-model="alertWarning"
    icon="mdi-alert"
    type="warning"
    class="mb-0"
    width="100%"
    dismissible
  >
    N'oubliez pas de
    <a
      class="text-decoration-underline cursor-pointer white--text"
      @click="updateVerifyEmailDialog(true)"
      >vérifier votre email</a
    >
    pour accéder à certaines fonctionnalités (les favoris par exemple).
  </v-alert>
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
  computed: {},
  methods: {
    ...mapMutations("dialogs", ["updateVerifyEmailDialog"]),
  },
  mounted() {},
};
</script>