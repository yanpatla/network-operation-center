interface ICheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements ICheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const req = fetch(url);
      if (!(await req).ok) throw new Error(`Error on check service ${url}`);
        console.log(`${url} is ok`);
        
      return true
    } catch (error) {
        console.log(`${error} `);
        
        return false
    }
  }
}
