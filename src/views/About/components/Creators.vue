<template>
  <v-card color="cards" class="pb-4">
    <v-card-title>Créateurs</v-card-title>
    <v-card-text class="pb-2">Liste des collectionneurs à la base du projet 🐳 (~900 certifications récupérées)</v-card-text>
    <div class="d-flex flex-row flex-wrap px-4" style="gap: 8px">
      <a class="body-2 white--text" style="text-decoration: none;" target="_blank" rel="noopener noreferrer"
        :href="`https://www.instagram.com/${creator}`" v-for="(creator, index) in creators" :key="index">
        <v-chip class="d-flex flex-row align-center" style="cursor: pointer" color="#E9DDF2">
          <v-icon class="mr-1" color="purple">mdi-instagram</v-icon>
          <div class="body-2 purple--text">
            {{
              creator
            }}
          </div>
        </v-chip>
      </a>
    </div>
    <v-card-text class="pb-2">Développeur 😎</v-card-text>
    <div class="d-flex flex-row flex-wrap px-4">
      <div class="d-flex flex-row align-center">
        <a class="body-2 white--text" style="text-decoration: none;" target="_blank" rel="noopener noreferrer"
          :href="`https://www.instagram.com/holonlab_wid`">
          <v-chip class="d-flex flex-row align-center" style="cursor: pointer" color="#E9DDF2">
            <v-icon class="mr-1" color="purple">mdi-instagram</v-icon>
            <div class="body-2 purple--text">
              holonlab_wid
            </div>
          </v-chip>
        </a>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Creators",
  data() {
    return {
      creators: ["aks_poke", "saa.poke", "pokeswag21", "hydra_loves_sneasel", "hugokemon"]
    };
  },
};
</script>