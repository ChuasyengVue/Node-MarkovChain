/** Command-line tool to generate Markov text. */
 const MarkovMachine = require('./markov');
 const fs = require('fs');
 const process = require('process');
 const axios = require('axios');

 function generateText(text){
    let mm = new MarkovMachine(text);

   
    console.log(mm);
 }


 function makeText(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error Reading File: ${path}: ${err}`);
            process.exit(1);
        }
        else{
            generateText(data);
        }
    });
 }

 async function makeTextUrl(url){
    try {
        let web = await axios.get(url);
        generateText(web.data)
    } catch (error) {
        console.error(`Error Reading Url: ${url}: ${error}`);
        process.exit(2);
        
    }
 }

 let [method, path] = process.argv.slice(2);

 if(method === 'file'){
    makeText(path);
 }

 else if(method === 'url'){
    makeTextUrl(path);
 }

 else{
    console.error(`ERROR: ${method}`);
    process.exit(1);
 }