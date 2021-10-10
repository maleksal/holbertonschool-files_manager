
# returns a 200 status {id, email}
curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "boby@dylan.com", "password": "toto1234!" }' ; echo ""

# User created in db
echo 'db.users.find()' | mongo files_manager


# Returns user already exists
curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com", "password": "toto1234!" }' ; echo ""

# Returns missing password
curl 0.0.0.0:5000/users -XPOST -H "Content-Type: application/json" -d '{ "email": "bob@dylan.com" }' ; echo ""
