<template>
  <v-text-field
    v-model="search"
    label="Nom de la carte"
    prepend-inner-icon="mdi-magnify"
    :loading="loading"
    hide-details
    clearable
    dense
    solo
    flat
  ></v-text-field>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: "",
    };
  },
  mounted() {
    let test = this.$store.getters['pcatracker/filters'];
    if (test.name.length > 0) this.search = test.name;
  },
  methods: {
    titleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");
    },
  },
  watch: {
    search: _.debounce(function (newValue) {
      newValue
        ? this.$emit("searchChange", this.titleCase(newValue))
        : this.$emit("searchChange", "");
    }, 700),
  },
};
</script>
