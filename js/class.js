function dialog(nodeIdCell){
    this.idDial = nodeIdCell;
    this.nodeDial = $('#' + this.idDial);
    this.nodeQuest = this.nodeDial.children(".quest");
    this.updateQuest = function(text){
        _this = this;
        this.nodeQuest.fadeOut("slow", function(){ _this.nodeQuest.html(text); });
        this.nodeQuest.fadeIn("slow");
    }
    this.clearQuest = function(){
        $("#"+this.idDial+" .dialEl").hide();
    }
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
        this.nodeName.fadeIn('fast').text(name);
        _this = this.nodeName;
        setTimeout(function(){
            $(_this).hide();
        }, ANIMT + ANIMT * .25);
        console.log(ANIMT - ANIMT * 0.0);
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
            }, ANIMT, function(){
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
            }, ANIMT, function(){
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
