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
'%':'11001 11010 00100 01011 10011 00000 00000',
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

 // Recipe card for the admin's Friday meal. Deterministic, self-contained PNG;
 // no remote image services or social-platform-specific HTML needed.

 // Familienkalender motif: a smiling pixel dinosaur and a readable calendar.
 // No external asset, font or network request; social crawlers receive one 1200x630 PNG.
 if(c.calendar_card===true) {
  const cream=[250,247,236],ink=[30,48,62],mint=[210,238,223],
   green=[57,151,112],dark=[28,100,80],orange=[247,180,66],
   paper=[255,254,249],grid=[195,205,196],white=[255,255,255];
  fillRect(0,0,W,H,cream); fillRect(0,0,542,H,mint);
  fillRect(58,57,7,43,dark);
  text('F0LG3NR31CH',85,67,4,ink);
  text('FAMILIEN-',58,134,9,ink);
  text('KALENDER',58,211,9,ink);
  function oval(cx,cy,rx,ry,color) {
   for(let dy=-ry;dy<=ry;dy++){
    const dx=rx*Math.sqrt(Math.max(0,1-(dy*dy)/(ry*ry)));
    fillRect(cx-dx,cy+dy,2*dx+1,1,color);
   }
  }
  // A friendly, slightly blocky cartoon dinosaur with tail, feet and back plates.
  for(let x=107;x<266;x++){
    const t=(x-107)/159,half=8+37*t;
    fillRect(x,421-half,1,2*half,green);
  }
  oval(278,416,136,86,green);
  fillRect(340,336,53,93,green);
  oval(390,338,92,64,green);
  oval(425,369,71,25,green);
  oval(333,481,25,43,dark);oval(240,478,25,45,dark);
  fillRect(306,509,66,16,dark);fillRect(214,512,65,15,dark);
  for(let i=0;i<5;i++){
   const x=187+i*37,y=344+(i%2)*3;
   for(let yy=0;yy<29;yy++)fillRect(x+Math.floor(yy/3),y+yy,26-Math.floor(yy/3),1,dark);
  }
  oval(411,316,15,20,white);oval(416,316,5,8,ink);
  fillRect(453,347,8,7,dark);fillRect(409,375,56,4,dark);
  // Sale sticker is a fictional visual joke, not a real checkout offer.
  fillRect(59,532,444,57,orange); fillRect(64,537,434,47,orange);
  text('100% RABATT',78,548,6,ink);
  // Right-hand paper calendar with actual ruled entries.
  fillRect(578,87,567,475,[191,205,197]);fillRect(565,75,567,475,paper);
  fillRect(565,75,567,78,dark);
  text('FREITAG',600,100,6,white);
  text('07 12',598,183,4,dark);text('FRUEHSTUECK',768,183,4,ink);
  fillRect(597,238,500,2,grid);
  text('15 05',598,255,4,dark);text('SCHULE',768,255,4,ink);
  fillRect(597,309,500,2,grid);
  text('15 45',598,329,4,dark);text('KITA',768,329,4,ink);
  fillRect(597,381,500,2,grid);
  fillRect(596,400,503,94,[235,245,229]);
  fillRect(596,400,8,94,green);
  text('RESTAURANT',626,425,6,ink);
  fillRect(597,509,502,2,grid);
  fillRect(0,596,W,34,ink);
  text('FIKTIVE KALENDERWERBUNG - ROMANFOLGE 06',39,604,3,white);
 } else if(c.recipe_card===true) {
  const wood=[198,166,124],paper=[247,239,217],ink=[55,69,43],
   olive=[113,130,82],red=[157,78,54],cream=[228,212,167];
  fillRect(0,0,W,H,wood);
  for(let y=0;y<H;y+=54)fillRect(0,y,W,2,[180,143,106]);
  for(let x=35;x<480;x+=114)fillRect(x,0,2,H,[190,154,115]);
  function oval(cx,cy,rx,ry,color){
   for(let dy=-ry;dy<=ry;dy++){
    const dx=rx*Math.sqrt(Math.max(0,1-(dy*dy)/(ry*ry)));
    fillRect(cx-dx,cy+dy,2*dx+1,1,color);
   }
  }
  // Meal-prepped bowl: golden rice, roasted aubergine, chickpeas and garnish.
  oval(275,303,228,228,[119,92,69]);
  oval(275,294,218,213,[238,224,192]);
  oval(275,294,193,186,[234,174,51]);
  for(let i=0;i<600;i++){
   const a=i*2.39996,r=182*Math.sqrt(((i*97)%601)/601);
   fillRect(275+Math.cos(a)*r,294+Math.sin(a)*r,3+(i%3),2,[245,203,86]);
  }
  for(const [x,y,rx,ry] of [[189,223,55,31],[306,241,71,37],[247,358,78,33],[351,338,53,32]]){
   oval(x,y,rx+5,ry+5,[70,57,50]);
   oval(x,y,rx,ry,[78,45,75]);
   oval(x,y,rx-11,ry-9,[142,83,54]);
   oval(x-8,y-5,rx-23,ry-18,[183,120,68]);
  }
  for(let i=0;i<38;i++){
   const a=i*2.76, r=158*Math.sqrt(((i*67)%41)/41),
    x=275+Math.cos(a)*r,y=294+Math.sin(a)*r;
   oval(x,y,7,6,i%2?[196,141,70]:[227,176,89]);
  }
  for(let i=0;i<43;i++){
   const a=i*2.47, r=159*Math.sqrt(((i*23)%47)/47);
   const col=i%3===0?[134,38,43]:i%3===1?[42,112,61]:[60,132,77];
   oval(275+Math.cos(a)*r,294+Math.sin(a)*r,5+i%3,3+i%2,col);
  }
  // Off-white recipe card, deliberately independent of the standard campaign.
  fillRect(533,39,624,555,[124,101,74]);
  fillRect(522,28,624,555,paper);
  fillRect(542,49,584,510,olive);
  fillRect(545,52,578,504,paper);
  fillRect(557,85,10,24,red);
  text('AUS DER ADMIN-KUECHE',580,83,4,ink);
  fillRect(565,134,535,3,olive);
  text('AUBERGINE.',568,173,8,ink);
  text('REIS. REST.',568,249,8,ink);
  text('ZUTATEN',568,347,4,red);
  fillRect(568,380,517,2,[180,171,139]);
  text('REIS / AUBERGINE',568,402,4,ink);
  text('KICHERERBSEN / KRAEUTER',568,439,3,ink);
  text('PISTAZIEN / GRANATAPFEL',568,470,3,ink);
  fillRect(557,508,557,35,red);
  text('REZEPT FUER EINEN FREITAG',573,516,3,paper);
  // Obvious fiction disclosure while retaining a playful food-first teaser.
  fillRect(0,577,W,53,ink);
  text('F0LG3NR31CH',38,591,4,paper);
  text('FIKTIVES REZEPT - ROMANFOLGE '+String(position).padStart(2,'0'),620,592,3,paper);
 } else {
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
 }

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
