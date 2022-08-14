<template>
  <div class="d-flex flex-column" style="width: 100%">
    <!-- Overlay -->
    <v-overlay :absolute="absolute" :opacity="opacity" :value="overlay" div class="d-flex flex-row justify-center" style="position: fixed; width: 100%;">
      <div class="d-flex flex-column justify-center align-center">
        <v-btn color="primary" @click="overlay = false" class="mb-4">
          Hide Overlay
        </v-btn>
        <v-img :src="overlayImgURL" min-width="300px" max-width="400px"></v-img>
      </div>
    </v-overlay>
    <!-- Search bar and filters -->
    <div class="d-flex flex-row mb-6">
      <SearchBar
        :loading="queryLoading"
        @searchChange="handleSearchChange"
        class="mr-4"
      ></SearchBar>
      <ButtonFilters
        :areFiltersActive="
          Object.values(filters).some((x) => x !== null && x !== '')
        "
        @filtersChange="handleGetCards"
      >
        <template v-slot:rarity>
          <v-list-item class="mb-2">
            <div class="d-flex flex-column" style="width: 100%">
              <div class="caption">Rareté</div>
              <v-select
                v-model="filters.rarity"
                :items="rarityOptions"
                label=""
                hide-details
                outlined
                flat
                dense
                clearable
              ></v-select>
            </div>
          </v-list-item>
        </template>
        <template v-slot:set>
          <v-list-item class="mb-4">
            <div class="d-flex flex-column" style="width: 100%">
              <div class="caption">Extension</div>
              <v-select
                v-model="filters.setName"
                :items="setNameOptions"
                label=""
                hide-details
                outlined
                flat
                dense
                clearable
              ></v-select>
            </div>
          </v-list-item>
        </template>
      </ButtonFilters>
    </div>
    <!-- Cards -->
    <div v-if="loading" class="d-flex flex-row justify-center">
      <IconLoading :color="'primary'"></IconLoading>
    </div>
    <div v-if="!loading && error">{{ error }}</div>
    <div
      v-if="!loading && !error"
      class="d-flex flex-row justify-center flex-wrap mb-4"
      style="gap: 16px"
    >
      <CardPop
        v-for="(card, i) in cards"
        :key="i"
        :data="card"
        redirect
        showLastUpdate
        :loadingFavorite="loadingFavorite"
        @actionFavorite="handleFavorite"
        @overlay="handleOverlay"
      ></CardPop>
    </div>
    <!-- Load more -->
    <div
      v-if="!loading && cards.length % 9 === 0 && cards.length > 0 && next"
      class="d-flex flex-row justify-center"
    >
      <ButtonDefault
        text="Voir plus"
        color="primary"
        :loading="loadingMore"
        @action="loadMore()"
      ></ButtonDefault>
    </div>
  </div>
</template>

