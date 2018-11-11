# Devoir-VueJs-NodeJs-MongoDB-
Mehdi El Amri &amp; Ikram Koulali Idrissi
# Compte Rendu: 
L'objectif de ce TP est de consomer des services web REST avec une simple page (Html, Js, Css) qui implémente le modèle MVC client en utilisant la lib VueJs.

* On peut afficher la liste des restaurants sous forme d'un tableau dynamique avec pagination. 
* La pagination reste synchroniser avec le nombre de ligne que l'utilisateur peut changer. 
* On peut chercher un restaurant par son nom. 
* On peut modifier et supprimer un restaurant. 
* Le M du MVC peut s'initiliser avec le boutton Reset. 

Ce TP est un bon exercice pour comprendre le MVC client avec VueJS. Néanmoins, l'utilisation des comopsants donne encore plus de possibilités (Eviter la duplication du code, la réutilisation et l'abstraction)



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


