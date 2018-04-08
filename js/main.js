'use strict;'
let typed;
let linesCount=0;
let commandsHistory = [];
let currentCommandIndexInHistory = -1;
let fileSystem = [
    
];
let commands = {
    'help':{
        'description':'lists all the commands available',
        'action':function(){
            let textToPrint = '';
            for(command in commands){
                textToPrint+='<br>'+command+' - '+commands[command]['description'];
            }
            typeLine(textToPrint,false,false,);
        },
    },
    'introduction':{
        'description':'prints introduction about WCE Codepals',
        'action':function(options){
            let textToPrint = 'WCE Codepals is an Initiative for Collaborative Learning amongst students of Walchand College of Engineering, Sangli. <br> With this initiative we\'re launching Codechef Campus Chapter and do many other cool things.';
            typeLine(textToPrint,false,false,);
        },
    },
    'clear':{
        'description':'clears screen',
        'action':function(options){
            deleteAllLines();
        }
    },
    'roadmap':{
        'options':{
        },
        'description':'prints details about roadmaps designed, <br>options are <br> &nbsp;&nbsp;[--list] prints list of all roadmaps <br> [--roadmap_name] prints detail about individual roadmap',
        'action':function(options){
            let textToPrint;
            if(options.length==0){
                textToPrint = 'please provide correct option, e.g \'roadmap --list\', prints list of all roadmaps. or else try \'help\'';
                typeLine(textToPrint,false,false,);
            }else if(options.length==1){
                switch(options[0]){
                    case '--list': textToPrint = 'Following are the advised and followed Roadmaps by WCE Codepals.<br>                <table><tr><td>--sport_prog</td><td>Sport Programming</td></tr><tr><td>--web_dev</td><td>Web Development</td></tr><tr><td>--mobile_dev </td><td> Mobile Development</td></tr><tr><td>--desktop_dev </td><td> Desktop Development</td></tr><tr><td>--system_prog </td><td> System Programming</td></tr><tr><td>--net_sec </td><td> Networking and Security</td></tr><tr><td>--iot_embedded</td><td> IOT and Embedded Systems</td></tr><tr><td>--ai_ml </td><td> Artificial Intelligence and Machine Learning</td></tr></table>';
                    typeLine(textToPrint,false,false,);
                    break;
                    default: textToPrint = 'roadmap: invalid option '+options[0]; typeLine(textToPrint,false,false,);
                }
            }
        }
    }
}

function handleCommand(commandText){

    commandsHistory.push(commandText);
    currentCommandIndexInHistory=commandsHistory.length;
    
    let commandTextArray = commandText.split(' ');
    let command = commandTextArray[0];
    let options = commandTextArray.slice(1);
    
    if(commands.hasOwnProperty(command)){
        commands[command]['action'](options);
    }else{
        let textToPrint = command+': command not found - try `help`';
        typeLine(textToPrint,false,false,);
    }
}

function prettyLog(str) {
  console.log('%c ' + str, 'color: green; font-weight: bold;');
}

$(document).ready(function() {           
      typeLine('Welcome to WCE Codepals. <br> Work is in Progress. Please drop your suggestions at wcecodepals@gmail.com. <br> Wait I don\'t understand, what is this? Aha!! Seek help, terminal is here.');
});

$("#command").on('keyup', function (e) {
    if (e.keyCode == 13) {
        let command = $("#command")[0].value;
        typeLine(command,true);
        handleCommand(command);
    }else if(e.keyCode == 38){   
        
        if(currentCommandIndexInHistory-1>-1 && currentCommandIndexInHistory<=commandsHistory.length){
            currentCommandIndexInHistory-=1;    
            $("#command")[0].value = commandsHistory[currentCommandIndexInHistory];
            
        }else{
             $("#command")[0].value =  $("#command")[0].value;
        }
        
    }else if(e.keyCode == 40){    
        if(currentCommandIndexInHistory>-1 && currentCommandIndexInHistory+1<commandsHistory.length){        
            currentCommandIndexInHistory+=1;
            $("#command")[0].value = commandsHistory[currentCommandIndexInHistory];            
        }else{
             $("#command")[0].value =  '';
        }  
    }
}); 



function deleteLine(lineId){
    if($("#line-"+lineId).length){
        $("#line-"+lineId)[0].remove();
        linesCount--;
    }
    
}

function deleteAllLines(){
    for(let id=linesCount;id>0;id--){
        deleteLine(id);
    }
}

function typeLine(command,isFromInput=false,showPropmt=true,user='root',path='~/',lineId=linesCount+1){
    let defer = $.Deferred();
    $('#line-input').hide();
    
    if($("#line-"+lineId).length==0){
        createLine(lineId,getPrompt(user,path,showPropmt));
    }
        
    if(isFromInput){
        $("#line-"+lineId+" .command")[0].innerHTML=command;
        $("#command")[0].value='';
        $('#line-input').show();
        $("#command")[0].focus();
        return defer;
    }else{
        typed = new Typed("#line-"+lineId+" .command", {
            strings:[command],
            typeSpeed: 0,
            smartBackspace: false,
            startDelay: 1000,
            loop: false,
            showCursor:false,
            onComplete:function(){$('#line-input').show(); $("#command")[0].focus();}
        });
        return defer;
    }
    
}


function getPrompt(user='root',path='~/',showPropmt=true){
    if(showPropmt){
    return "<span class='prompt'><span class='user'>"+user+"</span><span class='at'>@</span><span class='path'>"+path+"</span>><span class='caret'>$</span></span>&nbsp;";
    }else{
        return "";
    }
}

function createLine(lineId,prompt){
    linesCount+=1;
    $("<span id='line-"+lineId+"' class='typed'>"+prompt+"<span class='command'></span><br></span>").insertBefore("#line-input");
}
