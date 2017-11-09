const fs = require('fs');
const path = require('path');

const exampleRules = require('./rules');
const exampleData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
const {flow} = require('./flow-engine');

flow(exampleRules, exampleData);
