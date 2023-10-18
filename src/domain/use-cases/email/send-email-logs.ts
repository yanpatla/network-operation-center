import { EmailServices } from "../../../presentation/email/email.services";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class sendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailServices,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error("Email log not sent");
      const log = new LogEntity({
        message: "Log Email sent",
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",   
      });
      this.logRepository.saveLogs(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLogs(log);
      return false;
    }
  }
}
