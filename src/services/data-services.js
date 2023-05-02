import http from "../http-common";

class DataService {
    get_mail(email_data) {
        console.log(email_data);
        return http.get("/mail/send_mail/get");
    }

    send_mail(email_data) {
        console.log(email_data);
        return http.post("/mail/send_mail/send", email_data);
    }

  }
  
  export default new DataService();