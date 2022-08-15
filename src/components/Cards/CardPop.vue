<template>
  <v-card
    max-width="305"
    color="cards"
    hover
    :to="'/pca/' + data.id"
    class="pa-3"
  >
    <div
      class="d-flex flex-row subtitle-1 font-weight-medium"
      style="line-height: 1"
    >
      {{ data.name }}
    </div>
    <div class="d-flex flex-row justify-space-between mb-2">
      <div class="caption">
        {{ data.setName }}
      </div>
      <div class="d-flex flex-row align-center" style="gap: 4px">
        <IconRarity :rarity="data.rarity"></IconRarity>
        <div class="caption">
          {{ data.setNumber + "/" + data.totalSetNumber }}
        </div>
      </div>
    </div>
    <div class="d-flex flex-row" style="gap: 8px">
      <v-img
        v-if="data.imgURL !== 'null'"
        max-height="137.5px"
        max-width="100px"
        :src="data.imgURL"
      ></v-img>
      <div class="d-flex flex-column justify-space-between">
        <div
          class="d-flex flex-row flex-wrap"
          style="gap: 4px"
        >
          <ChipPop
            v-for="(pop, i) in data.pops"
            :key="i"
            :grade="pop.grade"
            :value="pop.value"
          ></ChipPop>
        </div>
        <div class="d-flex flex-row justify-end">
          <v-btn
            :disabled="!isLoggedIn || !isEmailVerified || loadingFavorite"
            icon
            @click.prevent="emitFavorite()"
          >
            <v-icon :color="isFavorite ? 'red' : ''"
              >mdi-{{ isFavorite ? "heart" : "heart-outline" }}</v-icon
            >
          </v-btn>
        </div>
        <!-- <div class="d-flex flex-row justify-space-between align-center">
          <div
            v-if="showLastUpdate"
            class="d-flex flex-row justify-end align-center"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" class="mr-1">
                  mdi-update
                </v-icon>
              </template>
              <span>Dernier update</span>
            </v-tooltip>
            <div v-if="data.lastUpdate" class="body-2 text--secondary">
              {{ data.lastUpdate.seconds | moment("DD/MM, hh:mm") }}
            </div>
          </div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="redirect"
                small
                icon
                :to="'/pca/' + data.id"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template>
            <span>Détails</span>
          </v-tooltip>
        </div> -->
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import ChipPop from "@/components/Chips/ChipPop.vue";
import IconRarity from "@/components/Icons/IconRarity.vue";

export default {
  name: "CardPop",
  components: {
    ChipPop,
    IconRarity,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    redirect: {
      type: Boolean,
      default: false,
    },
    showLastUpdate: {
      type: Boolean,
      default: false,
    },
    loadingFavorite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isEmailVerified"]),
    isFavorite: {
      get() {
        return this.data.isFavorite;
      },
      set(value) {
        return value;
      },
    },
    cardSubtitle() {
      return (
        this.data.rarity +
        ", " +
        this.data.setNumber +
        "/" +
        this.data.totalSetNumber +
        " - " +
        this.data.setName
      );
    },
  },
  mounted() {},
  methods: {
    emitFavorite() {
      this.$emit("actionFavorite", this.data.id);
    },
  },
};
</script>