export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel; //Enum
  public message: string;
  public createdAt: Date;
  public origin: string; //* Me va a indicar cual es el archivo de origen, en cual fue el archivo que se disparo/ deonde se llamo

  //! TIP: en clean code se sugiere que cuando hay 3 o mas argumentos se mande directamente un objeto
  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;

    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  //* Yo estaria recibiendo esto "{"level":"low","message":"Hola Mundo", "createdAt":"12314123"}"
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  };
}
