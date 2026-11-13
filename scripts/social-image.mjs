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
 // Self-contained fictional bakery and chocolate-cake visuals, generated as PNG.
 if(c.bingo_card===true) {
  // Deterministic author-approved social teaser. Built in the Reader; no additional AI image asset.
  const navy=[23,39,54], cream=[255,248,236], ink=[27,48,62],
    gold=[255,183,108], orange=[235,109,65], paper=[249,241,226], line=[58,80,95];
  fillRect(0,0,W,H,navy);
  fillRect(0,0,W,19,orange);
  fillRect(40,29,12,38,gold);
  text('F0LG3NR31CH',68,38,5,cream);
  text('BUZZWORD BINGO',51,98,6,gold);
  const cells=[
   ['NEXT','GEN'],['AI','PROMPTING'],['AGENTIC','WORKFLOW'],['TECH','DEBT'],['VALUE','STREAM'],
   ['RUBBER','DUCK'],['ZERO','FRICTION'],['CLOUD','SYNERGY'],['HIGH','IMPACT'],['YAK','SHAVING'],
   ['PROMPT','MASTER'],['LOW','HANGING'],['FREIFELD','BINGO'],['SKILLSET','LEVEL'],['HEISEN','BUG'],
   ['HUMAN','IN LOOP'],['DEEP','DIVE'],['BIG','PICTURE'],['END TO','END'],['META','VERSE'],
   ['DIGITAL','NATIVE'],['QUICK','WIN'],['AI','GOVERNANCE'],['PROD','DEPLOY'],['ANALOG','VETERAN']
  ];
  for(let i=0;i<25;i++){
   const col=i%5,row=Math.floor(i/5),x=50+col*115,y=160+row*80;
   fillRect(x,y,115,80,line);
   fillRect(x+2,y+2,111,76,i===12?gold:paper);
   const lines=cells[i];
   for(let j=0;j<lines.length;j++)
    text(lines[j],x+7,y+17+j*24,2,ink);
   if([1,7,19,23].includes(i)){
    // Crossed-out fields deliberately resemble a partly played Bingo card.
    for(let k=0;k<43;k++){
      fillRect(x+33+k,y+17+k,3,3,orange);
      fillRect(x+77-k,y+17+k,3,3,orange);
    }
   }
  }
  fillRect(683,156,8,382,orange);
  text('DIE FEHLENDE',722,183,5,cream);
  text('UEBERSETZUNGS',722,241,5,cream);
  text('FUNKTION',722,307,7,gold);
  text('WAS LERNEN',721,408,4,cream);
  text('WIR HIER',721,449,5,cream);
  fillRect(719,523,440,3,gold);
  text('100% BUZZWORD-FREE',721,545,3,gold);
  fillRect(0,589,W,41,navy);
  text('FIKTIVE BINGO-KARTE - ROMANFOLGE 13',52,599,3,cream);
 } else if(c.transit_card===true) {
  // Self-contained, clearly fictional commuter monthly pass. Not a real transit ticket.
  const navy=[17,43,54],teal=[35,108,108],light=[229,240,219],
   paper=[255,250,236],yellow=[238,203,105],white=[250,252,244],muted=[147,185,178];
  fillRect(0,0,W,H,navy);
  fillRect(566,0,634,H,light);
  // Abstract transit lines behind the ticket; no real operator logo, barcode or QR code.
  for(let i=0;i<7;i++){
   fillRect(600+i*83,0,3,H,[197,217,198]);
   fillRect(566,58+i*78,634,3,[197,217,198]);
  }
  fillRect(38,55,9,43,yellow);
  text('F0LG3NR31CH',70,61,5,white);
  text('JEDEN TAG.',39,174,9,white);
  text('SCHON DA.',39,271,9,yellow);
  fillRect(40,397,460,3,muted);
  text('FUER BERUFSPENDLER',40,423,5,light);
  text('DEIN WEG ZUR ARBEIT',40,467,4,light);
  // Ticket on the right: readable product-first presentation.
  fillRect(629,99,527,418,[56,106,99]);
  fillRect(617,85,527,418,paper);
  fillRect(617,85,527,100,teal);
  text('MONATSKARTE',655,112,7,white);
  fillRect(655,209,445,3,[172,194,178]);
  text('BERUFSPENDLER',657,235,6,navy);
  text('NOV 2026',657,313,8,teal);
  fillRect(654,411,420,2,[172,194,178]);
  text('EINSTEIGEN. ANKOMMEN.',655,431,3,navy);
  // Distinct non-machine-readable decorative stripes.
  for(let i=0;i<9;i++)fillRect(1005+i*10,358,4,31,i%2?teal:yellow);
  fillRect(0,582,W,48,navy);
  text('FIKTIVE MONATSKARTE - KEIN GUELTIGER FAHRSCHEIN - FOLGE 11',37,597,3,white);
 } else if(c.bakery_card===true){
  const cream=[251,232,197],espresso=[55,34,27],wood=[138,78,44],gold=[233,174,74],
    dark=[83,49,31],crust=[194,113,50],bread=[240,179,97],cheese=[249,207,103];
  fillRect(0,0,W,H,espresso);fillRect(675,0,525,H,cream);
  for(let y=0;y<H;y+=53)fillRect(675,y,525,2,[236,204,156]);
  fillRect(706,170,463,352,wood);fillRect(722,193,431,311,[90,58,40]);
  fillRect(703,476,473,31,[67,37,24]);
  function oval(cx,cy,rx,ry,color){for(let dy=-ry;dy<=ry;dy++){const dx=rx*Math.sqrt(Math.max(0,1-dy*dy/(ry*ry)));fillRect(cx-dx,cy+dy,2*dx+1,1,color);}}
  for(const [cx,cy,rx,ry] of [[807,306,75,63],[963,306,77,62],[1097,307,70,60],[877,423,76,57],[1036,425,83,55]]){
   oval(cx,cy+6,rx+4,ry+3,[69,43,30]);oval(cx,cy,rx,ry,crust);oval(cx-4,cy-7,rx-12,ry-14,bread);
   for(let j=0;j<9;j++){const xx=cx-36+((j*19)%77),yy=cy-23+((j*29)%48);oval(xx,yy,15,7,cheese);}
  }
  fillRect(0,0,675,615,espresso);fillRect(35,48,9,41,gold);
  text('F0LG3NR31CH',65,56,5,cream);text('BAECKEREI',55,138,6,gold);
  text('WIR HABEN',55,226,10,cream);text('NOCH KAESE.',55,316,10,gold);
  fillRect(54,406,570,4,gold);
  text('ZWOELF AUF DER KARTE',55,438,4,cream);
  text('FUENF IN DER AUSLAGE',55,480,4,cream);
  fillRect(0,588,W,42,dark);text('FIKTIVE BAECKEREIANZEIGE - ROMANFOLGE 07',50,599,3,cream);
 } else if(c.chocolate_card===true){
  const cream=[253,235,213],dark=[47,25,26],choco=[105,54,40],
   cake=[143,83,51],icing=[67,34,30],gold=[232,178,106],plate=[241,221,192];
  fillRect(0,0,W,H,dark);fillRect(734,0,466,H,[235,205,174]);
  function oval(cx,cy,rx,ry,color){for(let dy=-ry;dy<=ry;dy++){const dx=rx*Math.sqrt(Math.max(0,1-dy*dy/(ry*ry)));fillRect(cx-dx,cy+dy,2*dx+1,1,color);}}
  oval(957,454,204,97,plate);oval(957,450,175,65,[218,185,148]);
  for(let y=230;y<455;y++){const spread=(y-230)/225;fillRect(812+spread*10,y,280-spread*75,1,cake);}
  for(let y=210;y<250;y++){const spread=(y-210)/40;fillRect(804+spread*8,y,288-spread*4,1,icing);}
  for(let y=261;y<274;y++)fillRect(818,y,259,1,icing);
  for(let y=348;y<361;y++)fillRect(827,y,226,1,icing);
  for(let i=0;i<26;i++){const x=823+(i*53)%240,y=275+(i*43)%155;fillRect(x,y,2+i%3,3,choco);}
  oval(917,212,25,10,[156,96,71]);oval(978,203,23,9,[184,117,82]);
  fillRect(0,0,750,630,dark);fillRect(40,52,8,38,gold);
  text('F0LG3NR31CH',72,58,5,cream);
  text('SCHOKO-',49,126,11,cream);text('KUCHEN',49,219,11,cream);
  text('FERTIG?',49,325,8,gold);
  fillRect(48,405,632,3,gold);
  text('200 G SCHOKOLADE / 150 G BUTTER',50,429,3,cream);
  text('140 G ZUCKER / 3 EIER',50,456,3,cream);
  text('120 G MEHL / 1 TL BACKPULVER',50,483,3,cream);
  text('175 C  /  25-30 MIN',50,523,4,gold);
  text('STAEBCHENPROBE',50,561,4,cream);
  fillRect(0,608,W,22,[76,45,37]);
  text('FIKTIVE REZEPTKARTE - ROMANFOLGE 08',46,613,2,cream);
 } else
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
