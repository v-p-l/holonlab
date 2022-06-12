<template>
  <v-row no-gutters>
    <v-col cols="12">
      <h1 class="mb-2">Favoris</h1>
      <p class="mb-0">
        En ajoutant une carte à vos favoris, vous recevrez une notification à
        chaque fois que ses populations sont mises à jour et que de nouvelles
        données sont détectées.
      </p>
      <p class="mb-8">Vous pouvez ajouter jusqu'à 5 cartes à vos favoris.</p>
      <v-row no-gutters v-if="!loading" class="d-flex flex-row justify-center flex-wrap">
        <div v-if="cards.length === 0" class="d-flex flex-row align-center">
          <div class="caption mr-1">
            Commencer à ajouter des cartes à vos favoris
          </div>
          <v-btn small icon to="/cards">
            <v-icon>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <div v-else class="d-flex flex-row justify-center flex-wrap" style="gap: 16px">
          <CardPop
            v-for="(card, i) in cards"
            :key="i"
            :data="card"
            redirect
            showLastUpdate
            @actionFavorite="handleFavorite"
          ></CardPop>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import CardPop from "@/components/Cards/CardPop.vue";
export default {
  name: "Favorites",
  components: {
    CardPop,
  },
  data() {
    return {
      loading: false,
      cards: [],
    };
  },
  computed: {},
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    ...mapActions("pcatracker", ["getFavorites", "addToFavorite"]),
    async getDataFromApi() {
      this.loading = true;
      try {
        this.cards = await this.handleGetFavorites();
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    async handleGetFavorites() {
      return this.getFavorites();
    },
    async handleFavorite(cardId) {
      try {
        let res = await this.addToFavorite({ cardId });
        const cardIndex = this.cards.findIndex((card) => card.id === cardId);
        this.cards[cardIndex].isFavorite = !this.cards[cardIndex].isFavorite;
        this.$toast.success(res);
      } catch (err) {
        this.$toast.error(err);
      }
    },
  },
};
</script>
