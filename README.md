# <p align ="center">✨Nodepop✨</p>

Nodepop is a really simple online shop web application. Nodepop users can buy or sell items-- either by browsing through a list of ads that can be filtered by tags, price and other features; or by creating new ads.

In order to run the app, please follow these steps:
## 👾 Download MongoDB
[Download](https://www.mongodb.com/download-center#community)

## 👾 Install Nodepop dependencies
Enter this command from folder nodepop
```shell
npm install
```
## 👾 Initialize server
1. Rename .env.EXAMPLE file to .env and check if connection configuration is locally correct

2. Initialize the database using
```shell
npm run install-db
```
3. Run this command from the appropiate folder in your MongoDB program files
```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```

## 👾 Run Nodepop
To run the application in production mode, use
```shell
npm start
```

## 👾 Run Nodepop (development)
1. To run the application in development mode, use
```shell
npm run dev
```
2. To interact with the database from command line, use
```shell
./bin/mongo
```
from the appropiate folder in your MongoDB program files.

## ⭐️ Disclaimer
This is an assignment for my [web development studies](https://www.youtube.com/watch?v=dgDLE4RfzEk), not a web app for real life purposes.

<p align ="center">&copy; Inma Ordóñez 2018</p>
