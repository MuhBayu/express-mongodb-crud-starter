# express-mongodb-crud-starter

## Database setup
To begin using the MongoDB, you need to specify the location where MongoDB will store your databases. That location will be a normal folder.
Create any folder say “mongoData” at location easily accessible to you say on Desktop and open up terminal.

Open up terminal and run following command to start MongoDB Server at default port.

``` bash
mongod --dbpath /path/to/mongoData 
```
Now open up another terminal and run following command.
``` bash
mongo
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run watch
```