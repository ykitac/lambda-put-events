var event = {
  "Records": [
    {
      "eventID": "shardId-000000000000:49545115243490985018280067714973144582180062593244200961",
      "eventVersion": "1.0",
      "kinesis": {
        "partitionKey": "partitionKey-3",
        "data": "eyJpZCI6IjAwMSIsImZvbyI6ImJhciIsInRpbWUiOiIyMDE1LTA5LTA5VDA3OjEwOjE4WiIsInRhZyI6ImRlYnVnLmtpbmVzaXMifQ==",
        "kinesisSchemaVersion": "1.0",
        "sequenceNumber": "49545115243490985018280067714973144582180062593244200961"
      },
      "invokeIdentityArn": "arn:aws:iam::EXAMPLE",
      "eventName": "aws:kinesis:record",
      "eventSourceARN": "arn:aws:kinesis:EXAMPLE",
      "eventSource": "aws:kinesis",
      "awsRegion": "ap-northeast-1"
    }
  ]
};

var context = {
    invokeid: 'invokeid',
    succeed: function(err,message) {
      return;
    },
    failed: function(err,msg) {
      return;
    }
};

var lambda = require("../put-events.js");
lambda.handler(event,context);
