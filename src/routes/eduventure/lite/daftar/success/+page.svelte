<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			goto('/profile');
		}, 5000);
	});
</script>

<section class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-12 px-4">
	<div class="container mx-auto max-w-4xl text-center">
		<div class="bg-white shadow-xl rounded-2xl p-8 md:p-12">
			<h1 class="text-3xl md:text-4xl font-bold text-green-600 mb-4">Pengajuan Berhasil!</h1>
			<p class="text-gray-600 mb-8">
				Terima kasih telah mengajukan kegiatan Eduventure Lite. Pengajuan Anda telah berhasil
				dikirim dan sedang diproses.
			</p>
			<p class="text-sm text-gray-500">Anda akan diarahkan ke halaman profil dalam 5 detik...</p>
			<div>
				<h4>Perlu Bantuan ?</h4>
				<p>
					Jika Anda membutuhkan bantuan lebih lanjut, silakan hubungi kami melalui email <a
						href="mailto:eduventure@unpad.ac.id">eduventure@unpad.ac.id</a
					>.
				</p>
				<p>
					Atau hubungi kami melalui WhatsApp di nomor <a href="tel:+6282211676765">+6282211676765</a
					>.
				</p>
			</div>
		</div>
	</div>
</section>
