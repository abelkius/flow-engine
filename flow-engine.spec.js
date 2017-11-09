const test = require('tape');
const {flow} = require('./flow-engine');

test('Empty ruleset test', function(t) {
  flow([], '{}', {
    info: msg => t.equal(msg, 'No rules supplied.')
  });

  t.end();
});

test('Circular ruleset test', function(t) {
  flow(
    [
      {
        id: 1,
        true_id: 2,
        execute: param => !param
      },
      {
        id: 2,
        true_id: 1,
        execute: param => !!param
      }
    ],
    '{}',
    {
      info: msg => t.equal(msg, 'Circular flow detected. Ending here.')
    }
  );

  t.end();
});

test('Passing ruleset test', function(t) {
  let i = 0;
  flow(
    [
      {
        id: 1,
        true_id: 2,
        execute: param => !!param
      },
      {
        id: 2,
        true_id: null,
        execute: param => !!param
      }
    ],
    '{}',
    {
      success: msg => {
        if (i === 0) {
          t.equal(msg, 'Rule 1 passed');
        } else if (i === 1) {
          t.equal(msg, 'Rule 2 passed');
        }
        i += 1;
      },
      info: msg => t.equal(msg, 'End.')
    }
  );

  t.end();
});

test('Failing ruleset test', function(t) {
  flow(
    [
      {
        id: 1,
        true_id: 2,
        false_id: null,
        execute: param => !param
      }
    ],
    '{}',
    {
      failure: msg => t.equal(msg, 'Rule 1 failed'),
      info: msg => t.equal(msg, 'End.')
    }
  );

  t.end();
});

test('Data evaluation test', function(t) {
  let i = 0;
  flow(
    [
      {
        id: 1,
        true_id: null,
        false_id: 2,
        execute: param => param.color === 'lila'
      },
      {
        id: 2,
        true_id: null,
        false_id: 3,
        execute: param => param.color === 'pink'
      },
      {
        id: 3,
        true_id: null,
        false_id: 1,
        execute: param => param.color !== 'yellow'
      }
    ],
    '{"color": "pink"}',
    {
      failure: msg => t.equal(msg, 'Rule 1 failed'),
      success: msg => {
        if (i === 0) {
          t.equal(msg, 'Rule 2 passed');
        } else if (i === 1) {
          t.equal(msg, 'Rule 3 passed');
        }
      },
      info: msg => t.equal(msg, 'End.')
    }
  );

  t.end();
});
