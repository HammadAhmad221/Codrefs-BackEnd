import { Project } from "../entities/project";
import { DatabaseService } from "../common/services/database.service";
import { Inject } from "typescript-ioc";
import { Types } from "mongoose";

export class ProjectRepository {
  constructor(@Inject private databaseService: DatabaseService) {}

  addProject(
    name: string,
    repositoryURL: string,
    accessToken: string,
    gitusername: string,
    branch: string,
    author: string,
    versionControl: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let projectModel = {
        name: name,
        versionControl: versionControl,
        repositoryURL: repositoryURL,
        accessToken: accessToken,
        author: new Types.ObjectId(author),
        gitUsername: gitusername,
        branch: branch,
        created: new Date(),
        updated: new Date(),
      };
      let project = new Project({ ...projectModel });

      try {
        let createdProject = await this.databaseService.createProject(project);
        resolve(createdProject);
      } catch (error) {
        console.log("Create model error:", error);
        if (error) {
          reject("Could not create Project");
        }
      }
    });
  }

  deleteProjectById(id: string): Promise<void> {
    return this.databaseService.deleteProjectById(id);
  }

  async getProjectsByAuthor(author: Types.ObjectId): Promise<any> {
    try {
      const projects = await this.databaseService.getProjectsByAuthor(author);
      return projects;
    } catch (error) {
      throw error;
    }
  }
}
