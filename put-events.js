var AWS = require('aws-sdk');
var CONFIG = require('./config.json');

console.log('Loading function...');

exports.handler = function(event, context) {


  var isFailed = true;

  var eventIndex = new Object();

  var dynamodb = new AWS.DynamoDB({
    'region': CONFIG.tableOfEvents.region
  });

  event.Records.forEach(function(record) {
    console.log('processing-record:', JSON.stringify(record, null, 2));

    // Kinesis data is base64 encoded so decode here
    var payload = JSON.parse(new Buffer(record.kinesis.data, 'base64')
      .toString('ascii')
    );

    if(payload[CONFIG.tableOfIndex.hashKey.name] in eventIndex) {
      eventIndex[payload[CONFIG.tableOfIndex.hashKey.name]]
      .events.push(payload.eventID);
    }
    else {
      eventIndex[payload[CONFIG.tableOfIndex.hashKey.name]] = {
        'events': [payload.eventID]
      }
    }

    var params = new Object();
    params['TableName'] = CONFIG.tableOfEvents.name;

    params.Item = {};
    params.Item[CONFIG.tableOfEvents.hashKey.name] = {
      'S': record.eventID
    };

    for (prop in payload) {
      params.Item[prop] = {
        'S': payload[prop]
      };
    }

    console.log('putItem#params:', JSON.stringify(params, null, 2));
    dynamodb.putItem(params, function(err, data) {
      if(err) {
        console.log(err, err.stack);
      }
      else {
        console.log(data);
        isFailed = false;
      }
    });

    var paramsForIndex = new Object();
    paramsForIndex['TableName'] = CONFIG.tableOfIndex;
  });

  if(isFailed)
  {
    console.log('Function FAILed.');
    context.failed();
  }
  else
  {
    console.log('Function SUCCESS.');
    context.succeed();
  }
};
