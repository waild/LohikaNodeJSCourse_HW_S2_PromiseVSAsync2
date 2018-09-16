
var { getContributors } = require('./lib/contributorsReceiver.js');
var { getContributorsAsync } = require('./lib/contributorsReceiverAsync.js');

getContributors("nodejs")
    .then(console.dir)
    .catch(console.error);

getContributorsAsync('nodejs')
    .then(console.dir)
    .catch(console.error);
