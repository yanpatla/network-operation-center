import { envs } from "../config/plugins/envs.plugin";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailServices } from "./email/email.services";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const emailServices = new EmailServices();
export class Server {
  public static start() {
    console.log("Server started...");

    //* Send Email

    new sendEmailLogs(emailServices, fileSystemLogRepository).execute([
      envs.EMAIL,
    ]);
    // emailServices.sendEmailWithFileSystemLogs(["tomasleonpatlayan@gmail.com"]);
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url: string = "https://google.com";

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
