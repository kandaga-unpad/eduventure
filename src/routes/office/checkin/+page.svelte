<script>
	let placeholder = $state('Checkin Tiket Eduventure');
</script>

<section>
	<div class="pt-30">
		<h3 class="text-center">{placeholder}</h3>
		<div class="max-w-3xl ma text-center py-20">
			<div>
				<form action="/?checkin" method="post">
					<div>
						<label for="qr_code">ID Tiket | QR Code :</label>
						<input
							type="text"
							id="qr_code"
							name="qr_code"
							placeholder="ID Tiket atau QR Code"
							required
						/>
					</div>
					<div class="my-4">
						<button class="btn bg-orange w-full" type="submit">Check In</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma min-h-screen;
	}

	input {
		@apply p-3 rounded-full;
	}
</style>
