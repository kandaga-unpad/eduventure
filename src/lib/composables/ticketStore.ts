import { writable } from "svelte/store";

export const ticketStore = writable({
  tiketZona1: 0,
  tiketZona2: 0,
  tiketZona3: 0,
  totalHarga: 0,
  informasiPendaftar: []
})

export const warnaStatusPembayaran = (status: string) => {
  switch (status) {
    case 'pendung':
      return 'text-gray-5'
    case 'paid':
      return 'text-green-6'
    case 'cancel':
      return 'text-red-6'
    case 'expired':
      return 'text-yellow-5'
    default:
      return 'text-brand-primary'
  }
}

export const statusPembayaran = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Menunggu Pembayaran'
    case 'paid':
      return 'Pembayaran Berhasil'
    case 'cancel':
      return 'Pembayaran Dibatalkan'
    case 'expired':
      return 'Pembayaran Kadaluarsa'
    default:
      return 'Tidak diketahui'
  }
}