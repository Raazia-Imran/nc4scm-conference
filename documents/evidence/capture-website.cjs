
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(process.env.TEMP, 'gcgc-handover-tools-20261124', 'node_modules/playwright'));
(async () => {
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const records=[];
for (const [name,route,selector] of [['home','/','.hero'],['speakers','/speakers','.speaker-showcase'],['call-for-papers','/call-for-papers','.conference-poster']]) {
 try {
 const response=await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle',timeout:45000});
 await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(1600);
 if(name!=='home') await page.locator(selector).scrollIntoViewIfNeeded();
 await page.waitForTimeout(900);
 await page.screenshot({quality:78,path:path.join(__dirname,name+'-desktop.jpg')});
 records.push({name,url:page.url(),httpStatus:response.status(),title:await page.title(),heading:await page.locator('h1').allTextContents(),capturedAt:new Date().toISOString()});
 } catch(e) {records.push({name,error:e.message});}
}
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle',timeout:45000});
await page.waitForTimeout(1800); await page.screenshot({quality:78,path:path.join(__dirname,'home-mobile.jpg')});
fs.writeFileSync(path.join(__dirname,'local-preview-observation.json'),JSON.stringify(records,null,2));
console.log(JSON.stringify(records,null,2)); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
