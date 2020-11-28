const randomWord = require('random-words');



var success = [];
var fail = [];
var words = randomWord(50);
var rows = 7;
var cols = 7;


function randomAlpha(){
    const alphabets = [
            'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r',
            's', 't', 'u', 'v', 'w', 'x',
            'y', 'z'
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
    return xt;
}


function getWord(){
    return words.shift();
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


var table = createTable();

//console.log(possibleDirections([3,3],'anu'));
//console.log(table);

for (var i = 0; i < 15; i++){
    addWord();
    if(success.length === 5) break;
    //console.log(`REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ${i}`)
}


//console.log(table);
//console.log(success.length);


module.exports = {
    name : 'wordsearch',
    description : 'A game where u find words in a random matrix',
    execute(message, args){
        message.channel.send(table);
        message.channel.send(success);
    }
}