<template>
  <v-icon small :color="transformedColor(rarity)">mdi-{{ transformedIcon(rarity) }}</v-icon>
</template>

<script>
export default {
  props: {
    rarity: String,
  },
  data() {
    return {};
  },
  methods: {
    transformedColor(rarity) {
      switch (rarity) {
        case "Commune":
        case "Peu commune":
        case "Rare":
        case "Holographique":
        case "Holographique (deck)":
          return "";
        case "EX":
        case "Star":
        case "Niv.X":
        case "Secrète":
        case "SL":
        case "Prime":
        case "Légende": 
          return "yellow";
        default:
          return "";
      }
    },
    transformedIcon(rarity) {
      switch (rarity) {
        case "Commune":
          return "circle";
        case "Peu commune":
          return "cards-diamond";
        case "Rare":
        case "EX":
        case "Star":
        case "Niv.X":
        case "SL":
        case "Prime":
        case "Légende": 
          return "star";
        case "Holographique":
        case "Holographique (deck)":
          return "star-outline";
        case "Secrète":
          return "star-shooting";
        default:
          return "minus";
      }      
    }
  },
};
</script>