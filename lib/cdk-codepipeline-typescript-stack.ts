import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { PipelineAppStage } from "./stage";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkCodepipelineTypescriptStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "TestPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "jacobusa/cdk-codepipeline-typescript",
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const testingStage = pipeline.addStage(
      new PipelineAppStage(this, "test", {
        env: { account: "176709227108", region: "us-east-1" },
      })
    );

    testingStage.addPost(
      new ManualApprovalStep("Manual approval before production")
    );

    const productionStage = pipeline.addStage(
      new PipelineAppStage(this, "prod", {
        env: { account: "176709227108", region: "us-east-1" },
      })
    );
  }
}
