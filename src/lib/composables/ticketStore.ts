import { writable } from "svelte/store";

export const ticketStore = writable({
  tiketZona1: 0,
  tiketZona2: 1,
  tiketZona3: 0,
  totalHarga: 0,
  informasiPendaftar: []
})