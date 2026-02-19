// Cache condivisa per i ticket tra CustomerTicketsScreen e TicketDetailScreen
let ticketsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuti di cache

export const ticketCache = {
  // Salva i ticket in cache
  setTickets: (tickets) => {
    ticketsCache = tickets;
    lastFetchTime = Date.now();
  },

  // Ottiene tutti i ticket dalla cache
  getTickets: () => {
    const now = Date.now();
    const isCacheValid = ticketsCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION);
    return isCacheValid ? ticketsCache : null;
  },

  // Ottiene un ticket specifico per ID
  getTicketById: (ticketId) => {
    if (!ticketsCache) return null;
    return ticketsCache.find(t => t.id === parseInt(ticketId));
  },

  // Controlla se la cache è valida
  isCacheValid: () => {
    const now = Date.now();
    return ticketsCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION);
  },

  // Forza il refresh della cache
  invalidateCache: () => {
    ticketsCache = null;
    lastFetchTime = null;
  },

  // Aggiorna un ticket specifico nella cache
  updateTicket: (updatedTicket) => {
    if (!ticketsCache) return;
    const index = ticketsCache.findIndex(t => t.id === updatedTicket.id);
    if (index !== -1) {
      ticketsCache[index] = updatedTicket;
    }
  }
};
