import * as cdk from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
export class LambdaStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);
    new Function(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler.handler",
      code: Code.fromAsset(path.join(__dirname, "lambda")),
      environment: { stageName },
    });
  }
}
