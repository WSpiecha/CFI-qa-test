const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    coursesUrl: 'http://localhost:9303/courses'
  },
  e2e: {},
});
