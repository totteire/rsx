paramsToStr = function(params){
    var strParam = "(";
    for(var param in params)
        strParam += params[param] + ",";
    strParam = strParam.slice(0,-1);
    strParam += ")";
    return strParam;
}

window.animR = function(name1, name2, name3, params){

    if(params === undefined)
        params = "()";
    else
        params = paramsToStr(params);

    trame1.anim(1).changeName(name1);
    cons.add("Envoie: " + name1 + params);
    setTimeout(function(){
        trame2.anim(1).changeName(name2);
        cons.add("Envoie: " + name2 + params);
        setTimeout(function(){
            trame3.anim(1).changeName(name3);
            cons.add("Envoie: " + name3 + params);
            setTimeout(function(){
                trame3.changeName("");
            },2000);
        },2000);
    },2000);
}
window.animL = function(name1, name2, name3, params){

    if(params === undefined)
        params = "()";
    else
        params = paramsToStr(params);

    trame3.anim(-1).changeName(name1);
    cons.add("Primitive: " + name1 + params);
    setTimeout(function(){
        trame2.anim(-1).changeName(name2);
        cons.add("Element de protocole: " + name2 + params);
        setTimeout(function(){
            trame1.anim(-1).changeName(name3);
            cons.add("Primitive: " + name3 + params);
            setTimeout(function(){
                trame1.changeName("");
            },2000);
        },2000);
    },2000);
}

window.Connection = function(){
    var INACCESSIBLE = 0;
    $("#taille_fenetre").show();

    $("#taille_fenetre").change(function(){
        cnx();
        $("#taille_fenetre").hide();
    });
    $("#destState").change(function(){
        rep = $("#destState").val();
        if(rep != 0){
            $("#destState").hide();
            if(rep == 1)
                inaccessible();
            else if(rep == 2)
                accessibleNonOk();
            else if(rep == 3)
                accessibleOk();
        }
        $("#destState").val(0);
    })
    cnx = function(){
        animR("T-CONNECT.demande", "CNX", "T-CONNECT.indication", [NOM_FICH, TAILLE_FEN, TAILLE_TRAME]);
        setTimeout(function(){
            $("#destState").fadeIn();
        }, 6000)
    }
    inaccessible = function(){
        INACCESSIBLE ++;
        if(INACCESSIBLE > 3)
            cnxAbandon();
        else
            cnx();
    }
    cnxAbandon = function(){
        
    }
    accessibleNonOk = function(){
        
    }
    accessibleOk = function(){
        
    }

}
