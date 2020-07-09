const fs = require('fs');
const http = require('http');

/******
 * FILES
 */
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written!');

// Non-blocking, asynchronous way
// fs.readFile(<file>, callback)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('shit....');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {    
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{ 
//                 console.log('The final.txt has been processed :)')
//             })
//         });
//     });
// });
// console.log('Will read file!');


/******
 * SERVER
 */

// Top level code only excuted once
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%id%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); 
const dataObj = JSON.parse(data);

// callbacks excuted over and over again
const server = http.createServer((req, res) => {
    const pathName = req.url;
    


    // Overview Page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, { 'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    // Product Page
    } else if(pathName === '/product'){
        res.end('This is the PRODUCT');





    // API
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            res.writeHead(200, { 'Content-type': 'application/json'});
            res.end(data);
        })

    // NOT FOUND
    } else {
        res.writeHead(404, {
	        'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('Page not found!')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('The server is listening to requests on port 8000');
});
