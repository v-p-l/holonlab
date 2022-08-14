<template>
  <div class="primary d-flex flex-row justify-center align-center fill-height fluid px-4" style="width: 100%;">
    <v-card
      height="350"
      max-width="350"
      outlined
      class="d-flex flex-column justify-space-between py-4 px-6"
    >
      <div class="primary--text text-h2 font-weight-bold text-center">404</div>
      <div class="body-1 text-center">
        Désolé, nous n'avons pas réussi à trouver la page en question. 😥
      </div>

      <ButtonDefault
        text="Retour à holonlab"
        color="primary"
        to="/pca"
      ></ButtonDefault>
    </v-card>
  </div>
</template>

<script>
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";

export default {
  components: {
    ButtonDefault,
  },
};
</script>