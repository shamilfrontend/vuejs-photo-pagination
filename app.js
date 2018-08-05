const appId = 'ff4cf6b71bbc1fbd2add213c2e9ccb79b315619eadff2653c3feb5b055e8c40f';

new Vue({
	el: '#app',
	data: {
		photos: [],
		totalPhotos: 0,
		perPage: 9,
		currentPage: 1,
		currentPhoto: null,
		showModal: false
	},
	methods: {
		fetchPhotos(page) {
			const options = {
				params: {
					client_id: appId,
					page,
					per_page: this.perPage
				}
			};

			this.$http.get('https://api.unsplash.com/photos', options)
				.then(response => {
					console.log('response.data', response.data);
					this.photos = response.data;
					this.totalPhotos = parseInt(response.headers.get('x-total'));
					this.currentPage = page;
				})
		},
		selectPhoto(photoId) {
			this.currentPhoto = this.photos.find(item => item.id === photoId);
			this.toggleModal();
			console.log('currentPhoto', this.currentPhoto)
		},
		toggleModal() {
			this.showModal = !this.showModal;
		}
	},
	created() {
		this.fetchPhotos(this.currentPage);
	}
});
