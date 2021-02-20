# titanium-ticket-api-node

## THIS PACKAGE IS IN NEED OF UPDATING BASED ON THE NEW SUPREME BP
# This is no longer maintained - the code is here for me (and you probably) to view the code and possibly learn off it 🤷‍♂️

# Intro
This npm package allows easy integration of the Titanium Robotics Ticket API into your Nodejs program. You will be provided an API URL and API Key upon purchase. 


# Installation
```npm install titanium-ticket-api-node```

# Usage

## Formatting
All parameters of the genticket function should either be a string or undefined.
Your proxy should be in the format: "http://username:password@ipAddress:port" or "http://ipAddress:port"

## Before ATC

To generate a cookie that'll be used before atc, all you need to do is
```javascript
const ticketgen = require("titanium-ticket-api-node")

ticketgen.genticket(apiurl, apikey, proxy, undefined, useragent).then(response => {/* Your code afterwards here */}).catch(err => console.log(err))
```
The response string will look like this
```_tlcket=2bf789849f1413a8f0556d52c4038567f9bacc62291d02e96c05bf24c732315a9230a4f748c394c14046165fd320701074155ebe653638ea4963fd2ccadb85551595846480;path=/```

## After ATC

The command, is similar to the above, however the undefined variable will be the server side generated ticket.
```javascript
const ticketgen = require("titanium-ticket-api-node")

ticketgen.genticket(apiurl, apikey, proxy, ticket, useragent).then(response => {/* Your code afterwards here */}).catch(err => console.log(err))
```

# Errors
Any errors returned from the API will be handled as a rejected promise by the module, for example if your API key is invalid or expired/out of uses.
