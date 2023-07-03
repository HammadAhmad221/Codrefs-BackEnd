export interface IAddProjectRequest {
  name: string;
  repositoryURL: string;
  accessToken: string;
  gitUsername: string;
  branch: string;
  versionControl: number;
  repositoryName: string;
}
