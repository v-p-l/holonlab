<template>
  <v-card color="cards" class="pb-4">
    <v-card-title>Contributeurs</v-card-title>
    <v-card-text class="pb-2">Merci aux collectionneurs qui ont participé aux partages des numéros de certification des
      cartes 👑</v-card-text>
    <div class="d-flex flex-row flex-wrap px-4" style="gap: 8px">
      <a class="body-2 white--text" style="text-decoration: none;" target="_blank" rel="noopener noreferrer"
        :href="`https://www.instagram.com/${contributor}`" v-for="(contributor, index) in contributors" :key="index">
        <v-chip class="d-flex flex-row align-center" style="cursor: pointer" color="#E9DDF2">
          <v-icon class="mr-1" color="purple">mdi-instagram</v-icon>
          <div class="body-2 black--text">
            {{
  contributor
            }}
          </div>
        </v-chip>
      </a>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Contributors",
  data() {
    return {
      contributors: [
        "poke_maniiak",
        "maximeanothertime",
        "sharepkm",
        "valckior84",
        "thefrenchplatinum",
        "rb_corral",
        "spok________",
        "dplat_collector",
        "ecto_poke",
        "robcollect0r"
      ]
    };
  },
};
</script>