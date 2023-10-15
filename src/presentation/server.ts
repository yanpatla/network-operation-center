import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();

      console.log("Se esta ejecutando cada 5 seg", date);
    });
  }
}
