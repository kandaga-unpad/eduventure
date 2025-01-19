<script>
	import { handleAnchorClick } from '../../composables/link';
</script>

<div class="text-center">
	<div class="my-5">
		<h1 class="text-brand-secondary mb-0 xl:mb-2">Eduventure</h1>
		<h1>Universitas Padjadjaran</h1>
	</div>
	<div class="my-5">
		<h4>Mantapkan langkah menuju masa depanmu bersama Unpad Eduventure!</h4>
	</div>
	<div class="my-5">
		<p>
			Temukan passion dan kenali pilihan studi masa depanmu dengan mengikuti Unpad Eduventure yang
			dirancang khusus untuk memberikanmu pengalaman kuliah di Universitas Padjadjaran.
		</p>
	</div>
	<div class="flex items-center justify-center gap-5">
		<a href="#skema-eduventure" on:click={handleAnchorClick}>
			<button class="main-btn">Pelajari</button>
		</a>
		<a href="#skema-eduventure">
			<button class="secondary-btn">Daftar</button>
		</a>
	</div>
</div>

<style>
	.main-btn {
		@apply btn bg-brand-secondary text-white font-semibold border-brand-secondary border-1 py-3 px-8;
	}

	.secondary-btn {
		@apply btn bg-white text-brand-secondary font-semibold border-brand-secondary border-1 py-3 px-8 hover:(bg-brand-secondary text-white);
	}
</style>
