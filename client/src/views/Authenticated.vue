<template>
  <v-container>
    <h1>This page is only accessible once authenticated with a verified email</h1>
		<i>"{{ quote }}"</i>
		<p>- Kanye West</p>
  </v-container>
</template>

<script>
import KanyeAPI from '@/services/KanyeAPI';
export default {
  components: {
  },
  data() {
    return {
			quote: "Kanye West quote",
		};
  },
	mounted() {
		this.loadQuote();
	},
	methods: {
		async loadQuote() {
			try {
				const response = await KanyeAPI.getQuote()
				this.quote = response.data.quote
			} catch (err) {
				console.log(err)
			}
		},
	}
};
</script>