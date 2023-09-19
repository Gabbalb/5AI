function caricaDropdown() {
    // Indica il percorso al tuo file CSV
    const csvFilePath = 'comuni.csv';

    // Seleziona l'elemento select dalla pagina HTML
    const dropdown = document.getElementById('comuniDropdown');

    // Effettua una richiesta per il file CSV
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');

            // Itera attraverso le righe del CSV
            rows.forEach(row => {
                const columns = row.split(',');
                const nomeComune = columns[0].trim();
                const codiceCatastale = columns[1].trim();

                // Crea un elemento di opzione per la dropdownlist
                const option = document.createElement('option');
                option.value = codiceCatastale;
                option.text = nomeComune;

                // Aggiungi l'opzione alla dropdownlist
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Si è verificato un errore:', error));
}

caricaDropdown()

// Chiamata alla funzione per popolare la dropdownlist


function calcola(){
    var nome = document.getElementById("nome").value
    var cognome = document.getElementById("cognome").value
    var data = document.getElementById("data").value.toString()
    var sesso = document.getElementById("sesso").value
    var luogo = document.getElementById("comuniDropdown").value

    var codice = "";
    codice += calcolaNomeCognome(nome, cognome);
    codice += calcolaAnnoCodiceFiscale(data, sesso);
    codice += calcolaMeseCodiceFiscale(data);
    codice += calcolaGiornoCodiceFiscale(data);
    codice += calcolaLuogoCF(luogo);
    codice += calcolaCarattereDiControllo(codice);
    alert(codice)
}


function calcolaNomeCognome(nome, cognome) {

    // Funzione per calcolare i caratteri indicativi del nome
    // Funzione per calcolare i caratteri indicativi del nome
    function calcolaCaratteriNome(nome) {
        // Rimuovi spazi e converti il nome in maiuscolo
        nome = nome.replace(/\s+/g, '').toUpperCase();
        const lunghezza = nome.length;
        let caratteriConsonanti = '';
        let caratteriVocali = '';

        for (let i = 0; i < lunghezza; i++) {
            const carattere = nome[i];
            if (isConsonante(carattere)) {
                caratteriConsonanti += carattere;
                if (caratteriConsonanti.length === 4) {
                    caratteriConsonanti = caratteriConsonanti[0] + caratteriConsonanti[2] + caratteriConsonanti[3];
                    break;
                }
            }
        }

        if (caratteriConsonanti.length < 3) {
            for (let i = 0; i < lunghezza; i++) {
                const carattere = nome[i];
                if (isVocale(carattere)) {
                    caratteriVocali += carattere;
                    if (caratteriVocali.length === (3 - caratteriConsonanti.length)) break;
                }
            }
        }

        let caratteriSignificativi = caratteriConsonanti;

        if (caratteriConsonanti.length < 3) {
            caratteriSignificativi += caratteriVocali;
        }

        if (caratteriSignificativi.length < 3) {
            caratteriSignificativi += 'X';
        }

        return caratteriSignificativi.toUpperCase();
    }

    // Funzione per calcolare i caratteri indicativi del cognome
    function calcolaCaratteriCognome(cognome) {
        // Rimuovi spazi e converti il cognome in maiuscolo
        cognome = cognome.replace(/\s+/g, '').toUpperCase();
        const lunghezza = cognome.length;
        let caratteriConsonanti = '';
        let caratteriVocali = '';

        for (let i = 0; i < lunghezza; i++) {
            const carattere = cognome[i];
            if (isConsonante(carattere)) {
                caratteriConsonanti += carattere;
                if (caratteriConsonanti.length === 3) break;
            }
        }

        if (caratteriConsonanti.length < 3) {
            for (let i = 0; i < lunghezza; i++) {
                const carattere = cognome[i];
                if (isVocale(carattere)) {
                    caratteriVocali += carattere;
                    if (caratteriVocali.length === (3 - caratteriConsonanti.length)) break;
                }
            }
        }

        let caratteriSignificativi = caratteriConsonanti;

        if (caratteriConsonanti.length < 3) {
            caratteriSignificativi += caratteriVocali;
        }

        if (caratteriSignificativi.length < 3) {
            caratteriSignificativi += 'X';
        }

        return caratteriSignificativi.toUpperCase();
    }


    function isConsonante(carattere) {
        return 'BCDFGHJKLMNPQRSTVWXYZ'.includes(carattere);
    }

    function isVocale(carattere) {
        return 'AEIOU'.includes(carattere);
    }

    const caratteriNome = calcolaCaratteriNome(nome);
    const caratteriCognome = calcolaCaratteriCognome(cognome);

    return caratteriCognome + caratteriNome;
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

function calcolaLuogoCF(luogo) {
    return luogo;
}

function calcolaCarattereDiControllo(inputString) {
    // Tabelle di conversione
    const tabellaCPari = {
        'A': 0, '0': 0, 'F': 5, '5': 5, 'K': 10, 'P': 15, 'U': 20,
        'B': 1, '1': 1, 'G': 6, '6': 6, 'L': 11, 'Q': 16, 'V': 21,
        'C': 2, '2': 2, 'H': 7, '7': 7, 'M': 12, 'R': 17, 'W': 22,
        'D': 3, '3': 3, 'I': 8, '8': 8, 'N': 13, 'S': 18, 'X': 23,
        'E': 4, '4': 4, 'J': 9, '9': 9, 'O': 14, 'T': 19, 'Y': 24,
        'Z': 25
    };

    const tabellaCDispari = {
        'A': 1, '0': 1, 'F': 13, '5': 13, 'K': 2, 'P': 3, 'U': 16,
        'B': 0, '1': 0, 'G': 15, '6': 15, 'L': 4, 'Q': 6, 'V': 10,
        'C': 5, '2': 5, 'H': 17, '7': 17, 'M': 18, 'R': 8, 'W': 22,
        'D': 7, '3': 7, 'I': 19, '8': 19, 'N': 20, 'S': 12, 'X': 25,
        'E': 9, '4': 9, 'J': 21, '9': 21, 'O': 11, 'T': 14, 'Y': 24,
        'Z': 23
    };

    const tabellaCheckDigit = {
        0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
        10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T',
        20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'
    };

    if (inputString.length !== 15) {
        return 'La stringa deve contenere esattamente 15 caratteri.';
    }

    let sommaPari = 0;
    let sommaDispari = 0;

    //TODO:controlla lavoro su tabelle
    for (let i = 1; i <= 15; i++) {
        const carattere = inputString[i];
        if (i % 2 === 0) { // Posizione pari
            sommaPari += tabellaCPari[carattere];
            console.log(tabellaCPari[carattere])
        } else { // Posizione dispari
            sommaDispari += tabellaCDispari[carattere];
            console.log(tabellaCDispari[carattere])
        }
    }
    const sommaTotale = sommaPari + sommaDispari;
    const restoDivisione = sommaTotale % 26;
    const carattereDiControllo = tabellaCheckDigit[restoDivisione];
    return carattereDiControllo;
}