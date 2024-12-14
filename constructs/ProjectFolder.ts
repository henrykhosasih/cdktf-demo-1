import { file } from "@cdktf/provider-local";
import { Construct } from "constructs";

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  readonly readMeFile: file.File;

  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);
    const { projectName, projectDirectory } = props;

    const basePath = `${projectDirectory}/${projectName}`;

    this.readMeFile = new file.File(this, "readme-file", {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project`,
    });
  }
}
