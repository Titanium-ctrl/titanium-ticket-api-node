const ticketgen = require("./index")

ticketgen.genticket("http://ec2-18-185-75-4.eu-central-1.compute.amazonaws.com:3000/upload", "3h5u3b5u3bu5iulqv5iuv", undefined, "localhost", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.64").then(response => console.log(response)).catch(err => console.log(err))