<template>
  <v-card color="cards">
    <v-card-title>Contributeurs</v-card-title>
    <v-card-text
      >Liste des contributeurs qui ont participé à la recherche des numéros de
      certification des cartes. 🐳</v-card-text
    >
    <div class="d-flex flex-row flex-wrap px-4 pb-2" style="gap: 8px">
      <div
        class="d-flex flex-row align-center mb-2"
        v-for="(contributor, index) in contributors"
        :key="index"
      >
        <v-icon class="mr-1" color="#7085D5">mdi-discord</v-icon>
        <div class="body-2">
          {{ contributor.discordName
          }}<span style="color: #b9bbbe">{{ contributor.discordNumber }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Contributors",
  data() {
    return {
      contributors: [
        {
          discordName: "akselvb",
          discordNumber: "#0736",
        },
        {
          discordName: "Hydra",
          discordNumber: "#8753",
        },
        {
          discordName: "Rod",
          discordNumber: "#9373",
        },
        {
          discordName: "Spex",
          discordNumber: "#4105",
        },
        {
          discordName: "2UU",
          discordNumber: "#8376",
        },
        {
          discordName: "Botsaa",
          discordNumber: "#3100",
        },
      ],
    };
  },
};
</script>