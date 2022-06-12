<template>
  <v-menu
    v-model="menuIsOpen"
    offset-y
    left
    :close-on-content-click="false"
    :max-width="270"
    :min-width="270"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon :small="isSmall" v-bind="attrs" v-on="on">
        <v-icon :color="areFiltersActive ? 'primary' : ''">mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-list class="pt-4 pb-2">
      <template v-for="(_, slotName) in $scopedSlots">
        <slot :name="slotName" />
      </template>
      <v-list-item class="d-flex flex-row justify-end">
        <v-btn text class="mr-2" @click="menuIsOpen = false">Annuler</v-btn>
        <v-btn color="primary" depressed dense @click="emitFiltersChange()"
          >Filtrer</v-btn
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
		areFiltersActive: Boolean,
		isSmall: {
			type: Boolean,
			default: false
		},
	},
  data() {
    return {
      menuIsOpen: false,
    };
  },
  methods: {
    emitFiltersChange(value) {
			this.$emit('filtersChange', value);
			this.menuIsOpen = false;
    },
  },
};
</script>