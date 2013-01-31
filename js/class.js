function dialog(nodeIdQuest, nodeIdSelct){
    this.idQuest = nodeIdQuest;
    this.nodeQuest = $('#' + this.idQuest);
    /*this.idSelect = nodeIdSelct;*/
    /*this.nodeSelect = $('#' + this.idSelect);*/
    this.rep = 0;
    /*this.quest = {}*/
    this.updateQuest = function(text){
        this.nodeQuest.html(text);
    }
    /*this.setChoices = function(question){*/
    /*options = "";*/
    /*for(i = 1; i <= question.__defineGetter__.length; i++){*/
    /*options += "<option value='" + i + "' >" + question[i] + "</option>";*/
    /*}*/
    /*this.nodeSelect.html(options);*/
    /*}*/
}

function FournServ(fourId){
    this.idFour = fourId;
    this.nodeFour = $('#' + this.idFour);
    this.changeState = function(state){
        this.nodeFour.text(state);
    }
}

function Trame(trameId){
    this.idTrame = trameId;
    this.idName = trameId + "Name";
    this.nodeTrame = $('#' + this.idTrame);
    this.nodeContainer = this.nodeTrame.parent();
    this.nodeName = this.nodeContainer.children(".trameName");
    this.changeName = function(name){
        $(".trameName").fadeOut('fast');
        this.nodeName.fadeIn('fast').text(name);
        return this;
    }
    this.wait = function(func){
        var wait = setInterval(function(func) {
            if($(".trame:animated").length == 0) {
                clearInterval(wait);
                func;
            }
        }, 200);
        return this;
    }
    this.setPos = function(pos){
        this.nodeTrame.css('top', pos.y);
        this.nodeTrame.css('left', pos.x);
        return this;
    }
    this.anim = function(direction){
        var _this = this;
        var diffx = this.pos2.x - this.pos1.x;
        var diffy = this.pos2.y - this.pos1.y;
        if (direction == 1){
            /*if(this.nodeTrame.queue().length == 0)*/
            this.setPos(this.pos1);
            this.nodeTrame.fadeIn();
            this.nodeTrame.animate({
                left: '+='+diffx,
                top: '+='+diffy,
            }, 1000, function(){
                _this.nodeTrame.fadeOut();
                /*_this.setPos(_this.pos2);*/
            });
        }else{
            /*if(this.nodeTrame.queue().length == 0)*/
            this.setPos(this.pos2);
            this.nodeTrame.fadeIn();
            this.nodeTrame.animate({
                left: '-='+diffx,
                top: '-='+diffy,
            }, 1000, function(){
                _this.nodeTrame.fadeOut();
                /*_this.setPos(_this.pos1);*/
            });
        }
        return this;
    }
}

function TrameH(trameId){
    this.__proto__.constructor(trameId);
    this.pos1 = {
        'x': (- this.nodeTrame.width() / 2),
        'y': (this.nodeContainer.height() / 2) - (this.nodeTrame.height() / 2) + 1
    };
    this.pos2 = {};
    this.pos2.x = this.pos1.x;
    this.pos2.y = this.pos1.y;
    this.pos2.x += this.nodeContainer.width();
}

function TrameV(trameId, start){
    this.__proto__.constructor(trameId);
    this.pos1 = {
        'x': (this.nodeContainer.width() / 2) - (this.nodeTrame.width() / 2) + 1,
        'y': (- this.nodeTrame.height() / 2)
    };
    this.pos2 = {};
    this.pos2.x = this.pos1.x;
    this.pos2.y = this.pos1.y;
    this.pos2.y += this.nodeContainer.height();
    if(start == 'down'){
        tmpPos = this.pos1;
        this.pos1 = this.pos2;
        this.pos2 = tmpPos;
    }
}

function output(nodeId){
    this.id = nodeId;
    this.dom = $('#'+nodeId);
    this.add = function(log){
        this.dom.append(log+"\n");
        return this;
    }
}