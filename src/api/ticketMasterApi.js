import Api from "./Api";

class TicketMasterApi extends Api {
  ticketMasterUrl = "ticket-master";
  getUpcomingTours(keyword) {
    return this.get(`${this.ticketMasterUrl}/${encodeURIComponent(keyword)}`);
  }
}

export default new TicketMasterApi();
