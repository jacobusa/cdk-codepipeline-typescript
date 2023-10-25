export async function handler(event: string, context: string) {
  console.log("Stage Name is: " + process.env.stageName);
  return {
    body: " Hello from lambda function",
    statusCode: 200,
  };
}
