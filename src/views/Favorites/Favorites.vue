<template>
  <v-row no-gutters>
    <v-col cols="12">
      <h1 class="mb-2">Favoris</h1>
      <p class="mb-0">
        En ajoutant une carte à vos favoris, vous recevrez une notification à
        chaque fois que ses populations sont mises à jour et que de nouvelles
        données sont détectées.
      </p>
      <p class="mb-4">Vous pouvez ajouter jusqu'à 5 cartes à vos favoris.</p>
      <div
        v-if="!loading"
        class="d-flex flex-row justify-center flex-wrap"
      >
        <div v-if="cards.length === 0" class="d-flex flex-row align-center">
          <ButtonDefault
            text="Ajouter des cartes"
            icon="mdi-arrow-right"
            color="primary"
            to="/pca"
          ></ButtonDefault>
        </div>
        <div
          v-else
          class="d-flex flex-row justify-center flex-wrap"
          style="gap: 16px"
        >
          <CardPop
            v-for="(card, i) in cards"
            :key="i"
            :data="card"
            redirect
            showLastUpdate
            @actionFavorite="handleFavorite"
          ></CardPop>
        </div>
      </div>
      <div v-else class="d-flex flex-row justify-center">
        <IconLoading color="primary"></IconLoading>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import CardPop from "@/components/Cards/CardPop.vue";
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  name: "Favorites",
  components: {
    CardPop,
    ButtonDefault,
    IconLoading
  },
  data() {
    return {
      loading: false,
      cards: [],
    };
  },
  computed: {},
  created() {
    this.getDataFromApi();
  },
  methods: {
    ...mapActions("pcatracker", ["getFavorites", "addToFavorite"]),
    async getDataFromApi() {
      this.loading = true;
      try {
        this.cards = await this.getFavorites();
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
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
