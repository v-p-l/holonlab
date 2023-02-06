<template>
  <div class="d-flex flex-column" style="width: 100%">
    <!-- Search bar -->
    <div class="d-flex flex-row justify-center mb-4">
      <SearchBar
        :loading="queryLoading"
        @searchChange="handleSearchChange"
        :style="$vuetify.breakpoint.smAndDown ? 'max-width: 305px' : 'max-width: 500px'"
      ></SearchBar>
    </div>
    <!-- Filters -->
    <div class="d-flex flex-row justify-center flex-wrap mb-4" style="gap: 16px">
      <v-select
        v-model="filters.rarity"
        :items="rarityOptions"
        label="Rareté"
        outlined
        dense
        clearable
        hide-details
        style="max-width: 305px"
      ></v-select>
      <v-select
        v-model="filters.setName"
        :items="setNameOptions"
        label="Extension"
        outlined
        dense
        clearable
        hide-details
        style="max-width: 305px"
      ></v-select>
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
import IconLoading from "@/components/Icons/IconLoading.vue";
import CardPop from "@/components/Cards/CardPop.vue";
import ButtonDefault from "@/components/Buttons/ButtonDefault.vue";

export default {
  name: "Cards",
  components: {
    SearchBar,
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
        "Prime",
        "Légende",
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
        "Platine",
        "Platine Rivaux Émergeants",
        "Platine Vainqueurs Suprêmes",
        "HearthGold SoulSilver",
        "HS Déchaînement",
        "HS Indomptable",
        "HS Triomphe",
        "L'Appel des Légendes"
      ],
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
