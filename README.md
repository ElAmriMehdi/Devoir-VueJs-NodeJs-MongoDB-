# Devoir-VueJs-NodeJs-MongoDB-
Mehdi El Amri &amp; Ikram Koulali Idrissi

## Prerequis:  
* NodeJs
* MongoDB

## steps to start the app: 
First import data to MongoDB: 
```
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```
Now Start the MongoDB server: 
```
mongod
```
Go to /serveur and install required packages: 
```
node npm insall
```
Launch the server
```
node serverCrudWithMongo.js
```
Now deploy the client in your fav web server. I use Web Server for Chrome. Go to: 
```
http://localhost:yourPort
```



