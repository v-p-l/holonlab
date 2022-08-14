<template>
  <v-card min-width="250px" max-width="320px" color="cards">
    <div class="d-flex flex-row py-2 px-4">
      <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex flex-row justify-space-between align-center">
          <v-card-title class="pa-0">{{
            data.name.length > 25 ? data.name.slice(0, 22) + "..." : data.name
          }}</v-card-title>
          <v-btn
            :disabled="!isLoggedIn || !isEmailVerified || loadingFavorite"
            small
            icon
            @click="emitFavorite()"
          >
            <v-icon :color="isFavorite ? 'red' : ''"
              >mdi-{{ isFavorite ? "heart" : "heart-outline" }}</v-icon
            >
          </v-btn>
        </div>
        <div class="d-flex flex-row align-center" style="gap: 4px">
          <IconRarity :rarity="data.rarity"></IconRarity>
          <div class="caption">
            {{
              data.setNumber + "/" + data.totalSetNumber + ", " + data.setName
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row flex-nowrap px-4 pb-4">
      <v-img
        v-if="data.imgURL !== 'null'"
        max-width="100px"
        :src="data.imgURL"
        @click="$emit('overlay', data.imgURL)"
      ></v-img>
      <v-avatar v-else tile size="100" class="ma-0" color="grey"> </v-avatar>
      <div class="d-flex flex-column justify-space-between pl-2">
        <div
          class="d-flex flex-row justify-space-between flex-wrap mb-2"
          style="gap: 4px"
        >
          <ChipPop
            v-for="(pop, i) in data.pops"
            :key="i"
            :grade="pop.grade"
            :value="pop.value"
          ></ChipPop>
        </div>
        <div class="d-flex flex-row justify-space-between align-center">
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
        </div>
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
    return {
    };
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