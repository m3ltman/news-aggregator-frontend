module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    "no-underscore-dangle":  ["error", { "allow": ["_id"], "enforceInMethodNames": false, "allowAfterThis": true }],
  },
  "env": {
    "browser": true,
    "node": true
  }
};
