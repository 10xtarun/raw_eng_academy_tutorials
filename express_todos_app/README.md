1. server created and run on port 3000
2. GET /greetings call --> "Hello World" of servers
3. GET /todos call --> 
    * readData --> readFile --> data (string) --> Array Object (JSON.parse)
    * response object --> "message", "data" and "error"
4. POST /todos call --> 
    * middleware --> to get body from request object --> "express.json()" --> newTodo
    * readData --> to get older data (for persistency)
    * newTodo --> Pushed to array object --> "older + newer = final data"
    * fs.writeFile --> "final data" --> stringify(array object) --> stored
5. Utils
    * import neccessary files/modules
    * readData --> "file-path" --> read -> data (string) -> JSON.parse(data) -> Array Object
    * module.exports = { ...object } --> readData

# EJS

basic syntax - <% some code %>
variable & value - <%= varName %>
string in syntax - <% "some value" %>
import syntax - <%- include("path/to/file") %>