/**
* @file Node.js function boilerplate for Amazon Web Services Lambda.
* @author Victor Springer <victorspringer@gmail.com>
*/
const http = require('http');

/**
* @method
* @description The main method that will be fired.
* @param event - The JSON input with properties to be handled.
* @param context - The method's context.
* @param callback - The method's callback.
*/
exports.handler = (event, context, callback) => {
    console.log(`starting ${event.name} job`);
    http.get(event.url, (response) => {
        console.log(`got response: ${response.statusCode}`);
        if(response.statusCode >= 400) {
            console.log(`${event.name} job failed`);
            context.fail();
            callback(new Error(`bad response from ${event.url}`));
            return;
        }
        console.log(`${event.name} job finished successfully`);
        context.succeed();
        callback(null, `${event.name} job finished successfully`);
    })
    .on('error', (err) => {
        console.log(err.message);
        context.fail();
    });
}