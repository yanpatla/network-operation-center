import 'dotenv/config'

import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';

(async () => {
  main();
})();

function main() {
  // Server.start();

  console.log({port:envs.PORT});
  console.log({email:process.env.MAILER_EMAIL});
  console.log({eky:process.env.MAILER_SECRET_KEY});
  
}
