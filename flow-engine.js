const defaultLogger = {
  success: function(message) {
    console.log('\x1b[32m', message);
  },
  failure: function(message) {
    console.log('\x1b[31m', message);
  },
  info: function(message) {
    console.log('\x1b[33m', message, '\x1b[0m');
  }
};

function flow(rules, jsonData, log = defaultLogger) {
  if (!rules || rules.length === 0) {
    log.info('No rules supplied.');
    return;
  }

  const data = JSON.parse(jsonData);
  const rulesById = {};

  rules.forEach(rule => (rulesById[rule.id] = rule));

  evaluateRule(rules[0]);

  function evaluateRule(rule, previousRuleId) {
    const result = rule.execute(data);
    console.error(result);
    const nextRuleId = result ? rule.true_id : rule.false_id;

    if (previousRuleId === nextRuleId) {
      console.error(previousRuleId, nextRuleId);
      log.info('Circular flow detected. Ending here.');
      return;
    }

    if (result) {
      log.success(`Rule ${rule.id} passed`);
    } else {
      log.failure(`Rule ${rule.id} failed`);
    }

    if (nextRuleId !== null) {
      evaluateRule(rulesById[nextRuleId], rule.id);
    } else {
      log.info('End.');
    }
  }
}

module.exports = {
  flow
};
