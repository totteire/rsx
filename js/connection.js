function is_int(value){
    if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
        return true;
    } else {
        return false;
    }
}

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

    dial1.updateQuest("Entrez le nom du fichier à transferer ...");
    $("#nom_fichier").show();
    $("#nom_fichier").change(function(){
        NOM_FICH = $(this).val();
        cons.add("Nom du fichier: " + NOM_FICH);
        $(this).hide();
        dial1.updateQuest("Entrez la taille du fichier en octets ...");
        $("#taille_fichier").show();
    });
    $("#taille_fichier").change(function(){
        TAILLE_FICH = $(this).val();
        if(is_int(TAILLE_FICH)){
            cons.add("Taille du fichier: " + TAILLE_FICH + " octets");
            $(this).hide();
            dial1.updateQuest("Entrez la taille de la trame ...");
            $("#lg_trame").show();
        }
    });
    $("#lg_trame").change(function(){
        TAILLE_TRAME = $(this).val();
        if(is_int(TAILLE_TRAME)){
            cons.add("Taille des trames: " + TAILLE_TRAME + " octets");
            $(this).hide();
            dial1.updateQuest("Entrez la taille de la fenêtre");
            $("#taille_fenetre").show();
        }
    });
    $("#taille_fenetre").change(function(){
        TAILLE_FEN = $(this).val();
        if(is_int(TAILLE_FEN)){
            cons.add("Taille de la fenêtre: " + TAILLE_FEN);
            $("#taille_fenetre").show();
            cnx();
            dial1.clearQuest();
        }
    });

    $("#destState").change(function(){
        rep = $("#destState").val();
        if(rep != 0){
            dial2.clearQuest();
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
            dial2.updateQuest("La station destinatrice est:");
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
