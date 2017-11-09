module.exports = [
  {
    id: 1,
    false_id: 3,
    true_id: 2,
    execute: function(param) {
      return param && param.color === 'blue';
    }
  },
  {
    id: 2,
    false_id: 4,
    true_id: null,
    execute: function(param) {
      return param && param.color === 'red';
    }
  },
  {
    id: 3,
    false_id: null,
    true_id: 4,
    execute: function(param) {
      return param && param.color === 'red';
    }
  },
  {
    id: 4,
    false_id: 2,
    true_id: null,
    execute: function(param) {
      return !!param;
    }
  }
];
