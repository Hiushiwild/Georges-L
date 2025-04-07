let operation = '';
let valeurActuelle = '';
let valeurPrecedente = '';

function ajouterChiffre(chiffre) {
    if (operation === '') {
        valeurPrecedente += chiffre;
        document.getElementById("num1").value = valeurPrecedente;
    } else {
        valeurActuelle += chiffre;
        document.getElementById("num2").value = valeurActuelle;
    }
}

function setOperation(op) {
    if (valeurPrecedente === '') return;
    operation = op;
    document.getElementById("operation").value = operation;
}

function calculer() {
    if (valeurPrecedente === '' || valeurActuelle === '') return;

    let num1 = parseFloat(valeurPrecedente);
    let num2 = parseFloat(valeurActuelle);
    let resultat;

    switch (operation) {
        case '+':
            resultat = num1 + num2;
            break;
        case '-':
            resultat = num1 - num2;
            break;
        case '*':
            resultat = num1 * num2;
            break;
        case '÷':
            resultat = num2 !== 0 ? num1 / num2 : "Erreur";
            break;
        default:
            return;
    }

    document.getElementById("resultat").value = resultat;
    resetInputs(resultat);
}

function resetCalculatrice() {
    valeurActuelle = '';
    valeurPrecedente = '';
    operation = '';
    document.getElementById("num1").value = '';
    document.getElementById("num2").value = '';
    document.getElementById("operation").value = '';
    document.getElementById("resultat").value = "0";
}

function resetInputs(resultat) {
    valeurPrecedente = '';
    valeurActuelle = '';
    operation = '';
    document.getElementById("num1").value = '';
    document.getElementById("num2").value = '';
    document.getElementById("operation").value = '';
}

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal-background").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-background").classList.add("hidden");
    resetCalculatrice();
}