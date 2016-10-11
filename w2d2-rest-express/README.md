## REST

It's all about mapping the data you have available in a sensible way. Once you do it, you can do CRUD operations (**C**reate, **R**ead, **U**pdate, **D**elete) over HTTP.

REST is everywhere, to the point that when you see it, you cannot un-see it. If you look closely, even the CBC website is organized in a restful way:

- [cbc.ca/sports](http://cbc.ca/sports) will list all sports news
    - [cbc.ca/sports/hockey](http://www.cbc.ca/sports/hockey) will list all hockey news
        - [cbc.ca/sports/hockey](http://www.cbc.ca/sports/hockey/nhl) will list all NHL news
            - From then on, every news item has a unique id: [cbc.ca/sports/hockey/nhl/sweden-world-cup-defence-hedman-1.3758355](http://www.cbc.ca/sports/hockey/nhl/sweden-world-cup-defence-hedman-1.3758355)

Those are all GET requests, so we're returning data (news articles in this case).

A data model plus the HTTP mapping is called a _resource_. Usually the URLs in a RESTful API follow this pattern:

* `/nouns` - All items in a collection
* `/nouns/:id` - A single item in a collection

These URL patterns can be chained together to demonstrate associated data:

* `/nouns/:id/associatedNouns` = `/nouns/:id` + `/nouns` (Ex: `/posts/12/comments`)

The HTTP verbs map nicely to CRUD actions, as seen below (using the Donut example):

* data model: Donut
    - CREATE
        + **POST /donuts** -> creates a new donut
    - READ
        + **GET /donuts** -> list all donuts (index)
        + **GET /donuts/:id** -> get a specific donut, in this case with id = :id (show)
    - UPDATE
        + **PUT/PATCH /donuts/:id** -> update a donut with id = :id
    - DELETE
        + **DELETE /donuts/:id** -> Deletes a donut with id = :id

If you don't like CRUD, you can also use BREAD:

* B - Browse `/donuts`
* R - Read `/donuts/:id` (Ex: `/donuts/12`)
* E - Edit `/donuts/:id/edit` (Ex: `/donuts/12/edit`)
* A - Add `/donuts/new`
* D - Delete `/donuts/:id/delete` (Ex: `/donuts/12/delete`)

### RESTful API examples

* [Uber rides API](https://developer.uber.com/docs/rides/)
* [Github API](https://developer.github.com/v3/)
* [Twitter API](https://dev.twitter.com/rest/public)

## Express

Coming soon...
