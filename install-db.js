'use strict';
//load core module readline
const readline = require('readline');

//load env config
require('dotenv').config();

//load data
const ads = require('./data/ads.json').ads;

//load connection to database
const conn = require('./lib/db-connection');

//load ads model
const Ad = require('./models/Ad');

// load ads data in ads database
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