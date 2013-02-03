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
    cons.add("Primitive: " + name1 + params);
    setTimeout(function(){
        trame2.anim(1).changeName(name2);
        cons.add("Element de protocole: " + name2 + params);
        setTimeout(function(){
            trame3.anim(1).changeName(name3);
            cons.add("Primitive: " + name3 + params);
            /*setTimeout(function(){*/
            /*trame3.changeName("");*/
            /*},2000);*/
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
            /*setTimeout(function(){*/
            /*trame1.changeName("");*/
            /*},2000);*/
        },2000);
    },2000);
}

window.Connection = function(){
    var INACCESSIBLE = 0;

    $("#btnStart").fadeOut();
    $("#title").text("Phase CONNEXION");
    dial1.updateQuest("Entrez le nom du fichier à transferer ...");
    $("#nom_fichier").show();
    $("#nom_fichier").change(function(){
        NOM_FICH = parseInt($(this).val());
        cons.add("Nom du fichier: " + NOM_FICH);
        $(this).hide();
        dial1.updateQuest("Entrez la taille du fichier en octets ...");
        $("#taille_fichier").show();
    });
    $("#taille_fichier").change(function(){
        TAILLE_FICH = parseInt($(this).val());
        if(is_int(TAILLE_FICH)){
            cons.add("Taille du fichier: " + TAILLE_FICH + " octets");
            $(this).hide();
            dial1.updateQuest("Entrez la taille de la trame ...");
            $("#lg_trame").show();
        }
    });
    $("#lg_trame").change(function(){
        TAILLE_TRAME = parseInt($(this).val());
        if(is_int(TAILLE_TRAME)){
            cons.add("Taille des trames: " + TAILLE_TRAME + " octets");
            $(this).hide();
            dial1.updateQuest("Entrez la taille de la fenêtre");
            $("#taille_fenetre").show();
        }
    });
    $("#taille_fenetre").change(function(){
        TAILLE_FEN = parseInt($(this).val());
        if(is_int(TAILLE_FEN)){
            cons.add("Taille de la fenêtre: " + TAILLE_FEN);
            $("#taille_fenetre").show();
            cnx();
            dial1.clearQuest();
        }
    });

    cnx = function(){
        four1.changeState("Attente acceptation");
        animR("T-CONNECT.demande", "CNX", "T-CONNECT.indication", [NOM_FICH, TAILLE_FEN, TAILLE_TRAME]);
        setTimeout(function(){
            dial2.updateQuest("La station destinatrice est:");
            $("#destState").fadeIn();
        }, ANIMT * 6)
    }
    $("#destState").change(function(){
        rep = $("#destState").val();
        if(rep != 0){
            dial2.clearQuest();
            if(rep == 1) inaccessible();
            else if(rep == 2)
                accessibleNonOk();
            else if(rep == 3)
                accessibleOk();
        }
        $("#destState").val(0);
    })

    inaccessible = function(){
        cons.add("La station destinatrice est inaccessible!");
        INACCESSIBLE ++;
        if(INACCESSIBLE > 3)
            cnxAbandonIndication();
        else
            cnx();
    }
    cnxAbandonIndication = function(){
        trame1.anim(-1).changeName("T-ABANDON.indication()");
        cons.add("Abandon de la connexion!");
        cons.add("Primitive: T-ABANDON.indication()");
        setTimeout(function(){
            endAll();
        }, ANIMT);
    }
    accessibleNonOk = function(){
        animL("T-CONNECT.confirmation", "REP", "T-CONNECT.confirmation", ['0','0']);
        setTimeout(function(){
            endAll();
        }, ANIMT * 6);
    }
    accessibleOk = function(){
        $("#destConfParams").fadeIn();
        dial2.updateQuest("Voulez vous garder les paramètres de QoS?");
        cons.add("La station destinatrice est accessible!");
    }
    $("#destConfParams").change(function(){
        rep = $("#destConfParams").val();
        if(rep != 0){
            dial2.clearQuest();
            if(rep == 1)
                keepParams();
            else if(rep == 2)
                changeParams();
        }
        $("#destConfParams").val(0);
    })
    keepParams = function(){
        four2.changeState("Réception");
        animL("T-CONNECT.confirmation", "REP", "T-CONNECT.confirmation");
        setTimeout(function(){
            Transfert();
        }, ANIMT * 6);
    }
    changeParams = function(){
        four2.changeState("Attente d'acceptation");
        dial2.updateQuest("Nouvelle taille des trames: ");
        $("#confLgTrame").show();
    }
    $("#confLgTrame").change(function(){
        TAILLE_TRAME = parseInt($(this).val());
        if(is_int(TAILLE_TRAME)){
            cons.add("Nouvelle taille des trames: " + TAILLE_TRAME + " octets");
            $(this).hide();
            dial2.updateQuest("Nouvelle taille de la fenêtre");
            $("#confTailleFen").show();
        }
    });
    $("#confTailleFen").change(function(){
        TAILLE_TRAME = parseInt($(this).val());
        if(is_int(TAILLE_TRAME)){
            cons.add("Nouvelle taille de la fenêtre: " + TAILLE_TRAME + " octets");
            dial2.clearQuest();
            animL("T-CONNECT.confirmation", "REP", "T-CONNECT.confirmation", [TAILLE_FEN, TAILLE_TRAME]);
            setTimeout(function(){
                validateQoS();
            }, ANIMT * 6);
        }
    });
    validateQoS = function(){
        dial1.updateQuest("Voulez vous valider les paramètres QoS?");
        $("#validateQoS").show();
    }
    $("#validateQoS").change(function(){
        rep = $("#validateQoS").val();
        if(rep != 0){
            dial1.clearQuest();
            if(rep == 1)
                Transfert();
            else if(rep == 2)
                cnxAbandon();
        }
        $("#destConfParams").val(0);
    });

    cnxAbandon = function(){
        four1.changeState("Repos");
        animR("T-ABANDON.demande", "ABN", "T-ABANDON.indication");
        setTimeout(function(){
            four2.changeState("Repos");
            endAll();
        }, ANIMT * 6);
    };
}
