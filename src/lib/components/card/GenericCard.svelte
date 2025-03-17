<script>
	export let eduventure;
</script>

<div class="bg-gray-1 shadow-2xl relative rounded-b-lg">
	<div class="relative">
		<div
			class="h-70 bg-gradient-to-b {eduventure.color === 'orange'
				? 'from-orange-4'
				: 'from-green-4'} {eduventure.color === 'orange'
				? 'to-orange-7'
				: 'to-green-7'} rounded-t-2xl"
		></div>
		<div class="absolute top-1/3 text-center w-full px-5">
			<h2 class="text-white">{eduventure.nama}</h2>
		</div>
	</div>
	<div class="px-10 absolute mt--15 text-center w-full flex flex-col gap-4">
		<div
			class="{eduventure.color === 'orange'
				? 'bg-orange-50'
				: 'bg-green-50'} rounded-2xl shadow-md h-50 flex flex-col items-center justify-center gap-3"
		>
			<img
				src={eduventure.color === 'orange' ? '/card/globe.webp' : '/card/science.webp'}
				class="h-20"
				alt="icon"
			/>
			<h1>{eduventure.harga}</h1>
			<p>{eduventure.detail}</p>
		</div>
	</div>
	<div class="flex flex-col justify-between h-2xl">
		<div class="mt-35 p-10 text-center">
			<p>
				{eduventure.textPertama}
			</p>
			<p class="mt-10">
				{@html eduventure.textKedua}
			</p>
		</div>
		<div class="p-10">
			<a href={eduventure.url}>
				<button class="btn bg-brand-primary text-white px-15 w-full">{eduventure.select}</button>
			</a>
		</div>
	</div>
</div>
