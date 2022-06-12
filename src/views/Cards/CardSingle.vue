<template>
  <div class="d-flex flex-row justify-center" style="width: 100%">
    <div class="d-flex flex-column align-center">
      <v-breadcrumbs
        :items="breadcrumbsItems"
        divider="-"
        class="pa-0 mb-4"
      ></v-breadcrumbs>
      <div v-if="!loading" class="d-flex flex-row justify-center mb-6">
        <CardPop
          v-if="card"
          :data="card"
          showLastUpdate
          @actionFavorite="handleFavorite"
        ></CardPop>
      </div>
      <div v-else class="d-flex flex-row justify-center mb-6">
        <IconLoading :color="'primary'"></IconLoading>
      </div>
      <v-list class="py-0" max-width="420px" color="cards">
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-title class="text-center"
              >Historique des populations</v-list-item-title
            >
          </v-list-item>
          <v-divider v-if="loading"></v-divider>
          <v-list-item v-if="loading" class="d-flex flex-row justify-center">
            <IconLoading :color="'primary'"></IconLoading>
          </v-list-item>
          <div v-else>
            <template v-for="(populations, index) in populationsHistory">
              <v-divider :key="`divider-${index}`"></v-divider>
              <div
                :key="`item-${index}`"
                class="d-flex flex-column align-center pa-3"
              >
                <div
                  class="
                    d-flex
                    flex-row
                    justify-center
                    caption
                    text--secondary
                    mb-2
                  "
                >
                  {{ populations.lastUpdate.seconds | moment("DD/MM, hh:mm") }}
                </div>
                <div
                  class="d-flex flex-row justify-center flex-wrap mb-2"
                  style="gap: 8px"
                >
                  <div v-for="(pop, i) in populations.pops" :key="i">
                    <div class="d-flex flex-column" style="position: relative">
                      <v-avatar
                        v-if="
                          populationsHistory[index + 1] &&
                          populationsHistory[index].pops[i].value -
                            populationsHistory[index + 1].pops[i].value >
                            0
                        "
                        color="green"
                        size="16"
                        style="position: absolute; top: -9px; right: -5px"
                      >
                        <span class="white--text" style="font-size: 10px">
                          +{{
                            populationsHistory[index].pops[i].value -
                            populationsHistory[index + 1].pops[i].value
                          }}
                        </span>
                      </v-avatar>
                      <ChipPop :grade="pop.grade" :value="pop.value"></ChipPop>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import IconLoading from "@/components/Icons/IconLoading.vue";
import CardPop from "@/components/Cards/CardPop.vue";
import ChipPop from "@/components/Chips/ChipPop.vue";
export default {
  name: "CardSingle",
  components: {
    IconLoading,
    CardPop,
    ChipPop,
  },
  data() {
    return {
      loading: true,
      card: null,
      populationsHistory: [],
      breadcrumbsItems: [
        {
          text: "Cartes",
          exact: true,
          disabled: false,
          to: { name: "Cards" },
        },
        {
          text: "",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    cardId() {
      return this.$route.params.card_id;
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  methods: {
    ...mapActions("pcatracker", ["getCardDetails", "addToFavorite"]),
    async getDataFromApi() {
      this.loading = true;
      try {
        const { card, populationsHistory } = await this.handleGetCard(
          this.cardId
        );
        this.card = card;
        this.populationsHistory = populationsHistory;
        this.breadcrumbsItems[1].text = card.name;
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.$toast.error(err);
        this.loading = false;
      }
    },
    async handleGetCard(cardId) {
      return this.getCardDetails(cardId);
    },
    async handleFavorite(cardId) {
      try {
        let res = await this.addToFavorite({ cardId });
        this.card.isFavorite = !this.card.isFavorite;
        this.$toast.success(res);
      } catch (err) {
        this.$toast.error(err);
      }
    },
  },
  watch: {
    cardId() {
      this.getDataFromApi();
    },
  },
};
</script>
