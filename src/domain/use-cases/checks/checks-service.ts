import fs from "fs";
import * as path from "path";
import {
  LogEntity,
  LogEntityOptions,
  LogSeverityLevel,
} from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements ICheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  public async execute(url: string): Promise<boolean> {
    // Get the absolute path of the current file
    const currentFilePath = __filename;

    // Use fs.realpathSync to get the real (absolute) path
    const realFilePath = fs.realpathSync(currentFilePath);

    // Extract only the filename from the path
    const currentFileName = path.basename(realFilePath);
    try {
      const req = fetch(url);
      if (!(await req).ok) throw new Error(`Error on check service ${url}`);
      const message = `Service ${url} working`;

      const options: LogEntityOptions = {
        level: LogSeverityLevel.high,
        message: message,
        origin: currentFileName,
      };
      const log = new LogEntity(options);
      this.logRepository.saveLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const options: LogEntityOptions = {
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: currentFileName,
      };
      const log = new LogEntity(options);
      this.logRepository.saveLogs(log);

      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
