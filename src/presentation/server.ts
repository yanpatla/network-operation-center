import { CheckService } from "../domain/use-cases/checks/checks-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    //* Send Email

    CronService.createJob("*/5 * * * * *", () => {
      const url: string = "https://google.com";

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
