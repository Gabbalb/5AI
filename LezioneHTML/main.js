var nome = document.getElementById("nome").value
var pws = document.getElementById("password").value
var ncart = document.getElementById("carta").value
var cvv = document.getElementById("cvv").value
var tagnome = document.getElementById("tagnome")
function displayname(){
    tagnome.appendChild(document.createTextNode("ciao, " + nome + " ecco i tuoi dati"));
    tagnome.appendChild(document.createElement("br"));
    tagnome.appendChild(document.createTextNode(nome));
    tagnome.appendChild(document.createElement("br"));
    tagnome.appendChild(document.createTextNode(pws));
    tagnome.appendChild(document.createElement("br"));
    tagnome.appendChild(document.createTextNode(ncart));
    tagnome.appendChild(document.createElement("br"));
    tagnome.appendChild(document.createTextNode(cvv));
    tagnome.appendChild(document.createElement("br"));
    visualizza_immagine();
}

function visualizza_immagine()
{
    var immagine = document.createElement('img')
    immagine.setAttribute('src', "img/therock.gif")
    immagine.setAttribute("width", "600")
    immagine.setAttribute("height", "200")
    tagnome.appendChild(immagine)
}
