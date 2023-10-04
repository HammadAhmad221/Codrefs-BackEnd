import  app  from "./bootstrap/bootstrap";
import {Container} from 'typescript-ioc';
import { DatabaseService } from "./common/services/database.service";
//import * as fs from 'fs';
//import * as path from 'path';






const port = process.env.PORT || 3000;

const databaseService:DatabaseService=Container.get(DatabaseService);

databaseService.connectToDB();


//List files and folders names
/*const folderPath = 'C:\\Users\\lenovo\\OneDrive\\Desktop\\Projects\\readingFilesNamesFromLocal\\node-express-realworld-example-app';

fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});*/
//List whole paths of files and if folder all paths inside the folder
/*function listFilesRecursive(folderPath: string) {
  fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error('Error retrieving file stats:', statErr);
          return;
        }

        if (stats.isDirectory()) {
          listFilesRecursive(filePath); // Recursively list files in subdirectory
        } else {
          console.log(filePath); // Print file path
        }
      });
    });
  });
}

const folderPath = 'C:\\Users\\lenovo\\OneDrive\\Desktop\\Projects\\readingFilesNamesFromLocal\\node-express-realworld-example-app';
listFilesRecursive(folderPath);*/

/*function listFilesRecursive(folderPath: string) {
  fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error('Error retrieving file stats:', statErr);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`Folder: ${file}`);
          listFilesRecursive(filePath); // Recursively list files in subdirectory
        } else {
          console.log(`File: ${file}`); // Print file name
        }
      });
    });
  });
}

const folderPath = 'C:\\Users\\lenovo\\OneDrive\\Desktop\\Projects\\readingFilesNamesFromLocal\\node-express-realworld-example-app';
listFilesRecursive(folderPath);
*/



app.listen(port, () =>
  console.log(`CodeRefs listening at http://localhost:${port}`)
);
