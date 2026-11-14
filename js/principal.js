var maximo, minimo, tamañoFuente, aumento, decremento, fuente;

maximo = 40; minimo = 10;

$(document).ready(function() {
    $("#subir").click(function() {
        tamañoFuente = $(".texto_cambiar").css("font-size");
        tamañoFuente=tamañoFuente.replace("px", "");
        if(tamañoFuente<maximo){
            aumento = parseInt(tamañoFuente)+2
            $(".texto_cambiar").css("font-size", aumento + "px");
        }
        else{
            alert("Es el tamaño máximo. Tamaño actual " + tamañoFuente);
        }
    });
     $("#bajar").click(function(){
        fuente=$(".texto_cambiar").css("font-size");
        fuente=fuente.replace("px","");
        if(fuente>minimo){
            decremento=parseInt(fuente)-2
            $(".texto_cambiar").css("font-size", decremento + "px");
        }else{
            alert("Es el tamaño minimo. Tamaño actual " + fuente);
        }
     });
});
