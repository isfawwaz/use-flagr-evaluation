const path = require('path');

const eslint = require('eslint');

const cli = new eslint.ESLint({
  useEslintrc: true,
});

const report = cli.lintFiles(['packages/*/test/**/*.{js,jsx,ts,tsx,vue}']);

report.then((results) => {
  results.forEach((object) => {
    const filePath = object.filePath;
    const relativeFilePath = path.relative(__dirname, filePath).replace(/\\/g, '/');

    it(`should pass on ${relativeFilePath}`, () => {
      const result = object.messages
        .map((message) => ({
          rule: message.ruleId,
          severity: message.severity,
          line: message.line,
          column: message.column,
        }))
        .sort(
          (warn1, warn2) =>
            warn1.line - warn2.line ||
            warn1.column - warn2.column ||
            warn1.rule.localeCompare(warn2.rule),
        );

      expect(result).toMatchSnapshot();
    });
  });
});