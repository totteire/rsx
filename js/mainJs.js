$(document).ready(function(){
    /*temps du retardataire*/
    window.ANIMT = 1000;
    window.TAILLE_FEN = 4;
    window.TAILLE_FICH = 20;
    window.NOM_FICH = "fichier";
    window.TAILLE_TRAME = 2;
    window.NB_TRAME = 10;


    window.dial1 = new dialog("inputBox1");
    window.dial2 = new dialog("inputBox2");
    TrameV.prototype = new Trame();
    window.trame1 = new TrameV("trame1", 'up');
    TrameH.prototype = new Trame();
    window.trame2 = new TrameH("trame2");
    TrameV.prototype = new Trame();
    window.trame3 = new TrameV("trame3", 'down');
    window.cons = new output('console');
    window.four1 = new FournServ('bubble1');
    window.four2 = new FournServ('bubble2');

    four1.changeState("Repos");
    four2.changeState("Repos");

    $('#btnStart').click(function(){
        cons.clear();
        $('.dialEl').val('');
        Connection();
    });
    window.endAll = function(){
        $('#title').text('Merci de recharger la page pour recommencer la simulation!');
        trame2.changeName("");
        four1.changeState("Repos");
        four2.changeState("Repos");
    }
});
