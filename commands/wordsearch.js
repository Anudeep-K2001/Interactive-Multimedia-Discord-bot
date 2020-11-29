const randomWord = require('random-words');



var success, fail, words, table;
var rows = 7;
var cols = 7;



function randomAlpha(){
    const alphabets = [
            'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
          ];
    return alphabets[Math.floor(Math.random()*alphabets.length)];
    }


function createTable(x = 7, y = 7){
    var xt = new Array(x);
    var yt = new Array(y);
    for(var i = 0; i < x; i++){
        for(var j = 0; j < y; j++){
            yt[j] = 0;
        }
        xt[i] = yt;
        yt = new Array(y);
    }
    success = [];
    fail = [];
    words = randomWord(Math.floor((x+y/2))*3);
    return xt;
}


function getWord(){
    return words.shift().toUpperCase();
}


function getRandomLocation(){
    x = Math.floor(Math.random()*rows);
    y = Math.floor(Math.random()*cols);
    if (table[x][y] !== 0){
        getRandomLocation();
    }
    return [x,y];
}



function possibleDirections(location, word){
    x = location[0];
    y = location[1];
    len = word.length;
    var left = 0, right = 0, up = 0, down = 0;
    var count;



    //left -y
    try {

    count = 0;
    for(var i = y; i > y - len; i--){
        if(table[x][i] !== 0){
            //console.log('left not possible');
            break;
        }
        count += 1;
    }
    
    if(count === len){
        //console.log('left is possible');
        left = 1;
    }
    } catch (err) {};

    //right +y
    try{
    count = 0;
    for(var i = y; i < len + y; i++){
        if(table[x][i] !== 0){
            //console.log('right not possible');
            break;
        }
        count +=1;
    }

    if (count === len){
        //console.log('right is possible');
        right = 1;
    }
    } catch (err) {};

    //up -x
    try{
    count = 0;
    for(var i = x; i > x - len; i--){
        if(table[i][y] !== 0){
            //console.log('up not possible');
            break;
        }
        count += 1;
    }
    
    if(count === len){
        //console.log('up is possible');
        up = 1;
    }
    } catch (err) {};

    //down +x
    try{
    count = 0;
    for(var i = x; i < len + x; i++){
        if(table[i][y] !== 0){
            //console.log('down not possible');
            break;
        }
        count += 1;
    }
    
    if(count === len){
        //console.log('down is possible');
        down = 1;
    }
    } catch (err) {};

    return [left, right, up ,down];
}


function getAllIndex(list, number){
    var len = list.length;
    var count = 0;
    var indexs = [];
    for (var i = 0; i < len; i++){
        if(list[i] === number){
            indexs.push(count);
        }
        count++;
    }
    return indexs;
}


function addWord(){
    var directions = [];
    var loc = getRandomLocation()
    //console.log([x,y]);
    var word = getWord()
    //console.log(word);
    directions = possibleDirections(loc,word);
    var accepted = getAllIndex(directions, 1);
    var pick = accepted[Math.floor(Math.random()*accepted.length)];
    //console.log(`HEY HERE ${success.length  }`)
    if (pick === 0){
        fillLeft(loc,word);
    } else if (pick === 1){
        fillRight(loc,word);
    } else if (pick === 2){
        fillUp(loc,word);
    } else if (pick === 3){
        fillDown(loc,word);
    } else {
        fail.push(word);
    }
}


function fillLeft(loc,word){
    x = loc[0]
    y = loc[1]

    count = 0;
    for(var i = y; i > y - len; i--){
        table[x][i] = word[count];
        count++;
    }
    success.push(word);
}


function fillRight(loc, word){
    x = loc[0];
    y = loc[1];

    count = 0;
    for(var i = y; i < len + y; i++){
        table[x][i] = word[count];
        count++;
    }
    success.push(word);
}


function fillUp(loc, word){
    x = loc[0];
    y = loc[1];

    count = 0;
    for(var i = x; i > x - len; i--){
        table[i][y] = word[count];
        count++;
    }
    success.push(word);
}


function fillDown(loc, word){
    x = loc[0];
    y = loc[1];

    count = 0;
    for(var i = x; i < len + x; i++){
        table[i][y] = word[count];
        count++;
    }
    success.push(word);
}



function randomize(){
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            if(table[i][j] === 0){
                table[i][j] = randomAlpha();
            }else{}
        }
    }
}





module.exports = {
    name : 'ws',
    description : 'A game where u find words in a random matrix',
    execute(message, args){
        if(!args[0]){
            message.channel.send('use \`.ws -help\` for more info');
            return;
        }
        if(args[0].toLowerCase() === '-start' || args[0].toLowerCase() === '-s'){
            var rows = 7, cols = 7, gameCount;
            table = createTable(rows, cols);
            var end = [5,6][Math.round(Math.random())];
            for(var i = 0; i < Math.floor((rows+cols)/2)*3; i++){
                addWord();
                if(success.length === end) break;
            }
            randomize();
            for(var i = 0; i < rows; i++){
               message.channel.send(`\*\*\`${table[i].join('\t')}\`\*\*`);
            }
        } else if(args[0].toLowerCase() === '-hard' || args[0].toLowerCase() === '-h'){
            message.channel.send(`There is a word with ${success[Math.floor(Math.random()*success.length)].length} letters`);
        } else if(args[0].toLowerCase() === '-normal' || args[0].toLowerCase() === '-n'){
            message.channel.send(`A word starts with ${success[Math.floor(Math.random()*success.length)][0]}`);
        } else if(args[0].toLowerCase() === '-easy' || args[0].toLowerCase() === '-e'){
            var easy = success[Math.floor(Math.random()*success.length)];
            message.channel.send(`A word starts with ${easy[0]} and ends with ${easy.slice(-1)[0]}`);
        } else if(args[0].toLowerCase() === '-answer' || args[0].toLowerCase() === '-a'){
            message.channel.send(`You tried well. ${success.join(', ').toLowerCase()}`);
            success = '';
        } else if(args[0].toLowerCase() === '-show'){
            for(var i = 0; i < 7; i++){
                message.channel.send(`\*\*\`${table[i].join('\t')}\`\*\*`);
            }
        }else if(args[0].toLowerCase() === '-left' || args[0].toLowerCase() === '-l'){
            message.channel.send(`There are ${success.length} words left in board`);
        } else if(args[0].toLowerCase() === '-help'){
            message.channel.send(`Welcome to wordsearch.\nIn this game, try to find a meaningful word in these random mess.\nTo start or restart use \`.ws -start\` or \`.ws -s\`.\nIf you found the word submit using \`.ws <word>\`.\nTo get hard hint use \`.ws -hard\` or \`.ws -h\`.\nTo get normal hint use \`.ws -normal\` or \`.ws -n\`.\nTo get easy hint use \`.ws -easy\` or \`.ws -e\`.\nTo give up use \`.ws -answer\` or \`.ws -a\`.\nTo see the board again use \`.ws -show\`.\nTo see how many are left use \`.ws -left\` or \`.ws -l\`\nTo see help menu use \`.ws -help\`.\nP.S: Sometimes words that are meanigful can be treated as wrong because these are generated during randomization. There are always either 5 or 6 meaningful words.\nand sometimes there is chance for same word to repeat twice.\nIncase of error, please restart board `);
        }
        else{
            gameCount = success.length-1;
            if(success.includes(args[0].toUpperCase())){
                message.react('👍');
                success.splice(success.indexOf(args[0].toUpperCase()),1);
                gameCount--;
                if(success.length === 0){
                    message.channel.send(`you guys completed the board! yay congrats!!`);
                }
            } else message.react('👎');
        }
    }
}

