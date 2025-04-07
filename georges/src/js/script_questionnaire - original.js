document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('start-questionnaire-btn');
    const bruteForceBtn = document.getElementById('brute-force-btn');

    bruteForceBtn.style.display = 'none';

    btn.addEventListener('click', function() {
        document.body.innerHTML = '';
        afficherQuestion();
        bruteForceBtn.style.display = 'inline-block';
        
        ajouterBoutons();
    });

    function ajouterBoutons() {
        const btnRetour = document.createElement("button");
        btnRetour.textContent = "Retour à la page de base";
        btnRetour.style.position = "fixed";
        btnRetour.style.top = "1rem";
        btnRetour.style.left = "1rem";
        btnRetour.style.padding = "0.5rem 2rem";
        btnRetour.style.fontSize = "1rem";
        btnRetour.style.backgroundColor = "#3498db";
        btnRetour.style.color = "#fff";
        btnRetour.style.border = "none";
        btnRetour.style.borderRadius = "8px";
        btnRetour.style.cursor = "pointer";
        btnRetour.style.transition = "background-color 0.3s";
        btnRetour.onmouseover = () => btnRetour.style.backgroundColor = "#2980b9";
        btnRetour.onmouseout = () => btnRetour.style.backgroundColor = "#3498db";
        btnRetour.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        const btnRecommencer = document.createElement("button");
        btnRecommencer.textContent = "Recommencer le test";
        btnRecommencer.style.position = "absolute";
        btnRecommencer.style.top = "2rem";
        btnRecommencer.style.left = "calc(100% - 220px)";
        btnRecommencer.style.padding = "0.5rem 2rem";
        btnRecommencer.style.fontSize = "1rem";
        btnRecommencer.style.backgroundColor = "#e67e22";
        btnRecommencer.style.color = "#fff";
        btnRecommencer.style.border = "none";
        btnRecommencer.style.borderRadius = "8px";
        btnRecommencer.style.cursor = "pointer";
        btnRecommencer.style.transition = "background-color 0.3s";
        btnRecommencer.onmouseover = () => btnRecommencer.style.backgroundColor = "#d35400";
        btnRecommencer.onmouseout = () => btnRecommencer.style.backgroundColor = "#e67e22";
        btnRecommencer.addEventListener("click", () => {
            reponsesUtilisateur = [];
            index = 0;
            afficherQuestion();
        });

        document.body.appendChild(btnRetour);
        document.body.appendChild(btnRecommencer);
    }

    function afficherQuestion() {
        const existingContainer = document.getElementById("questionnaire-container");
        if (existingContainer) {
            existingContainer.remove();
        }

        if (index < questionnaire.length) {
            const container = document.createElement("div");
            container.id = "questionnaire-container";
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";
            container.style.paddingTop = "2rem";
            container.style.paddingBottom = "2rem";
            container.style.textAlign = "center";
            container.style.padding = "1rem";

            const questionDiv = document.createElement("div");
            questionDiv.id = "question";
            questionDiv.textContent = questionnaire[index].qlabel;
            questionDiv.style.fontSize = "2rem";
            questionDiv.style.fontWeight = "bold";
            questionDiv.style.marginBottom = "1.5rem";

            const imgContainer = document.createElement("div");
            imgContainer.id = "imageContainer";
            if (questionnaire[index].image) {
                let img = document.createElement("img");
                img.src = questionnaire[index].image;
                img.alt = "Illustration de la question";
                img.style.maxWidth = "600px";
                img.style.width = "100%";
                img.style.borderRadius = "12px";
                img.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
                img.style.marginBottom = "1rem";
                imgContainer.appendChild(img);
            }

            const optionsDiv = document.createElement("div");
            optionsDiv.id = "options";
            optionsDiv.style.display = "flex";
            optionsDiv.style.flexDirection = "row";
            optionsDiv.style.justifyContent = "center";
            optionsDiv.style.gap = "1rem";
            optionsDiv.style.flexWrap = "wrap";
            optionsDiv.style.marginTop = "2rem";
            optionsDiv.style.width = "100%";
            optionsDiv.style.maxWidth = "1000px";

            questionnaire[index].reponses.forEach(rep => {
                let btn = document.createElement("button");
                btn.onclick = () => enregistrerReponse(rep.rid);
                btn.style.width = "200px";
                btn.style.height = "200px";
                btn.style.display = "flex";
                btn.style.flexDirection = "column";
                btn.style.alignItems = "center";
                btn.style.justifyContent = "center";
                btn.style.fontSize = "1.2rem";
                btn.style.fontWeight = "600";
                btn.style.border = "2px solid #ccc";
                btn.style.borderRadius = "12px";
                btn.style.backgroundColor = "#f9f9f9";
                btn.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                btn.style.transition = "all 0.2s ease";
                btn.style.cursor = "pointer";

                btn.onmouseover = () => btn.style.backgroundColor = "#e6e6e6";
                btn.onmouseout = () => btn.style.backgroundColor = "#f9f9f9";

                if (rep.image) {
                    const img = document.createElement("img");
                    img.src = rep.image;
                    img.alt = rep.rlabel;
                    img.style.maxWidth = "150px";
                    img.style.maxHeight = "150px";
                    img.style.marginBottom = "0.5rem";
                    img.style.borderRadius = "8px";
                    btn.appendChild(img);
                }

                const label = document.createElement("span");
                label.textContent = rep.rlabel;
                btn.appendChild(label);

                optionsDiv.appendChild(btn);
            });

            container.appendChild(questionDiv);
            container.appendChild(imgContainer);
            container.appendChild(optionsDiv);
            document.body.appendChild(container);
        } else {
            afficherResultat();
        }
    }

    function enregistrerReponse(id) {
        let qid = questionnaire[index].qid;
        let rid = id;
        reponsesUtilisateur.push(`A${qid}_${rid}`);
        index++;
        afficherQuestion();
    }

    function afficherResultat() {
        let score = 0;
        reponsesUtilisateur.forEach((reponse, idx) => {
            if (reponse === `A${questionnaire[idx].qid}_${questionnaire[idx].bonneReponse}`) {
                score++;
            }
        });

        const userAnswers = reponsesUtilisateur.join("_");
        const resultPage = `${userAnswers}.html`;

        document.body.innerHTML = "";

        const messageBox = document.createElement("div");
        messageBox.style.display = "flex";
        messageBox.style.flexDirection = "column";
        messageBox.style.justifyContent = "center";
        messageBox.style.alignItems = "center";
        messageBox.style.height = "100vh";
        messageBox.style.fontSize = "1.5rem";
        messageBox.style.textAlign = "center";
        messageBox.innerHTML = `
            <p>Merci d'avoir effectué ce test.<br>Voici vos réponses : <strong>${userAnswers}</strong></p>
            <p style="margin-top: 1rem;">Nous sommes en train de vérifier vos réponses...</p>
            <span class="loading loading-dots loading-xl"></span>
        `;
        document.body.appendChild(messageBox);

        setTimeout(() => {
            if (score === questionnaire.length) {
                messageBox.innerHTML = `
                    <p style="font-size: 1.2rem;">Bravo, vous avez eu toutes les bonnes réponses !</p>
                    <br>
                    <img src="./static/images/questionnaire/loading_gif.gif" alt="Redirection..." style="max-width: 400px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                `;
                setTimeout(() => {
                    window.location.href = resultPage;
                }, 6500);
            } else {
                messageBox.innerHTML = `
                    <p style="font-size: 1.2rem;">Nous sommes désolés, mais vous ne connaissez pas assez bien Valorant pour envoyer des messages...</p>
                    <br>
                    <img src="./static/images/questionnaire/spiderman.gif" alt="Redirection..." style="max-width: 400px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                `;
                setTimeout(() => {
                    alert("Vous allez être redirigé vers la page principale");
                    window.location.href = "index.html";
                }, 3000);
            }
        },5000);
    }

    let index = 0;
    let reponsesUtilisateur = [];

    const questionnaire = [
        {
            qlabel: 'Qui est le meilleur agent ?',
            qid:1,
            image: './static/images/questionnaire/question1.png',
            reponses: [
                { rid: 1, rlabel: 'Raze', image: './static/images/questionnaire/raze.webp' },
                { rid: 2, rlabel: 'Chamber', image: './static/images/questionnaire/chamber.webp' },
                { rid: 3, rlabel: 'Jett', image: './static/images/questionnaire/jett.webp' },
                { rid: 4, rlabel: 'Waylay', image: './static/images/questionnaire/waylay.webp' }
            ],
            bonneReponse: 3
        },
        {
            qlabel: 'Quel est la meilleure collection d\'arme ?',
            qid:2,
            image: './static/images/questionnaire/question2.png',
            reponses: [
                { rid: 1, rlabel: 'Kuronami', image: './static/images/questionnaire/kuronami.webp' },
                { rid: 2, rlabel: 'Oni', image: './static/images/questionnaire/oni.webp' },
                { rid: 3, rlabel: 'Gaia', image: './static/images/questionnaire/gaia.webp' },
                { rid: 4, rlabel: 'Prime', image: './static/images/questionnaire/prime.webp' }
            ],
            bonneReponse: 1
        },
        {
            qlabel: 'Quelle est la meilleure map ?',
            qid:3,
            image: './static/images/questionnaire/question3.png',
            reponses: [
                { rid: 1, rlabel: 'Split', image: './static/images/questionnaire/split.avif' },
                { rid: 2, rlabel: 'Haven', image: './static/images/questionnaire/haven.avif' },
                { rid: 3, rlabel: 'Bind', image: './static/images/questionnaire/bind.avif' },
                { rid: 4, rlabel: 'Ascent', image: './static/images/questionnaire/ascent.avif' }
            ],
            bonneReponse: 4
        },
    ];
});
