import  app  from "./bootstrap/bootstrap";
import {Container} from 'typescript-ioc';
import { DatabaseService } from "./common/services/database.service";
const port = process.env.PORT || 3000;

const databaseService:DatabaseService=Container.get(DatabaseService);

databaseService.connectToDB();

app.listen(port, () =>
  console.log(`CodeRefs listening at http://localhost:${port}`)
);
