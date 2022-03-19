import API from './API'

const url = "https://api.kanye.rest";

export default {
	getQuote() {
		return API(url).get('/')
	}
}