<script>
import db from "@/main.js";
import {
  collection,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { mapActions } from "vuex";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import ButtonFilters from "@/components/Buttons/ButtonFilters.vue";
import IconLoading from "@/components/Icons/IconLoading.vue";
import CardPop from "@/components/Cards/CardPop.vue";
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";

export default {
  name: "Cards",
  components: {
    SearchBar,
    ButtonFilters,
    IconLoading,
    CardPop,
    ButtonDefault,
  },
  data() {
    return {
      loading: true,
      error: "",
      loadingMore: false,
      loadingFavorite: false,
      queryLoading: false,
      cards: [],
      next: null,
      rarityOptions: [
        "Commune",
        "Peu commune",
        "Rare",
        "Holographique",
        "EX",
        "Niv.X",
        "Star",
        "Secrète",
      ],
      setNameOptions: [
        "Set de base",
        "Jungle",
        "Fossile",
        "Rocket",
        "Neo Genesis",
        "Neo Discovery",
        "Neo Revelation",
        "Neo Destiny",
        "Aquapolis",
        "Expedition",
        "EX Rubis & Saphir",
        "EX Tempête de Sable",
        "EX Dragon",
        "EX Légendes Oubliées",
        "EX Rouge Feu & Vert Feuille",
        "EX Deoxys",
        "EX Team Magma VS Team Aqua",
        "EX Émeraude",
        "EX Forces Cachées",
        "EX Créateurs de légendes",
        "EX Espèces Delta",
        "EX Fantômes Holon",
        "EX Gardiens de Cristal",
        "EX Île des Dragons",
        "EX Gardiens du Pouvoir",
        "Diamant & Perle",
        "D&P Trésors Mystérieux",
        "D&P Merveilles Secrètes",
        "D&P Duels au sommet",
        "D&P Aube Majestueuse",
        "D&P Éveil des Légendes",
        "D&P Tempête",
      ],
      absolute: true,
      opacity: 0.7,
      overlay: false,
      overlayImgURL: "",
    };
  },
  computed: {
    // ...mapGetters("pcatracker", ["filters"]),
    filters: {
      get() {
        return this.$store.getters["pcatracker/filters"];
      },
      set(newValue) {
        this.$store.dispatch("pcatracker/updateFilters", newValue);
        this.handleGetCards();
      },
    },
    filterByName() {
      if (this.filters.name) {
        return this.filters.name;
      } else {
        return "";
      }
    },
    filterByRarity() {
      if (this.filters.rarity) {
        return this.filters.rarity;
      } else {
        return "";
      }
    },
    filterBySetName() {
      if (this.filters.setName) {
        return this.filters.setName;
      } else {
        return "";
      }
    },
    filterByNext() {
      if (this.next) {
        return this.next;
      } else {
        return "";
      }
    },
  },
  created() {
    this.handleGetCards();
  },
  methods: {
    ...mapActions("pcatracker", ["getCards", "addToFavorite"]),
    async handleGetCards() {
      this.loading = true;

      try {
        const queryCards = await this.queryCreator();
        let res = await this.getCards(queryCards);
        this.cards = res.cards;
        this.next = res.nextQuery;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.error = "error";
        console.log(err);
      }
    },
    async loadMore() {
      this.loadingMore = true;

      let queryCards = this.queryNextCreator();

      try {
        let res = await this.getCards(queryCards);
        this.cards.push(...res.cards);
        this.next = res.nextQuery;
        this.loadingMore = false;
      } catch (err) {
        this.loadingMore = false;
        console.log(err);
      }
    },
    async queryCreator() {
      const name = this.filterByName;
      const rarity = this.filterByRarity;
      const setName = this.filterBySetName;

      const cardsRef = collection(db, "cards");
      let queryCards = "";

      switch (true) {
        case rarity.length > 0 && setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("rarity", "==", rarity),
            where("setName", "==", setName),
            limit(9)
          );
          break;
        case rarity.length > 0 && !setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("rarity", "==", rarity),
            limit(9)
          );
          break;
        case !rarity.length > 0 && setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("setName", "==", setName),
            limit(9)
          );
          break;
        default:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            limit(9)
          );
          break;
      }

      return queryCards;
    },
    queryNextCreator() {
      const name = this.filterByName;
      const rarity = this.filterByRarity;
      const setName = this.filterBySetName;
      const next = this.filterByNext;

      const cardsRef = collection(db, "cards");
      let queryCards = "";

      switch (true) {
        case rarity.length > 0 && setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("rarity", "==", rarity),
            where("setName", "==", setName),
            startAfter(next),
            limit(9)
          );
          break;
        case rarity.length > 0 && !setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("rarity", "==", rarity),
            startAfter(next),
            limit(9)
          );
          break;
        case !rarity.length > 0 && setName.length > 0:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            where("setName", "==", setName),
            startAfter(next),
            limit(9)
          );
          break;
        default:
          queryCards = query(
            cardsRef,
            where("name", ">=", name),
            where("name", "<=", name + "\uf8ff"),
            startAfter(next),
            limit(9)
          );
          break;
      }

      return queryCards;
    },
    async handleSearchChange(search) {
      this.filters.name = search;
    },
    async handleFavorite(cardId) {
      try {
        this.loadingFavorite = true;
        let res = await this.addToFavorite({ cardId });
        const cardIndex = this.cards.findIndex((card) => card.id === cardId);
        this.cards[cardIndex].isFavorite = !this.cards[cardIndex].isFavorite;
        this.$toast.success(res);
      } catch (err) {
        this.$toast.error(err);
      } finally {
        this.loadingFavorite = false;
      }
    },
    handleOverlay(value) {
      this.overlayImgURL = value;
      this.overlay = true;
    },
  },
  watch: {
    filters: {
      handler() {
        this.handleGetCards();
      },
      deep: true,
    },
  },
};
</script>
