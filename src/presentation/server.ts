import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService().execute("https://google.com");
      new CheckService().execute("http://localhost:3000");
    });
  }
}
