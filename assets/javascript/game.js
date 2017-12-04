var dictionary = ["survivor","directory","wisecrack","survival","application","parachute","innocent","consideration","discover","cylinder","liability","majority","circumstance","flatware","interrupt","transfer","skeleton","craftsman","multimedia","hardship","implicit","compound","inhabitant","finished","depressed","reduction","triangle","fountain","correspondence","unanimous","umbrella","elaborate","revolutionary","confrontation","horseshoe","opponent","manufacturer","undermine","director","sentence","patience","expression","competition","flourish","feminist","important","anticipation","disappoint","unpleasant","dressing","emphasis","difference","astonishing","insurance","ostracize","policeman","microphone","shareholder","handicap","eliminate","orthodox","experiment","photograph","volunteer","transition","horoscope","compartment","ambiguity","presidency","scenario","reinforce","advertise","classroom","prevalence","expenditure","conception","abstract","theorist","domestic","disgrace","ministry","attitude","computer","corruption","communication","weakness","beginning","conflict","electronics","convulsion","personality","simplicity","midnight","accompany","reaction","necklace","publisher","potential","intelligence","worthless","door","needless","pathetic","stain","loaf","splendid","grumpy","puny","rainy","interfere","impartial","uppity","humorous","purpose","workable","thrill","nail","periodic","vein","warn","lively","religion","jittery","merciful","snow","relax","gratis","defiant","innocent","skinny","laugh","elated","silk","turkey","collar","sneaky","jazzy","punishment","canvas","cute","examine","unsightly","duck","fail","cushion","produce","hunt","cute","ring","cat","jellyfish","rabbits","entertain","itchy","outstanding","race","bead","art","committee","bless","ready","birthday","grin","load","noiseless","replace","gamy","serious","tow","day","effect","faint","resonant","book","wall","mere","consist","hop","solid","clean","seat","elastic","apparatus","quilt","scold","dinosaurs","rinse","rot","panicky","sable","credit","sigh","honorable","correct","unwieldy"];

    var usedLetters = [];
    var currentWord = [];
    var maskedWord;
    var alertDisplay = "<p>Waiting on you, chief.</p>";
    var usedDisplay = "";
    var strikes = 0;
    var userInput = "";
    var hardcore;

    var title = "<h1>Hangman</h1>";
    if (confirm("Are you truly HARD CORE?")) {
      hardcore = true;
      title = "<h1>Hardcore Hangman<h1>";
    }

    // select word from dictionary
    var selectWord = dictionary[Math.floor(Math.random() * dictionary.length)];

    console.log(selectWord);
    
    // create currentWord array from selectWord
    for (i = 0 ; i < selectWord.length ; i++) {
      var letter = selectWord.charAt(i).toUpperCase();
      currentWord.push(letter);
    };
    console.log("initial currentWord: " + currentWord);

    function displayRenders() {
      maskedWord = "";
      for (i = 0; i < currentWord.length; i++) {
        if (usedLetters.includes(currentWord[i])) {
          maskedWord = maskedWord + currentWord[i].toUpperCase() + " ";
        } else {
          maskedWord = maskedWord + "_ ";
        }
      };
      console.log("initial maskedWord: " + maskedWord);
      usedDisplay = "";
      if (hardcore) {
        usedDisplay = "Your last pick was '" + userInput.toUpperCase() + "'."
      } else for (i = 0 ; i < usedLetters.length; i++) {
        usedDisplay = usedDisplay + usedLetters[i].toUpperCase() + " ";
      };
    };

    displayRenders();

    html =
        "<h1>" + title + "</h1>" +
        "<p>" + maskedWord + "</p>" +
        alertDisplay +
        "<p>Used Letters: You ain't picked nothin'.</p>" + 
        "<p>Strikes: " + strikes + " / 7</p>";
    document.querySelector("#game").innerHTML = html;  

    document.onkeyup = function(event) {
      
      userInput = event.key.toUpperCase();

      if (!usedLetters.includes(userInput)) {
        usedLetters.push(userInput);
        usedLetters = usedLetters.sort();
        if (!currentWord.includes(userInput)) {
          strikes++;
          alertDisplay = "<p>Nope, you're one step closer to stretching!</p>";
        } else {
          alertDisplay = "<p>Good choice!</p>";
        };
      } else {
        alertDisplay = "<p>You've already used that letter!</p>";
        if (hardcore) {strikes++;};
      };
      displayRenders();

      html =
        "<h1>" + title + "</h1>" +
        "<p>" + maskedWord + "</p>" +
        alertDisplay +
        "<p>Used Letters: " + usedDisplay + "</p>" + 
        "<p>Strikes: " + strikes + " / 7</p>";

      document.querySelector("#game").innerHTML = html;  

      // loss screen
      if (strikes === 7) {
        var unMaskedWord = "";
        for (i = 0; i < currentWord.length; i++) {
            unMaskedWord = unMaskedWord + currentWord[i].toUpperCase() + " ";
        };

        // hide solution from hardcore player
        if (hardcore) {unMaskedWord = alertDisplay;};

        html =
        "<h1>" + title + "</h1>" +
        "<p>" + maskedWord + "</p>" + // string declarations like this can't include expressions, can they?
        "<p>" + unMaskedWord + "</p>" +
        "<p>Used Letters: " + usedDisplay + "</p>" + 
        "<p>Strikes: " + strikes + " / 7</p>" +
        "<h2>You have met your deserved justice.</h2>";
      }
      
      // win screen
      else if (!maskedWord.includes("_")) {
        html =
        "<h1>" + title + "</h1>" +
        "<p>" + maskedWord + "</p>" +
        alertDisplay +
        "<p>Used Letters: " + usedDisplay + "</p>" + 
        "<p>Strikes: " + strikes + " / 7</p>" +
        "<h2>You've escaped justice.</h2>";
      };

      document.querySelector("#game").innerHTML = html;
    }  
