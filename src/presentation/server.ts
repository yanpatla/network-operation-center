import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/checks-service-multiple";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailServices } from "./email/email.services";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const emailServices = new EmailServices();
export class Server {
  public static async start() {
    console.log("Server started...");

    //* Send Email

    // new sendEmailLogs(emailServices, fileSystemLogRepository).execute([
    //   envs.EMAIL,
    // ]);
    // emailServices.sendEmailWithFileSystemLogs(["tomasleonpatlayan@gmail.com"]);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url: string = "https://google.com";

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
