import AWS from 'aws-sdk';

// const credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
// AWS.config.credentials = credentials;

AWS.config.update({region: 'us-east-1'});

export async function call(action, params) {
  
  if (action === 'get' && !params.Key) {
    action = 'scan';
  }

  let dynamoDb;

  if (process.env === 'PRODUCTION') {

    dynamoDb = new AWS.DynamoDB.DocumentClient();

  } else {

    const lowLevelDynamo = new AWS.DynamoDB({ 
      endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    dynamoDb = new AWS.DynamoDB.DocumentClient(lowLevelDynamo);
  }
  
  let payload = {};
  try {
    
    const result = await dynamoDb[action](params).promise();
    payload = (result.Items) 
      ? result.Items
      : result.Item;
    return payload;

  } catch (e) {
    
    console.log(e.message);
    return e;
  } 
  // return await dynamoDb[action](params).promise();
}

/**
 * Simple object.
 * Merely returns a sanitized db query paramters 
 * object formatted for DDB
 */
export class Params {

  constructor({ table, keys, item }) {

    const errMsg = 'Misformatted dynamodb params. Expected {table, keys[, item]} received {' 
    + table 
    + ', ' 
    + keys
    + ', ' 
    + item
    + '}:';

    if (!table) { throw new Error(errMsg); }
    try {
      this.TableName = table;
      if (keys) { this.Key = keys; }
      if (item) { this.Item = item; }
    } catch (e) {
      throw new Error(errMsg+e);
    }
  }
}
