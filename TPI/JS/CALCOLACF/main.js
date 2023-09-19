

function calcola(){
    var nome = document.getElementById("nome").value
    var cognome = document.getElementById("cognome").value
    var data = document.getElementById("data").value.toString()
    var sesso = document.getElementById("sesso").value
    var luogo = document.getElementById("luogo").value

    var codice = "";
    codice += calcolaNomeCodiceFiscale(nome, cognome);
    codice += calcolaAnnoCodiceFiscale(data, sesso);
    codice += calcolaMeseCodiceFiscale(data);
    codice += calcolaGiornoCodiceFiscale(data);
    alert(codice)


}

function calcolaNomeCodiceFiscale(nome, cognome) {
    const vocali = "AEIOU";
    const consonantiRegex = /[BCDFGHJKLMNPQRSTVWXYZ]/;

    // Funzione per estrarre le consonanti da una stringa
    function estraiConsonanti(str) {
        let consonanti = '';
        for (let i = 0; i < str.length; i++) {
            const carattere = str[i];
            if (consonantiRegex.test(carattere)) {
                consonanti += carattere;
            }
        }
        return consonanti;
    }

    // Estrai le consonanti dal cognome e dal nome
    const consonantiCognome = estraiConsonanti(cognome.toUpperCase());
    const consonantiNome = estraiConsonanti(nome.toUpperCase());

    // Componi il codice fiscale
    let codiceFiscale = '';

    if (consonantiCognome.length >= 3) {
        codiceFiscale += consonantiCognome.slice(0, 3);
    } else {
        codiceFiscale += consonantiCognome;
        for (let i = 0; i < 3 - consonantiCognome.length; i++) {
            const vocale = vocali[i];
            codiceFiscale += vocale;
        }
    }

    if (consonantiNome.length >= 3) {
        codiceFiscale += consonantiNome.slice(0, 3);
    } else {
        codiceFiscale += consonantiNome;
        for (let i = 0; i < 3 - consonantiNome.length; i++) {
            const vocale = vocali[i];
            codiceFiscale += vocale;
        }
    }

    // Restituisci i primi 6 caratteri del codice fiscale
    return codiceFiscale.slice(0, 6).toUpperCase();
}

function calcolaAnnoCodiceFiscale(data, sesso){
    var anno = data.substr(2, 2)
    anno = parseInt(anno);
    anno = anno + parseInt(sesso);
    if (anno < 10){
        return "0" + anno.toString();
    }
    return anno.toString();
}

function calcolaMeseCodiceFiscale(data){
   var mese = data.substr(5,2);
   var lettere = ["A","B","C","D","E","F","G","H","I","J","K"];
   var mesei = parseInt(mese);
   return lettere[mesei - 1];
}

function calcolaGiornoCodiceFiscale(data){
    var giorno = data.substr(8,2);
    return giorno;
}