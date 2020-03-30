var http = require("http");
var fs = require("fs");
const { parse } = require("querystring");

http
  .createServer(function(req, res) {
    if (req.method === "POST") {
      collectRequestInfo(req, result => {
        const user_input = result.message;
        fs.appendFile("message.txt", user_input, function(err) {
          if (err) throw err;
          console.log("saved");
        });
        res.end();
      });
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<form action='/message' method='POST'>
                <input name="message" placeholder="Enter message" /><br>
                <button type="submit">Send</button>
                </form>
                `);
    res.end();
  })
  .listen(8080);

function collectRequestInfo(request, callback) {
  let reqBody = "";
  request.on("data", chunk => {
    reqBody += chunk.toString();
  });
  request.on("end", () => {
    callback(parse(reqBody));
  });
}
