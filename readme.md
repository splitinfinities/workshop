<h1 align="center">Welcome to the API Workshop!!!</h1>
<h3 align="center">Here's what you'll need</h3>

<hr />

### node
https://nodejs.org/en/download/


### Postgres 9.5 or up

##### Mac:
http://postgresapp.com

GUI: https://eggerapps.at/postico/

##### Windows:
https://www.postgresql.org/download/windows/

GUI: https://www.bigsql.org/postgresql/installers.jsp

<hr />

#### Fork and check this repo out, or download the zip!

<h1 align="center">What we've done so far:</h1>

<hr />

`npm install express-generator --global`
`express workshop`
`npm install pg-promise —save` // this handles communication with postgres.
`npm install bluebird —save` // this will do a postgres promise.
`npm install cors —save`
`psql -f ./sql/schema.sql` // sets up the the database!
`npm install` // installs dependencies
`npm start` // starts the site at http://localhost:3000

Now, import the postman collection file in this repo - it's called Workshop.postman_collection.json. You'll have the stories prepared so you can interact with a pretty simple stories API.

Add to the .profile, .bash_profile, or .zshrc:
export PATH="/Applications/Postgres.app/Contents/Versions/9.4/bin:$PATH"
Then open a new terminal window. You should have `psql`
