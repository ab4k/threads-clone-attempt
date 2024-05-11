## For Backend Test
* Fork this repo to your repo

### Install all dependencies
```console
npm install
```

### Start the server
```console
npm start
```
### Starting the mongoDB server
* [mongoDB atlas](https://account.mongodb.com/account/login?nds=true) 👈 login here
* Open mongoDB atlas after logging in, create a collection with any name you want (threads recommended for obvious reasons).
* Go to Deployment > Database
    * Click on connect
    * Select any option asked in next prompt, but it is recommended to use [mongoDBCompass](https://www.mongodb.com/try/download/shell)
      * For using mongoDBCompass select the Compass option
      * Install the compass from given link or google it
      * Select I have mongoDBCompass installed option
    * Copy the connection string, it looks something like the one below
      
      ```console
      mongodb+srv://your_username:<your_password>@cluster0.thiaws1.mongodb.net/
      ```
    * Click on Done.
* Go and create a .env file and to .env file add the following
```console
PORT=<any_port_of_your_wish>
MONGODB_URI=mongodb+srv://your_username:<your_password>@cluster0.thiaws1.mongodb.net/
TOKEN_SECRET=<any_random_string>
TOKEN_EXPIRY=10d
```
_*Note : - Donot forget to replace your_username and your_password with your original username and password. Also set the port and token related stuff*_

## For API testing open postman workspace and login
* [Postman Workspace](https://threads-project.postman.co/)
* Open threads-backend-testing workspace and start testing

### Your Tools are ready, now do the testing. Good Luck ✌
