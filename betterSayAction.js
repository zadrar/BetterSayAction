// script for fixing aidungeons user input
//say input: '\n> You say \"text\"\n' 
//DO input: \n> You say hello to someone\n' or if the user uses quotations: '\n> You say \"hello to someone\"\n'
//Story: raw with a newline: ' say hello to someone'


// Functionalities:
// Fixes the ortography of the quoted text adding a comma, uppercase and a final period when neccesary
// replaces the default say input verb to more dynamic ones when using the input with > you say/says
const modifier = (text) => {
    text = text.replace(/\bI says\b/gi, "I say"); // Fix for first person
  
    const speechFixRegex = /(?<arrowInput>>)?(?<before>.*?)\s*(?<punct>[,.?!])?\s*"(?<quote>[^"]+)"/i;
    const match = text.match(speechFixRegex);
    if (!match?.groups) return { text };
  
    let { arrowInput, before, punct, quote } = match.groups;
  
    quote = `${quote.trim().charAt(0).toUpperCase()}${quote.trim().slice(1)}${/[.?!,…]$/.test(quote) ? '' : '.'}`; // Fix the ortography of the quoted text
  
    const sayMatch = before.match(/\b(says?)\b/i);
    if (arrowInput && sayMatch) { // Only trigger on SAY action, or DO written like the say
        const isSingular = sayMatch[1] === "says";
        const lastChar = quote.slice(-1);
        const lastFour = quote.slice(-4);
      
        const isMixedEnd = /[!?]{2,}$/.test(lastFour) && /!/.test(lastFour) && /\?/.test(lastFour);
        const insidePuncts = [...quote.slice(0, -1).matchAll(/[.?!]/g)].map(m => m[0]);
        const isUniformInside = insidePuncts.every(p => p === lastChar);
      
        const verbMap = {
          ".": () => (Math.random() < 0.7 ? "say" : "state"),
          "?": () => (Math.random() < 0.7 ? "ask" : "inquire"),
          "!": () => "shout",
          ",": () => (Math.random() < 0.7 ? "begin" : "start"),
        };
      
        let newVerb;
        if (!isUniformInside && "?!,".includes(lastChar)) {
          newVerb = sayMatch[1]; // fallback to original verb if mixed punctuations inside
        } else if (isMixedEnd) {
          newVerb = "exclaim";
        } else {
          const letters = quote.replace(/[^a-zA-Z]/g, '');
          const upperCount = letters.replace(/[^A-Z]/g, '').length;
          const isMostlyUpper = letters.length && upperCount / letters.length >= 0.5;
          newVerb = (isMostlyUpper && lastChar === '!') ? "scream" : (verbMap[lastChar] || (() => "say"))();
        }
        before = before.replace(/\b(says?)\b/i, isSingular ? `${newVerb}s` : newVerb);
    }

    text = text.replace(speechFixRegex, `${arrowInput ?? ''}${before}${punct ?? ','} "${quote}"`);
    return { text };
};

// Don't modify this part
console.log(modifier(text));