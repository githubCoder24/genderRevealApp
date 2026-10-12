'use strict';
const http=require('node:http');const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');
const port=Number(process.env.PORT||3000),pin=process.env.HOST_PIN;
if(!pin||pin.length<8){console.error('HOST_PIN environment variable must be set to at least 8 characters.');process.exit(1)}
const dir=process.env.DATA_DIR||path.join(__dirname,'data');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'event.json');
let state={},version=0;try{const data=JSON.parse(fs.readFileSync(file,'utf8'));state=data.state||{};version=data.version||0}catch{}
function authorized(req){const a=Buffer.from(req.headers['x-host-pin']||'');const b=Buffer.from(pin);return a.length===b.length&&crypto.timingSafeEqual(a,b)}
function publicState(){const s=structuredClone(state);if(!s.finalReveal){delete s.gender;delete s.guessA;delete s.guessB;delete s.bidA;delete s.bidB;delete s.bidsLocked;}delete s.clueGuests;delete s.cluesLocked;delete s.assignA;delete s.assignB;delete s.log;delete s.mathWinners;delete s.captains;delete s.guests;return s}
function send(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(obj))}
const types={'/':'index.html','/index.html':'index.html','/game-animations.js':'game-animations.js'};
http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/api/state'){
if(req.method==='GET'){if(req.headers['x-host-pin']&&!authorized(req))return send(res,401,{error:'Incorrect host PIN'});return send(res,200,{version,authenticated:authorized(req),state:authorized(req)?state:publicState()})}
if(req.method==='PUT'){if(!authorized(req))return send(res,401,{error:'Unauthorized'});let body='';req.on('data',x=>{body+=x;if(body.length>1500000)req.destroy()});req.on('end',()=>{try{const next=JSON.parse(body);if(!next||typeof next!=='object'||Array.isArray(next))throw Error('Invalid state');state=next;version++;const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify({version,state}));fs.renameSync(temp,file);send(res,200,{version})}catch(e){send(res,400,{error:e.message})}});return}return send(res,405,{error:'Method not allowed'})}
const name=types[url.pathname];if(!name){res.writeHead(404);return res.end('Not found')}try{const data=fs.readFileSync(path.join(__dirname,name));res.writeHead(200,{'Content-Type':name.endsWith('.js')?'application/javascript; charset=utf-8':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(data)}catch{res.writeHead(500);res.end('Server error')}}).listen(port,'0.0.0.0',()=>console.log('Academy running on',port));
