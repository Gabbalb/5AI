var nome = document.getElementById("nome").value
var tagnome = document.getElementById("tagnome")
alert(nome);
function displayname(){
    tagnome.appendChild(document.createTextNode(nome));
    tagnome.appendChild(document.createElement("br"));
}
