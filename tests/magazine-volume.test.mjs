import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html=readFileSync(new URL('../public/magazin/white-trash-whitepapers/2026-12/index.html',import.meta.url),'utf8');
function model(){
 const script=html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)[1];
 const nodes=new Map();
 const node=id=>{
   if(!nodes.has(id)) nodes.set(id,{value:'',textContent:'',listeners:{},addEventListener(event,fn){this.listeners[event]=fn;}});
   return nodes.get(id);
 };
 node('saving').value='30'; node('discount').value='0'; node('volume').value='0';
 const controls={hidden:true};
 vm.runInNewContext(script,{document:{getElementById:node,querySelector:selector=>selector==='.model-tool .controls'?controls:null},window:{matchMedia:()=>({matches:false})}});
 const set=(id,value)=>{node(id).value=String(value);node(id).listeners.input();};
 const read=id=>node(id).textContent;
 return {set,read,controls,reset:()=>node('model-reset').listeners.click()};
}
test('Magazin: Ausgangsannahmen und drei Regler',()=>{
 const m=model();assert.equal(m.controls.hidden,false);
 assert.equal((html.match(/type="range"/g)||[]).length,3);
 assert.equal(m.read('hourly-revenue'),'70.000 €');
 assert.equal(m.read('fixed-revenue'),'100.000 €');
 assert.equal(m.read('extra-work'),'+42,9 %');
 assert.equal(m.read('free-hours'),'300 Std.');
});
test('Magazin: zusätzlicher bezahlter Absatz und Festpreisnachlass',()=>{
 const m=model();m.set('volume',50);
 assert.equal(m.read('hourly-hours'),'1.050');
 assert.equal(m.read('hourly-revenue'),'105.000 €');
 assert.equal(m.read('hourly-change'),'+5 %');
 assert.equal(m.read('fixed-revenue'),'150.000 €');
 assert.equal(m.read('free-hours'),'50 Std.');
 assert.match(m.read('capacity-label'),/^mehr /);
 m.set('discount',20);
 assert.equal(m.read('fixed-revenue'),'120.000 €');
 assert.equal(m.read('fixed-change'),'+20 %');
 m.reset();assert.equal(m.read('volume-value'),'0 %');assert.equal(m.read('hourly-revenue'),'70.000 €');
});
test('Magazin: Grenzwerte und unveränderter Stundenbedarf',()=>{
 const m=model();m.set('saving',50);m.set('volume',100);
 assert.equal(m.read('hourly-hours'),'1.000');
 assert.equal(m.read('hourly-change'),'0 %');
 assert.match(m.read('capacity-label'),/^Veränderung/);
 m.set('saving',80);
 assert.equal(m.read('hourly-hours'),'400');assert.equal(m.read('extra-work'),'+400 %');
 m.set('saving',0);assert.equal(m.read('extra-work'),'0 %');
});
