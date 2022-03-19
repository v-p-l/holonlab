<template>
	<div>
    <v-btn
      color="primary"
      @click="updateLoginDialog(true)"
    >
      Login
    </v-btn>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	methods: {
		...mapMutations('dialogs', ['updateLoginDialog']),
	}
};
</script>