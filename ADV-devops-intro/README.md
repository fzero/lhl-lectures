# Intro to DevOps (a.k.a. so you want to deploy your app, eh?)

The first thing you need to know is what your app needs to work:

* Static assets
  * Images
  * CSS
  * client-side Javascript
* Application server (Express, Puma etc.)
  * Serves all data-driven requests (database access)
  * External APIs
  * CORS
* Database server
  * Posrgres, MySQL, Mongo, Redis etc.
* Admin tools
  * Log storage
  * Error alerts
  * Deployment tools (git hooks, for example)

## Serving HTTP requests

Ideally the server responsible for static assets shouldn't be the same where you get the data from. This leaves the application server free to take care only of data-related requests.

Usually static data is served by a straight-up HTTP server like [Nginx](https://www.nginx.com/) or [Apache](https://httpd.apache.org/). These servers can also be configured to redirect certain domains or paths to the application server. This is known as a **reverse proxy**, which may also be responsible for **load-balancing** the requests among multiple instances of the app server.

![Load balanced HTTP example](https://fzero.github.io/lhl-lectures/assets/load-balanced-http.svg)

Large applications usually rely on external services to take care of static assets. These are called **Content Distribution Networks** (CDNs). The most commonly used ones today are [Amazon Cloudfront](https://aws.amazon.com/cloudfront/), [Cloudflare](https://www.cloudflare.com/) and [Akamai](https://www.akamai.com/).

## CORS - Cross Origin Resource Sharing

Depending on your setup, the client-side part of your app may be in a different domain from your API back-end. This situation can create problems if your server isn't properly configured to do [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) properly.

By default, browsers will **not** allow Javascript code served by one domain to fetch or post data to an API hosted somewhere else. To fix this, your back-end must **grant permission** to the domain(s) where your client-side code is hosted. You can also enable access from any domain if you wish, _but that's not recommended unless you have another way of limiting access_ (authentication for example).

If you're using [Express](http://expressjs.com) you can add the [`cors`](https://github.com/expressjs/cors) middleware package to your project. It provides a very easy way to control access to your API endpoints.

[You can also do it manually if you want.](https://enable-cors.org/server_expressjs.html) CORS is controlled by response headers after all, and that's very easy to implement [in pretty much any language](https://enable-cors.org/server.html).

## How to put everything together

There are several ways to go about hosting an application, but in general the decision is about taking time to do things from scratch or spending more to use a more convenient and automated process.

Providers like [Amazon](https://aws.amazon.com/), [Rackspace](https://www.rackspace.com/) and [DigitalOcean](https://www.digitalocean.com/) are on the "from scratch" side. Assembling your own hardware server is also a thing.

You have to install everything from the OS up and also come up with a way to deploy code to the server. There are several tools to make this easier:

* [Chef](https://www.chef.io/)
* [Puppet](https://puppet.com/)
* [Ansible](https://www.ansible.com/)
* [Docker](https://www.docker.com/)
* [Kubernettes](http://kubernetes.io/)
* Literally hundreds of others

[Heroku](http://heroku.com) and [Google App Engine](https://cloud.google.com/appengine/) are on the opposite end. The provider takes care of installing and maintaining the servers (for a fee, of course). Instead of installing software manually, there are services provided as plugins (Heroku Postgres is an example of that). Deploying code is also an automated process, usually with a simple `git push`.

It **is** possible to create a similar infrastructure yourself, but it's likely you'll need a dedicated person to put everything in place and configure all tools. Large companies like Twitter, Facebook, Tumblr and Amazon have **entire teams with hundreds of people** dedicated to infrastructure, which makes absolute sense considering their scale.

Up-and-coming applications usually start on something like Heroku, until they reach a tipping point where it's more cost-effective to hire a person to take care of the infrastructure. A recent example of this is [Genius](http://genius.com/), which moved from Heroku to their own servers a few years ago.

## Planning and scaling

More users usually mean more resources. As an app becomes popular, the server setup needs to add more application servers and databases to handle the load. It's important to have a general idea of how many requests each app server instance can handle and how many simultaneous connections the database can handle. Memory usage is also a factor - you need to know how many app instances can fit in a given machine.

Another thing to take into consideration is redundancy. Since almost all servers are virtual machines, you must be prepared to lose a few instances once in a while without having your app go offline. Reverse proxies and load balancers become even more important in this situation.
