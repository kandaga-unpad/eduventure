<script>
	export let eduventure;
</script>

<div class="card">
	<img src={eduventure.image} class="w-full h-50 object-cover rounded-2xl" alt="" />
	<div class="my-5 flex flex-col gap-5">
		<div class="flex items-center gap-1">
			<div class="i-mdi-location text-pink-6"></div>
			<p class="text-pink-6">{eduventure.location}</p>
		</div>
		<div class="flex items-center gap-1">
			<div class="i-mdi-calendar"></div>
			<p class="font-bold">{eduventure.date}</p>
		</div>
		<div>
			<a href={eduventure.link} class="no-underline">
				<h4 class=" hover:text-brand-primary">{eduventure.title}</h4>
			</a>
			<p class="py-2 text-justify">
				{eduventure.description}
			</p>
		</div>
	</div>
	<div class="flex text-center">
		<a href={eduventure.link} class="btn bg-brand-primary text-white w-full no-underline">
			Daftar
		</a>
	</div>
</div>

<style>
	.card {
		@apply bg-gray-1 shadow-gray shadow-lg p-10 rounded-2xl flex flex-col justify-between;
	}

	.card:hover img {
		@apply hover:scale-105 transition-all-500;
	}
</style>
