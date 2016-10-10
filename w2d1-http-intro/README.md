# Introduction to HTTP

## Starting from the very beginning

### What is a protocol?
* It's a formalized way to communicate.
    - Spoken language is a communications protocol, as is body language! But we're getting philosophical here...
* In computer science, it's a set of rules defining a way for two systems to communicate in a way both can make sense of what's going on.

### The web is like a lasagna of protocols
* At the bottom layer there's **TCP** -> _Transmission Control Protocol_
* On top of it there's **IP** -> _Internet Protocol_
* And on top that we have **HTTP** -> _Hyper Text Transfer Protocol_
* There are other protocols
    - **FTP** -> _File Transfer Protocol_
    - **SMTP** -> _Simple Mail Transfer Protocol_
    - **XMPP** -> _Extensible Messaging and Presence Protocol_ (used by Slack!)
    - **SSH** -> _Secure Shell_
    - ...and hundreds of others

### Servers
- Applications that communicate over a network
- Answer to requests on a specific IP address and port
- For every IP, only **one** server can be listening on a given port
    + You **can** have multiple servers listening on different ports on the same IP
- Different protocols use different ports
    + HTTP: 80 / HTTPS: 443
    + FTP: 21
    + SMTP: 25
    + SSH: 22


## HTTP

* It's the way browsers talk to servers
* It's very simple: just some text structured in a specific way
* It's a **client-server** protocol
    - The **client** makes **requests**
    - The server returns **responses**


## HTTP Requests

### Request method
* `GET` - READ data from the server
* `POST` - SEND data and CREATE an object on the server
* `PUT/PATCH` - SEND data and UPDATE an object on the server
* `DELETE` - DELETE data on the server

Note how they map nicely to CRUD operations

### URI - Uniform Resource Indicator
* Also known as **URL - Uniform Recource Locator**
* Has several parts. In `http://www.example.com:8080/hello?name=fabio&lname=neves#greeting`
    - Protocol: `http://`
    - Host: `www.example.com`
    - Port: `:8080`
    - Path: `/hello`
    - Query parameters: `?fname=fabio&lname=neves`
    - Hash (or anchor): `#greeting`

### Headers
* Always in the form of `key: value` pairs
* Contain additional information about the client and the request, including:
    - User agent
    - Cookies

### Body
Data to be sent to the server (optional)


## HTTP Responses

### Response status
- Contains a response code and a message
- Response codes are divided in series
    + **100 series** = informational
    + **200 series** = ok
    + **300 series** = redirection
        * 301 moved permanently
        * 302 moved temporarily
    + **400 series** = client error
        * 401 unauthorized
        * 403 forbidden
        * 404 not found
    + **500 series** = server error
    + Full list: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

### Response headers
- Informations about the data being returned
    + Content size
    + Media type
        * This follows conventions. See: https://en.wikipedia.org/wiki/Media_type
        * If you're curious, here's a complete list: https://www.iana.org/assignments/media-types/media-types.xhtml
    + ETags (used for caching)
    + ...several others

### Body
* Yep, that's the content
* Usually it's HTML, but can also be pure text, JSON data, images, videos, audio...


## Testing

* Chrome developer tools is your best friend!
* Making complex requests
    - `curl` - make requests from the terminal
        + Tutorial: http://curl.haxx.se/docs/httpscripting.html
        + Documentation in FAQ format: http://curl.haxx.se/docs/faq.html
    - DHC Chrome App: https://goo.gl/aa2jaU
    - Postman: http://getpostman.com
* Checking responses
    - http://requestb.in
    - http://httpbin.org


## More stuff

Unnecessarily extensive and detailed explanation of what happens when you type `google.com` and press enter on your browser:
https://github.com/alex/what-happens-when

## Code discussed in class

Look inside the [`/code`](code) folder.
