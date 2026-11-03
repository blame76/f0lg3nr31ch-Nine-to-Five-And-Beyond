import {deflateSync} from 'node:zlib';

const W=1200,H=630;
const FONT={
A:'01110 10001 10001 11111 10001 10001 10001',
B:'11110 10001 10001 11110 10001 10001 11110',
C:'01111 10000 10000 10000 10000 10000 01111',
D:'11110 10001 10001 10001 10001 10001 11110',
E:'11111 10000 10000 11110 10000 10000 11111',
F:'11111 10000 10000 11110 10000 10000 10000',
G:'01111 10000 10000 10111 10001 10001 01111',
H:'10001 10001 10001 11111 10001 10001 10001',
I:'11111 00100 00100 00100 00100 00100 11111',
J:'00111 00010 00010 00010 10010 10010 01100',
K:'10001 10010 10100 11000 10100 10010 10001',
L:'10000 10000 10000 10000 10000 10000 11111',
M:'10001 11011 10101 10101 10001 10001 10001',
N:'10001 11001 10101 10011 10001 10001 10001',
O:'01110 10001 10001 10001 10001 10001 01110',
P:'11110 10001 10001 11110 10000 10000 10000',
Q:'01110 10001 10001 10001 10101 10010 01101',
R:'11110 10001 10001 11110 10100 10010 10001',
S:'01111 10000 10000 01110 00001 00001 11110',
T:'11111 00100 00100 00100 00100 00100 00100',
U:'10001 10001 10001 10001 10001 10001 01110',
V:'10001 10001 10001 10001 10001 01010 00100',
W:'10001 10001 10001 10101 10101 10101 01010',
X:'10001 10001 01010 00100 01010 10001 10001',
Y:'10001 10001 01010 00100 00100 00100 00100',
Z:'11111 00001 00010 00100 01000 10000 11111',
0:'01110 10001 10011 10101 11001 10001 01110',
1:'00100 01100 00100 00100 00100 00100 01110',
2:'01110 10001 00001 00010 00100 01000 11111',
3:'11110 00001 00001 00110 00001 00001 11110',
4:'00010 00110 01010 10010 11111 00010 00010',
5:'11111 10000 11110 00001 00001 10001 01110',
6:'00110 01000 10000 11110 10001 10001 01110',
7:'11111 00001 00010 00100 01000 01000 01000',
8:'01110 10001 10001 01110 10001 10001 01110',
9:'01110 10001 10001 01111 00001 00010 01100',
'.':'00000 00000 00000 00000 00000 01100 01100',
'-':'00000 00000 00000 11111 00000 00000 00000',
'/':'00001 00001 00010 00100 01000 10000 10000',
'&':'01100 10010 10100 01000 10101 10010 01101',
' ':'00000 00000 00000 00000 00000 00000 00000'
};
const PALETTES=[
 {bg:[19,34,49],fg:[246,248,244],muted:[194,207,215]},
 {bg:[20,52,52],fg:[248,249,246],muted:[199,220,213]},
 {bg:[56,43,37],fg:[249,247,238],muted:[224,213,197]}
];
const crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let n=0;n<8;n++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
function crc(bytes){let c=0xffffffff;for(const v of bytes)c=crcTable[(c^v)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function chunk(type,bytes){const tag=Buffer.from(type,'ascii'),size=Buffer.alloc(4),check=Buffer.alloc(4);size.writeUInt32BE(bytes.length);check.writeUInt32BE(crc(Buffer.concat([tag,bytes])));return Buffer.concat([size,tag,bytes,check]);}
function rgb(hex){return [1,3,5].map(x=>parseInt(hex.slice(x,x+2),16));}

export function renderCampaignImage(chapter){
 const {campaign:c,position}=chapter;
 const {bg,fg,muted}=PALETTES[(position-1)%PALETTES.length];
 const accent=rgb(c.accent),data=Buffer.alloc(W*H*3);
 function fillRect(x,y,w,h,color){
  for(let yy=Math.max(0,Math.floor(y));yy<Math.min(H,Math.floor(y+h));yy++)
   for(let xx=Math.max(0,Math.floor(x));xx<Math.min(W,Math.floor(x+w));xx++){
    const at=(yy*W+xx)*3;data[at]=color[0];data[at+1]=color[1];data[at+2]=color[2];
   }
 }
 for(let y=0;y<H;y++){
  const dim=Math.floor(y/H*10);
  fillRect(0,y,W,1,bg.map(c=>Math.min(255,c+dim)));
 }
 const letters=str=>str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'SS');
 function text(line,x,y,requested,color){
  const value=letters(line);
  const scale=Math.min(requested,Math.floor(1040/(Math.max(1,value.length)*6)));
  if(scale<1)throw new Error('Image text too wide: '+value);
  for(let n=0;n<value.length;n++){
   const glyph=(FONT[value[n]]||FONT[' ']).split(' ');
   for(let gy=0;gy<7;gy++)for(let gx=0;gx<5;gx++)
    if(glyph[gy][gx]==='1')fillRect(x+(n*6+gx)*scale,y+gy*scale,scale,scale,color);
  }
 }
 // Design is deterministic: a brand strip, campaign message, and conspicuous fiction disclosure.
 fillRect(72,54,12,72,accent);
 text('f0lg3nr31ch',110,63,8,fg);
 text('NINE TO FIVE. AND BEYOND.',110,127,3,muted);
 const category=c.category.split('·')[0].trim();
 text(category,72,179,4,accent);
 for(let i=0;i<c.image_lines.length;i++)text(c.image_lines[i],72,237+i*95,13,fg);
 fillRect(72,440,1060,2,accent);
 for(let i=0;i<c.image_detail.length;i++)text(c.image_detail[i],72,472+i*39,5,muted);
 fillRect(72,579,1056,1,muted);
 text('FIKTIVE AGENTURKAMPAGNE - ROMANFOLGE '+String(position).padStart(2,'0'),72,594,3,accent);
 const stride=W*3,raw=Buffer.alloc((stride+1)*H);
 for(let y=0;y<H;y++)data.copy(raw,y*(stride+1)+1,y*stride,(y+1)*stride);
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(W,0);ihdr.writeUInt32BE(H,4);ihdr[8]=8;ihdr[9]=2;
 return Buffer.concat([
  Buffer.from([137,80,78,71,13,10,26,10]),
  chunk('IHDR',ihdr),
  chunk('IDAT',deflateSync(raw,{level:9})),
  chunk('IEND',Buffer.alloc(0))
 ]);
}
