import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inflateSync} from 'node:zlib';

test('LinkedIn PNG is valid, readable and exactly 1200x630',()=>{
 const png=readFileSync('public/share-preview.png');
 assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);
 const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
 assert.equal(width,1200);assert.equal(height,630);
 let offset=8;const chunks=[];let ended=false;
 const table=Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
 while(offset<png.length){
  const len=png.readUInt32BE(offset),name=png.toString('ascii',offset+4,offset+8);
  const part=png.subarray(offset+8,offset+8+len);
  let crc=0xffffffff;for(const value of png.subarray(offset+4,offset+8+len))crc=table[(crc^value)&255]^(crc>>>8);
  assert.equal((crc^0xffffffff)>>>0,png.readUInt32BE(offset+8+len),'CRC of '+name);
  if(name==='IDAT')chunks.push(part);
  if(name==='IEND'){ended=true;break;}
  offset+=12+len;
 }
 assert.ok(ended);assert.ok(chunks.length);
 const scanlines=inflateSync(Buffer.concat(chunks));
 assert.equal(scanlines.length,height*(1+width/8));
 for(let y=0;y<height;y++)assert.equal(scanlines[y*(1+width/8)],0,'PNG filter byte must be zero');
});

test('Share URL targets public custom domain, never pages.dev',()=>{
 const config=JSON.parse(readFileSync('config/site.json','utf8'));
 assert.equal(config.site_url,'https://folgenreich.benjamin-lam.de');
 const code=readFileSync('scripts/build.mjs','utf8');
 assert.ok(code.includes('og:image'));
 assert.ok(code.includes('share-preview.png'));
});
