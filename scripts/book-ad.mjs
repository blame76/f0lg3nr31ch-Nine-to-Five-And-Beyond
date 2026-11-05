import {escapeHtml} from './lib.mjs';

/**
 * One deliberately fictional, static house ad tied to the Admin's book.
 * It is not a purchase offer, contains no external assets, trackers or clickbait.
 */
export function renderAdminBookAd(){
 const e=escapeHtml;
 const title='Die Kunst, Post-its richtig zu kleben';
 const author='Benjamin Lam';
 const price='14,90 €';
 return '<aside class="fictional-book-ad" aria-label="Fiktive Buchwerbung">'+
  '<p class="book-ad-label">Anzeige · Fiktive Buchwerbung</p>'+
  '<div class="book-ad-grid">'+
   '<div class="book-cover" role="img" aria-label="'+e('Fiktives Buchcover: '+title+', '+author)+'">'+
    '<div class="book-cover-notes" aria-hidden="true"><span></span><span></span><span></span></div>'+
    '<p class="book-cover-kicker" aria-hidden="true">Edition Flurgespräch</p>'+
    '<p class="book-cover-title" aria-hidden="true">Die Kunst,<span>Post-its</span> richtig zu kleben</p>'+
    '<p class="book-cover-author" aria-hidden="true">Benjamin Lam</p>'+
   '</div>'+
   '<div class="book-ad-copy">'+
    '<p class="book-ad-series">Aus dem Bücherregal des Admins</p>'+
    '<h2>'+e(title)+'</h2>'+
    '<p class="book-ad-author">von '+e(author)+'</p>'+
    '<p class="book-ad-blurb">Ein Praxisratgeber für alle, die Ordnung schaffen wollen, ohne dafür ein Meeting anzusetzen. Mit Vorwort.</p>'+
    '<p class="book-ad-price">'+e(price)+'</p>'+
    '<p class="book-ad-disclaimer">Fiktives Buch · fiktiver Preis · kein Kaufangebot</p>'+
   '</div>'+
  '</div>'+
 '</aside>';
}
