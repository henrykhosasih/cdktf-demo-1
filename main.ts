import { provider } from "@cdktf/provider-local";
import { App, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import * as path from "path";
import { ProjectFolder } from "./constructs/ProjectFolder";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.LocalProvider(this, "local", {});

    const projectDirectory = path.join(
      process.env.INIT_CWD!,
      "./authors-project"
    );
    const projectName = "project-1";

    new ProjectFolder(this, "project-folder", {
      projectName,
      projectDirectory,
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-demo-1");
app.synth();
