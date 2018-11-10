var express = require('express')
var fs = require('fs')
var app = express()

//Features
// * account opening
// * balance

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

readBody = (req, res, next)=>{
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    const data = JSON.parse(body)
    req.payload = data
    next()
    res.end('ok');
  });
  
}

function genAccountNumber() {
  const accountNumberLength = 10;
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var accNumber = "";
  //Loop for repetition
  for (let i = 0; i <= accountNumberLength; i++){
    const rand = Math.floor(Math.random() * possibleChars.length)
    accNumber= accNumber + possibleChars.charAt(rand)
  }
  return accNumber;
}

app.post('/accounts/new', readBody, function (req, res) {
  userInfo  = req.payload
  userInfo.accountNumber = "REALOAD" + genAccountNumber();
  userInfo.balance = 0;
  filename = 'data/accounts/' + userInfo.accountNumber
  fs.open(filename, 'w', (err, file)=>{
    fs.writeFile(file, JSON.stringify(userInfo), ()=>{
      
    })
  })
  res.send(userInfo.accountNumber);
})

app.post('/accounts/:accnumber/balance', readBody, function (req, res) {
  
})

app.listen(3000, ()=>{
  console.log("Application is listening on port 3000")
})