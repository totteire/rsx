window.Deconnexion = function(){
    $("#title").text("Phase DECONNEXION");

    var nbErreur = 0;
    trame1.anim(1).changeName("T-DISCONNECT.demande");
    cons.add("Primitive: T-DISCONNECT.demande()");
    setTimeout(function(){
        trame2.anim(1).changeName("DISC");
        cons.add("Element de protocole: DISC()");
        dial2.updateQuest("La PDU-DISC rencontre t'elle une erreur?");
        $("#discOk").show();
        setTimeout(function(){
            trame2.changeName("");
        }, ANIMT * 2);
    }, ANIMT * 2);

    $("#discOk").change(function(){
        rep = $("#discOk").val();
        if(rep != 0){
            dial2.clearQuest();
            if(rep == 1)
                erreur();
            else if(rep == 2)
                noErreur();
        }
        $("#discOk").val(0);
    });
    erreur = function(){
         nbErreur ++;
         if(nbErreur > 1){
            trame1.anim(-1).changeName("D-ABANDON.indication");
            cons.add("Primitive: D-ABANDON.indication()");
            setTimeout(function(){
                trame3.anim(1).changeName("D-ABANDON.indication");
                cons.add("Primitive: D-ABANDON.indication()");
                setTimeout(function(){
                    endAll();
                }, ANIMT * 2);
            }, ANIMT * 3);
         }else{
            trame1.anim(1).changeName("T-DISCONNECT.demande");
            cons.add("Primitive: T-DISCONNECT.demande()");
            setTimeout(function(){
                trame2.anim(1).changeName("DISC");
                cons.add("Element de protocole: DISC()");
                dial2.updateQuest("La PDU-DISC rencontre t'elle une erreur?");
                $("#discOk").show();
            }, ANIMT * 2);
         }
    }
    noErreur = function(){
        trame2.anim(-1).changeName("PDU-DISC ACK");
        cons.add("PDU-DISC ACK")
        setTimeout(function(){
            trame3.anim(1).changeName("T-DISCONNECT.indication");
            cons.add("T-DISCONNECT.indication()")
            trame1.anim(-1).changeName("T-DISCONNECT.indication");
            cons.add("T-DISCONNECT.indication()")
            setTimeout(function(){
                endAll();
            }, ANIMT *2);
        }, ANIMT * 2);
    }
}
