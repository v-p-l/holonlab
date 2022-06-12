<template>
  <v-card color="cards">
    <v-card-title>FAQ</v-card-title>
    <v-card-text
      >Quelques questions / réponses en rapport avec Holonlab et PCA
      Tracker.</v-card-text
    >
    <v-expansion-panels accordion flat class="px-4 pb-4">
      <v-expansion-panel v-for="(item, i) in accordion" :key="i">
        <v-divider></v-divider>
        <v-expansion-panel-header>{{ item.question }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-body-2 mb-0">{{ item.answer }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      accordion: [
        {
          question: "Qu'est-ce que PCA Tracker ?",
          answer:
            "PCA Tracker est un outil facilitant la recherche et l'analyse des populations des cartes gradées chez PCA.",
        },
        {
          question: "L'outil est-il lié à PCA ?",
          answer:
            "L'outil n'est ni partenaire ni affiliée avec l'entreprise de gradation française PCA et utilise les données publiques disponible depuis son site pcagrade.com.",
        },
      ],
    };
  },
};
</script>