//dom elements 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loder = document.getElementById('loader');


//global container
let apiquotes =[];

function loading(){
    loder.hidden = false;
    quoteContainer.hidden = true;
    
}
// complete
function complete(){
    quoteContainer.hidden = false;
    loder.hidden = true;
   
}

function newquotes(){
  
    const quotes = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    loading();
   if(!quotes.author){
       authorText.textContent = "anonymous";

   }else{
       authorText.textContent = quotes.author;
   }
   if(quotes.text.length > 50){
       quoteText.classList.add('long-quote');
   }else{
    quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quotes.text;

    complete();
  
}


// fetch from api

async function getquotes(){
    try {
         loading();
        const apiUrl="https://type.fit/api/quotes";
        const response = await fetch(apiUrl);
        apiquotes = await response.json();
        newquotes();
        
    } catch (error) {
        
    }
}



//tweet
function tweetone(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');

}
//eventlistener
twitterBtn.addEventListener('click',tweetone);
newQuoteBtn.addEventListener('click',newquotes);


getquotes();

