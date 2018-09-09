'use strict';
//load core module readline
const readline = require('readline');

//load env config
require('dotenv').config();

//load data
const ads = require('./data/data.json').ads;
const users = require('./data/data.json').users;

//load connection to database
const conn = require('./lib/db-connection');

//load ads & users models
const Ad = require('./models/Ad');
const User = require('./models/User');

// load ads and users data in database
conn.once('open', async () => {
    try {
        //create interface and ask about deleting db contents
        const response = await askUser('Do you really want to delete database contents? (if you are not sure, type "no") ');
        if(response.toLowerCase() !== 'yes') {
            console.log('Aborted process');
            process.exit();
        }
        //load new content
        await initAds(ads);
        await initUsers(users);

        //close connection to database
        conn.close();

    } catch(err) {
        console.log(err);
        process.exit(1);
    }
});

function askUser(question) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question, function(answer) {
            rl.close();
            resolve(answer);
        });
    });
};

async function initAds(ads) {
    //delete current documents
    const deleted = await Ad.deleteMany();
    console.log(`${deleted.n} ads were deleted`);
    //load new documents
    const inserted = await Ad.insertMany(ads);
    console.log(`${inserted.length} ads were inserted`);
};

async function initUsers(users) {
    //delete current documents
    const deleted = await User.deleteMany();
    console.log(`${deleted.n} users were deleted`);
    //load new documents
    const inserted = await User.insertMany(users);
    console.log(`${inserted.length} users were inserted`);
};