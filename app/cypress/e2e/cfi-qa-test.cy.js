describe('courses API - /GET', () => {
  const defaultNumberOfReturnedObjects = 2
  const initialPage = 1
  const baseUrl = Cypress.env('coursesUrl')
  const course = {
    "id": 312,
    "name": "5 Cs of Credit",
    "url": "5-cs-of-credit"
  }
  const course2 = {
    "id": 12,
    "name": "Assessing Drivers of Business Growth",
    "url": "of-business-growth"
  }

  it('checks default request', () => {
    cy.request(baseUrl).should((response) => {
      expect(response.status).to.eql(200, 'status code should be 200')
      expect(response.body).to.have.length(defaultNumberOfReturnedObjects, `${defaultNumberOfReturnedObjects} courses should be returned by default`)
      
      expect(response.body[0] && response.body[1]).to.have.keys('id', 'name', 'url')

      // this hardcoding is not optimal as courses in courses.json might change
      expect(response.body[0].id).to.eql(course.id)
      expect(response.body[0].name).to.eql(course.name)
      expect(response.body[0].url).to.eql(course.url)

      expect(response.body[1].id).to.eql(course2.id)
      expect(response.body[1].name).to.eql(course2.name)
      expect(response.body[1].url).to.eql(course2.url)
    })
  })

  it('checks sorting in ascending order', () => {
    cy.request(`${baseUrl}?sort=asc`)
      .its('body')
      .then((courses) => {
        expect(courses).to.have.ordered.members(courses.slice().sort((a, b) => a.id - b.id), 'courses should be sorted in ascending order');
      });
    })

  it('checks sorting in descending order', () => {
    cy.request(`${baseUrl}?sort=desc`)
      .its('body')
      .then((courses) => {
        expect(courses).to.have.ordered.members(courses.slice().sort((a, b) => b.id - a.id), 'courses should be sorted in descending order');
      });
    })

    it('checks number of courses displayed simultaneously', () => {
      const edges = [[0, defaultNumberOfReturnedObjects], [1, 1], [10, 10], [11, 10]]
      for(let i=0; i<edges.length; i++) {
        cy.request(`${baseUrl}?limit=${edges[i][0]}`).should((response) => {
          expect(response.status).to.eql(200, 'status code should be 200')
          expect(response.body).to.have.length(edges[i][1])
        })
      }
    })

  it('checks pagination', () => {
    cy.request(`${baseUrl}?limit=2&page=${initialPage}`).then((response) => {
      cy.request(`${baseUrl}?limit=1&page=${initialPage}`).then((response1) => {
        cy.request(`${baseUrl}?limit=1&page=${initialPage+1}`).should((response2) => {
            const expectedBody = response1.body.concat(response2.body)
            expect(response.body).to.eql(expectedBody);
        })
      })
    })
  })
})
