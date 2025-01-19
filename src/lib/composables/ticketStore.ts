import { writable } from "svelte/store";

export const ticketStore = writable({
  tiketZona1: 0,
  tiketZona2: 1,
  tiketZona3: 0,
  totalHarga: 0,
  informasiPendaftar: []
})

export const warnaStatusPembayaran = (status: string) => {
  switch (status) {
    case 'pendung':
      return 'text-gray-5'
      break;
    case 'paid':
      return 'text-green-6'
      break;
    case 'cancel':
      return 'text-red-6'
    default:
      return 'text-brand-primary'
      break;
  }
}

export const statusPembayaran = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Menunggu Pembayaran'
      break;
    case 'paid':
      return 'Pembayaran Berhasil'
      break;
    case 'cancel':
      return 'Pembayaran Dibatalkan'
      break;
    default:
      return 'Tidak diketahui'
      break;
  }
}