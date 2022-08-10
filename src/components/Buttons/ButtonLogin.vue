<template>
  <ButtonDefault
    text="Connexion"
    color="primary"
    :small="$vuetify.breakpoint.smAndDown"
    @action="updateLoginDialog(true)"
  ></ButtonDefault>
</template>

<script>
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    ButtonDefault,
  },
  methods: {
    ...mapMutations("dialogs", ["updateLoginDialog"]),
  },
};
</script>