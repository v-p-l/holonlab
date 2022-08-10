<template>
  <v-btn :block="block" :color="color" :icon="iconOnly" depressed :small="small" :loading="loading" @click="$emit('action')">
    <span v-if="text">{{ text }}</span>
    <v-icon v-if="icon">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: ""
    },
    small: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  }
}
</script>