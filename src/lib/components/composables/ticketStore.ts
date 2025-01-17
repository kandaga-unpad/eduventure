import { writable } from "svelte/store";

export const ticketStore = writable({
  tiketZona1: 2,
  tiketZona2: 4,
  tiketZona3: 5,
  totalHarga: 0,
  informasiPendaftar: []
})