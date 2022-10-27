/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

//Access tableName from nodejs
const tableName = process.env.USERTABLE;

exports.handler = async (event, context) => {
  //event event.request.userAttributes.sub(sub, email, )
  //sub is cognito unique username for each user --> use it for dynamodb key id
  // insert code to be executed by your lambda trigger
  if (!event?.request?.userAttributes?.sub) {
    console.log("No sub provided");
    return;
  }

  const now = new Date();
  const timestamp = now.getTime();

  const userItem = {
    __typename: { S: "User" },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.name },
    email: { S: event.request.userAttributes.email },
    imageUri: {
      S: "3003035.png",
    },
  };
  const params = {
    Item: userItem,
    TableName: tableName,
  };

  //save a user to dynamodb
  try {
    await ddb.putItem(params).promise();
    console.log("success");
  } catch (e) {
    console.log(e);
  }
};
