<script>
	let placeholder = $state('Panduan Eduventure');
</script>

<section>
	<div>
		<h2 class="text-center">{placeholder}</h2>
	</div>
	<div class="my-20 grid grid-cols-1 lg:grid-cols-2 gap-5">
		<div class="text-center bg-blue-1 pb-10 rounded-lg">
			<h4 class="bg-brand-primary text-white py-5 rounded-t-lg">Panduan Pembelian Tiket</h4>
			<p class="px-10 mt-10">
				Halaman panduan pembelian tiket, silahkan baca dengan seksama tata cara pembelian tiket
				melalui tautan berikut :
			</p>
			<div class="mt-5">
				<a href="/panduan/pembelian-tiket" class="btn bg-brand-primary text-white">
					Panduan Pembelian
				</a>
			</div>
		</div>
		<div class="text-center bg-blue-1 pb-10 rounded-lg">
			<h4 class="bg-brand-primary text-white py-5 rounded-t-lg">Panduan Checkin Tiket</h4>
			<p class="px-10 mt-10">
				Halaman panduan untuk melakukan checkin pada saat kegiatan berlangsung, silahkan baca dengan
				seksama tata cara checkin tiket:
			</p>
			<div class="mt-5">
				<a href="/panduan/check-in-tiket" class="btn bg-brand-primary text-white">
					Panduan Checkin
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma pt-35;
	}
</style>
