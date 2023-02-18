Tests are created using cypress and javascript.

First run container with json api server.

Install and open cypress:

npm install cypress
npm test = npx cypress open

In cypress select browser and 'cfi-qa-test.cy.js' test file.

-------------------------------------------------

Created testcases:
- 'checks default request': check 200 status code, default returned objects = 2, structure of courses (id, name, url), values of expected courses
- 'checks sorting in ascending order' and 'checks sorting in descending order': check sorting in ascending/descending order works
- 'checks number of courses displayed simultaneously': check boundary values work correctly, check successful status code
- 'checks pagination': check pagination, X objects from page 1 should be the same as X1+X2+...+Xn from 1->n pages

-------------------------------------------------

As endpoint is buggy and not all necessary info is given, tests are created based on following assumptions:

- if limit < 1 display default number of results (2)
- if limit > 10 display 10 results
- as no /post endpoint exist, we assume courses are already created. Tests use courses in courses.json file. Some of which are hard coded into testcases. That is far from optimal but again, no endpoint to post custom courses per testcase/test suite.

Testcases fail for following reasons:
- 'checks default request' => testcase assumes its on first page, on which it should be (it is on page 1) but in fact first page is page 0 (this is not congruent with endpoint description)
- 'check sorting in ascending order' and 'check sorting in descending order' => sorting is actually done the other way around. Endpoint returns asc as desc and vice versa
- 'checks number of courses displayed simultaneously' => when limit = 0, empty list is displayed while min value for limit should be 1. If that was fixed/allowed test will fail as more than 10 objects can be displayed and that also should not be allowed
- 'checks pagination' => it does not pass because pages do not start from 1 but zero (you can set initialPage to 0 to see test behaviour if pages started from indicated number)
