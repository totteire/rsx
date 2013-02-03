window.Transfert = function(){
    NB_TRAME = Math.ceil(TAILLE_FICH / TAILLE_TRAME);
    $("#title").text("Phase TRANSFERT");
    four1.changeState("Transfert");

    var PDU_NUM = 0;
    var NB_CRC = 0;
    var NB_PERTE = 0;
    var DEB_FEN = 1;

    name1 = "T-DATA.demande";
    params = "(FANION, " + NOM_FICH + ", " + NB_TRAME + ", FANION)";
    trame1.anim(1).changeName("T-DATA.demande");
    cons.add("Primitive: " + name1 + params);
    setTimeout(function(){
        pdu0();
    }, ANIMT * 2);

    pdu0 = function(){
        name2 = "PDU-DATA0";
        trame2.anim(1).changeName(name2);
        cons.add("Element de protocole: " + name2 + params);
        setTimeout(function(){
            dial2.updateQuest("Que va t'il se passer?");
            $("#trameState").show();
        }, ANIMT * 2);
    }
    $("#trameState").change(function(){
        rep = $("#trameState").val();
        if(rep != 0){
            dial2.clearQuest();
            if(rep == 1)
                Ack();
            else if(rep == 2)
                errCrc();
            else if(rep == 3)
                errAck();
            else if(rep == 4)
                errPdu();
        }
        $("#trameState").val(0);
    });
    Ack = function(){
        if(PDU_NUM == 0){
            trame2.anim(-1).changeName("ACK1");
            cons.add("Envoie ACK1");
            PDU_NUM ++;
            setTimeout(function(){
                Ack();
            }, ANIMT * 2);
        }else{
            if(PDU_NUM == DEB_FEN + TAILLE_FEN){
            /*flow complet*/
                $('#trameState').show();
                dial2.updateQuest("Que va t'il se passer?");
                DEB_FEN = PDU_NUM;
            }else{
            /*au milieu du flow*/
                delay = 0;
                if(PDU_NUM == DEB_FEN && PDU_NUM != 1){
                /*flow complet*/
                    trame2.anim(-1).changeName("ACK" + PDU_NUM);
                    cons.add("Envoie ACK" + PDU_NUM);
                    delay = ANIMT * 2;
                }
                setTimeout(function(){
                    trame2.anim(1).changeName("PDU-DATA" + PDU_NUM);
                    cons.add("Element de protocole: PDU-DATA" + PDU_NUM);
                    PDU_NUM ++;
                    setTimeout(function(){
                        if(PDU_NUM <= NB_TRAME)
                            Ack();
                        else
                            finishTrans();
                    }, ANIMT * 2);
                }, delay);
            }
        }
    }
    $("#crcTrameNum").change(function(){
        PDU_NUM = parseInt($(this).val());
        DEB_FEN = PDU_NUM;
        cons.add("Erreur de CRC sur PDU DATA" + PDU_NUM);
        Ack();
        dial2.clearQuest()
    });
    errCrc = function(){
        if(NB_CRC < 2){
            NB_CRC ++;
            if(PDU_NUM == 0){
                cons.add("Erreur de CRC sur PDU DATA0");
                trame2.anim(-1).changeName("ACK0");
                setTimeout(function(){
                    pdu0();
                }, ANIMT * 2);
            }else{
                populateCrc();
                dial2.updateQuest("Choisissez la PDU erronée: ");
                $("#crcTrameNum").show();
            }
        }else{
            coupure("erreur");
        }
    }
    errAck = function(){
        if(NB_PERTE < 2){
            cons.add("Perte d'acquittement");
            NB_PERTE ++;
            if(PDU_NUM == 0){
                pdu0();
            }else{
                PDU_NUM = DEB_FEN - TAILLE_FEN;
                DEB_FEN = PDU_NUM;
                Ack();
            }
        }else{
            coupure("inactivité");
        }
    }
    errPdu = function(){
        cons.add("PDU inconnue!");
        if(PDU_NUM == 0){
            trame2.anim(-1).changeName("ACK0");
            setTimeout(function(){
                pdu0();
            }, ANIMT * 2);
        }else{
            trame2.anim(-1).changeName("NACK");
            setTimeout(function(){
                PDU_NUM = DEB_FEN - TAILLE_FEN;
                DEB_FEN = PDU_NUM;
                Ack();
            }, ANIMT * 2);
        }
    }
    coupure = function(raison){
        trame1.anim(-1).changeName("T-COUPURE.indication");
        cons.add("Primitive: T-COUPURE.indication("+raison+")");
        trame2.anim(1).changeName("COUP");
        cons.add("Element de protocole: COUP("+raison+")");
        setTimeout(function(){
            trame3.anim(1).changeName("T-COUPURE.indication");
            cons.add("Primitive: T-COUPURE.indication("+raison+")");
            trame1.changeName("");
            setTimeout(function(){
                trame3.changeName("");
            }, ANIMT * 2);
        }, ANIMT * 2);
    }
    populateCrc = function(){
        $("#crcTrameNum").html("<option value=''></option>");
        for(var i = PDU_NUM - TAILLE_FEN; i < PDU_NUM; i++)
            $("#crcTrameNum").append("<option value=" + i + ">PDU-DATA" + i + "</option>");
    }
    finishTrans = function(){
        trame1.anim(-1).changeName("T-DATA.confirmation");
        cons.add("Primitive: T-DATA.confirmation()");
        trame3.anim(1).changeName("T-DATA.indication");
        cons.add("Primitive: T-DATA.indication()");
        setTimeout(function(){
            Deconnexion();
        }, ANIMT * 2);
    }
}
