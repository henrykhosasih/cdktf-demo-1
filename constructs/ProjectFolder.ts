import { file } from "@cdktf/provider-local";
import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";

interface ProjectFolderProps {
  readonly projectName: string;
  readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
  constructor(scope: Construct, id: string, props: ProjectFolderProps) {
    super(scope, id);
    const { projectName, projectDirectory } = props;

    const basePath = `${projectDirectory}/${projectName}`;

    const readMeFile = new file.File(this, "readme-file", {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project`,
    });

    new TerraformOutput(this, "readMeContent", {
      value: readMeFile.content,
    });
  }
}
