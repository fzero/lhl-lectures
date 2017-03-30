# Static websites, CDNs and Amazon AWS

Static content is cool again these days, especially now that most web applications have an API-only server and a static HTML/CSS/JS user interface.

Services [Amazon S3](https://aws.amazon.com/s3/) and [Github pages](https://pages.github.com/) also make static content an attractive option. S3 only charges for bandwidth and Github pages is entirely free!

## Static website generators

Static generatores help creating static content by using the same tools available to dynamic sytes built with Express or Rails. You can create templates and layouts to avoid repetition, write text using [Markdown](https://en.wikipedia.org/wiki/Markdown), use [SASS](http://sass-lang.com/guide) for CSS, compile ES6 and so on.

The most popular generators are Ruby-based, but there are popular options in written in many languages:

* [Jekyll](http://jekyllrb.com/) - The granddaddy of all generators, written in Ruby. It's used internally by Github Pages.
* [Hexo](https://hexo.io/) - Like Jekyll, but for Node.
* [Hugo](http://gohugo.io/) - Very fast and popular, written in [Go](https://golang.org/).
* [Middleman](https://middlemanapp.com/) - Similar to Jekyll, but less blog-centric (also Ruby-based).

Usually you don't really need to do much programming besides HTML, CSS and maybe some client-side JS to create a static blog. Middleman is slightly more geared towards creating web app UIs. It integrates Webpack in the mix, so it's relatively easy to use it to create marketing pages while the app itself is in React, for example.

## Static content hosting - Content Distribution Networks (CDN)

Ideally the server responsible for static assets shouldn't be the same where you get the data from. This leaves the application server free to take care only of data-related requests. Your Javascript code, CSS and images won't change after they reach the browser anyway, so why use Express to do that when you can use a specialized tool for that?

The most popular CDN out there is definitely [Amazon Cloudfront](https://aws.amazon.com/cloudfront/), which serves files hosted on [Amazon S3](https://aws.amazon.com/s3/). You can also use S3 directly to serve content and entire websites.

Tools of note:
* [Cyberduck](https://cyberduck.io/)
* [s3cmd](http://s3tools.org/s3cmd) (command-line - install with `apt-get` or `brew`)

There are other CDNs and distributed caching networks out there, such as [Cloudflare](https://www.cloudflare.com/) and [Akamai](https://www.akamai.com/). The difference is they're not backed by a monstrous file storage system like S3.

## Amazon Web Services and PaaS in general - rent-a-server by the hour

AWS has so many services that it's easier if you [go and take a look yourself](https://aws.amazon.com/). The list grows every other week, but the core idea is: you can use as many servers and services as you want, for as long as you want, and you can simply shut them down whenever you don't need them.

[Google Cloud](https://cloud.google.com/) offers something very similar at slightly better prices, but for some reason it didn't catch on as much (things can change though).

## Resources

* [How to reploy a React app to S3 and Cloudfront](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)
* [Build a blog with Jekyll and Github pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)
