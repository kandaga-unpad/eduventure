<script>
	export let zona;
</script>

<div class="grid grid-cols-1 gap-5 xl:gap-20 my-20 xl:grid-cols-2">
	<div class="relative {zona.isReverse === true ? 'xl:order-last' : ''}">
		<div class="bg-brand-secondary h-md w-full rounded-lg"></div>
		<img
			src={zona.gambar}
			alt="Zona Eduventure 1"
			class="absolute top-0 xl:top--8 xl:right--8 h-md w-full object-cover rounded-lg"
		/>
	</div>
	<div class="flex flex-col gap-4">
		<h4 class="text-brand-primary">{zona.tipe}</h4>
		<div class="flex flex-col gap-4">
			<h1>{zona.nama}</h1>
			<p>
				{zona.deskripsi}
			</p>
		</div>
		<a href={zona.link}>
			<button class="btn bg-brand-secondary px-8 py-4 text-white font-semibold">
				{zona.button}
			</button>
		</a>
	</div>
</div>
