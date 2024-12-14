import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { file, provider } from "@cdktf/provider-local";
import * as path from "path";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.LocalProvider(this, "local", {});

    const projectDirectory = path.join(
      process.env.INIT_CWD!,
      "./authors-project"
    );
    const projectName = "project-1";
    const basePath = `${projectDirectory}/${projectName}`;

    new file.File(this, "readme-file", {
      filename: `${basePath}/README.md`,
      content: `# ${projectName}\n\nThis is the ${projectName} project`,
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-demo-1");
app.synth();
