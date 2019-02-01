var Deck = function(cards){
     this.cards = cards;
}

Deck.prototype = {

     shuffleCards: function(){
          this.cards = [...this.cards].sort(() => Math.random() - 0.5);
     }
}

// module.exports = Deck;
