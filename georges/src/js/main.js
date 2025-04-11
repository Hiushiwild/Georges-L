document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    function getBadgeColor(badge) {
        switch(badge) {
            case 'Dueliste':
                return 'bg-red-500';
            case 'Contrôleur':
                return 'bg-purple-500';
            case 'Initiateur':
                return 'bg-green-500';
            case 'Sentinelle':
                return 'bg-blue-500';
        }
    }

    function generateAgentCards() {
        const agents = [
            { name: "Astra", badge: "Contrôleur", img: "./static/images/cards/astra.webp", description:"L'agent ghanéen Astra canalise les énergies du cosmos pour façonner le champ de bataille à sa convenance. Avec une maîtrise complète de sa forme astrale et un talent pour la planification stratégique, elle a toujours une large avance sur ses ennemis." },
            { name: "Breach", badge: "Initiateur", img: "./static/images/cards/breach.webp", description:"Breach, le Suédois bionique, tire de puissantes décharges cinétiques pour ouvrir un chemin en territoire ennemi. Grâce aux dégâts et aux diversions ainsi provoqués, aucun combat n'est jamais en sa défaveur." },
            { name: "Brimstone", badge: "Contrôleur", img: "./static/images/cards/brimstone.webp", description:"Tout droit venu des États-Unis d'Amérique, Brimstone possède un arsenal orbital qui permet à son escouade de toujours avoir l'avantage. La précision et la fiabilité de ses compétences utilitaires font de lui un commandant sans égal sur le terrain." },
            { name: "Chamber", badge: "Sentinelle", img: "./static/images/cards/chamber.webp", description:"Aussi classe que bien équipé, le concepteur d'armes français Chamber repousse les assaillants avec une précision mortelle. Il met à profit son arsenal bien particulier pour tenir sa position et éliminer les ennemis de loin en prévoyant une solution aux défis posés par chaque stratégie." },
            { name: "Clove", badge: "Contrôleur", img: "./static/images/cards/clove.webp", description:"Clove, l'intenable Écossais·e, déstabilise l'ennemi dans le feu de l'action comme le froid de la mort. Iel sème le trouble dans les rangs ennemis, même depuis sa tombe, car sa mort ne dure jamais très longtemps." },
            { name: "Cypher", badge: "Sentinelle", img: "./static/images/cards/cypher.webp", description:"Informateur originaire du Maroc, Cypher est un véritable réseau de surveillance à lui tout seul. Il révèle tous les secrets. Il détecte toutes les manœuvres. Rien n'échappe à Cypher." },
            { name: "Deadlock", badge: "Sentinelle", img: "./static/images/cards/deadlock.webp", description:"Deadlock, l'agent spécial norvégien, déploie un éventail de nanocâbles ultra-modernes pour défendre sa position contre le plus violent des assauts. Nul n'échappe à sa vigilance, ni ne survit à sa cruelle ténacité." },
            { name: "Fade", badge: "Initiateur", img: "./static/images/cards/fade.webp", description:"Originaire de Turquie, la chasseuse de primes Fade utilise le pouvoir des cauchemars pour s'emparer des secrets ennemis. Elle traque ses cibles et révèle leurs plus grandes peurs pour mieux les briser dans l'obscurité." },
            { name: "Gekko", badge: "Initiateur", img: "./static/images/cards/gekko.webp", description:"Originaire de Los Angeles, Gekko dirige une bande de créatures chaotiques, mais très soudées. Ses amis s'occupent de disperser les ennemis, puis Gekko rassemble sa petite troupe pour recommencer." },
            { name: "Harbor", badge: "Contrôleur", img: "./static/images/cards/harbor.webp", description:"Venu de la côte indienne, Harbor déferle sur le terrain grâce à une technologie antique qui lui permet de contrôler l'eau. Il déchaîne des torrents bouillonnants et de terribles lames d'eau pour protéger ses alliés et noyer ses adversaires." },
            { name: "Iso", badge: "Dueliste", img: "./static/images/cards/iso.webp", description:"Venu de Chine et spécialiste de missions délicates, Iso se fond dans le flux de Radianite pour démanteler les réseaux ennemis. Capable de restructurer l'énergie ambiante en protection anti-balles, il ne dévie pas de la route vers son prochain duel à mort." },
            { name: "Jett", badge: "Dueliste", img: "./static/images/cards/jett.webp", description:"Représentante de sa patrie, la Corée du Sud, Jett dispose d'un style de combat basé sur l'agilité et l'esquive, qui lui permet de prendre des risques qu'elle seule peut se permettre de prendre. Elle tourne autour des affrontements et découpe ses ennemis avant même qu'ils ne s'en rendent compte." },
            { name: "Kay/0", badge: "Initiateur", img: "./static/images/cards/kayo.webp", description:"KAY/O est une machine de guerre conçue dans un but précis : neutraliser les radiants. La neutralisation des compétences ennemies réduit les possibilités de riposte des adversaires, ce qui confère un avantage décisif à son équipe." },
            { name: "Killjoy", badge: "Sentinelle", img: "./static/images/cards/killjoy.webp", description:"Véritable génie originaire d'Allemagne, Killjoy sécurise et défend les positions clés sans effort grâce à son arsenal d'inventions. Si son équipement ne suffit pas à arrêter l'ennemi, ce sont les entraves de ses robots qui en feront du menu fretin." },
            { name: "Neon", badge: "Dueliste", img: "./static/images/cards/neon.webp", description:"L'agent philippin, Neon, s'élance vers l'avant à une vitesse fulgurante, libérant de grosses décharges de radiance biomagnétique générées frénétiquement par son corps. Elle se lance à la poursuite des ennemis qui n'ont pas le temps de s'y préparer et les élimine aussi vite que l'éclair. " },
            { name: "Omen", badge: "Contrôleur", img: "./static/images/cards/omen.webp", description:"Véritable fantôme d'un souvenir, Omen chasse dans les ténèbres. Il aveugle les ennemis, se téléporte d'un bout à l'autre du champ de bataille et laisse la peur se répandre parmi ses adversaires qui se demandent qui sera sa prochaine victime." },
            { name: "Phoenix", badge: "Dueliste", img: "./static/images/cards/phoenix.webp", description:"En provenance du Royaume-Uni, Phoenix illumine le champ de bataille avec ses pouvoirs astraux et son style de combat flamboyant. Peu importe que les renforts arrivent ou non, il fonce au combat quand il le décide." },
            { name: "Raze", badge: "Dueliste", img: "./static/images/cards/raze.webp", description:"Armée de sa personnalité et de sa grosse artillerie, Raze fait une entrée explosive depuis le Brésil. Grâce à sa force brute, elle excelle à débusquer les ennemis retranchés et à faire le ménage dans les espaces étroits, le tout avec une bonne dose de \"boum\"" },
            { name: "Reyna", badge: "Dueliste", img: "./static/images/cards/reyna.webp", description:"Originaire du cœur du Mexique, Reyna est une experte des combats singuliers qui se renforce à chaque élimination qu'elle réussit. Son efficacité n'est limitée que par son habileté, ce qui la rend très dépendante de ses propres performances." },
            { name: "Sage", badge: "Sentinelle", img: "./static/images/cards/sage.webp", description:"Véritable pilier originaire de Chine, Sage assure sa sécurité et celle de son équipe où qu'elle aille. Elle peut réanimer ses alliés tombés au combat et repousser les assauts ennemis pour offrir des oasis de tranquillité sur un champ de bataille infernal." },
            { name: "Skye", badge: "Initiateur", img: "./static/images/cards/skye.webp", description:"Originaire d'Australie, Skye et sa bande de bêtes sauvages ouvrent la voie à travers les territoires hostiles. Grâce à ses créations qui entravent l'ennemi et à sa faculté à soigner les autres, l'équipe est plus forte et plus en sécurité quand elle compte Skye dans ses rangs" },
            { name: "Sova", badge: "Initiateur", img: "./static/images/cards/sova.webp", description:"Né dans l'hiver éternel de la toundra russe, Sova traque, trouve et élimine ses ennemis avec une efficacité et une précision redoutables. Ses incroyables talents d'éclaireur et son arc personnalisé lui garantissent que sa cible ne fuira jamais très longtemps." },
            { name: "Tejo", badge: "Initiateur", img: "./static/images/cards/tejo.webp", description:"Originaire de Colombie, Tejo est un conseiller vétéran dans le domaine du renseignement. Son système de guidage balistique force les ennemis à perdre du terrain, voire la vie. Ses frappes chirurgicales lui permettent de garder les ennemis sous son emprise." },
            { name: "Viper", badge: "Contrôleur", img: "./static/images/cards/viper.webp", description:"Viper est une chimiste américaine qui déploie un arsenal d'appareils toxiques pour contrôler le champ de bataille et entraver la vision des ennemis. Si les toxines ne suffisent pas à abattre sa proie, ses machinations finiront le travail." },
            { name: "Vyse", badge: "Sentinelle", img: "./static/images/cards/vyse.webp", description:"La génie du métal Vyse utilise le métal liquide pour isoler, piéger et désarmer ses ennemis. Par la ruse et la manipulation, elle force tous ses adversaires à craindre le champ de bataille lui-même." },
            { name: "Waylay", badge: "Dueliste", img: "./static/images/cards/waylay.webp", description:"Waylay, la prismatique radiante de Thaïlande, se transforme en particules de lumière pour filer sur le champ de bataille. Elle frappe ses cibles à l'aide d'éclats de lumière avant de se remettre à l'abri, le tout en un clin d'œil." },
            { name: "Yoru", badge: "Dueliste", img: "./static/images/cards/yoru.webp", description:"Le Japonais Yoru perce des trous dans la réalité pour s'infiltrer derrière les lignes ennemies sans se faire repérer. En faisant preuve d'autant de ruse que d'agressivité, il prend ses cibles par surprise avant qu'elles n'aient le temps de se retourner." }
        ];

        const agentCards = agents.map(agent => {
            const badgeColor = getBadgeColor(agent.badge);
            return `
                <div class="agent-card bg-gray-800 text-white p-4 rounded-lg">
                    <img src="${agent.img}" alt="${agent.name}" class="w-full h-48 object-cover rounded-lg" style="object-position: 0 15%">
                    <h3 class="text-xl mt-2 flex items-center">
                        ${agent.name}
                        <!-- Badge avec plus de padding et bords arrondis -->
                        <div class="badge ${badgeColor} text-white ml-2 px-2 rounded-full text-base">${agent.badge}</div>
                    </h3>
                    <button class="description-btn mt-2 bg-blue-500 text-white px-4 py-2 rounded" onclick="toggleDescription('${agent.name}')">Voir plus ⬇️</button>
                    <p id="description-${agent.name}" class="mt-2 text-sm text-gray-300 hidden">${agent.description}</p>
                </div>
            `;
        }).join('');

        document.getElementById("agents").innerHTML = agentCards;
    }
    
    window.toggleDescription = (agentName) => {
        const description = document.getElementById(`description-${agentName}`);
        description.classList.toggle('hidden');
    };

    generateAgentCards();
    
    function generateCarousel() {
        const maps = [
            { img: "./static/images/carousel/haven.avif", detailedImg: "./static/images/carousel/maphaven.png", name: "Haven", id: "slide1" },
            { img: "./static/images/carousel/bind.avif", detailedImg: "./static/images/carousel/mapbind.png", name: "Bind", id: "slide2" },
            { img: "./static/images/carousel/split.avif", detailedImg: "./static/images/carousel/mapsplit.png", name: "Split", id: "slide3" },
            { img: "./static/images/carousel/ascent.avif", detailedImg: "./static/images/carousel/mapascent.png", name: "Ascent", id: "slide4" },
            { img: "./static/images/carousel/icebox.avif", detailedImg: "./static/images/carousel/mapicebox.png", name: "Icebox", id: "slide5" },
            { img: "./static/images/carousel/breeze.avif", detailedImg: "./static/images/carousel/mapbreeze.png", name: "Breeze", id: "slide6" },
            { img: "./static/images/carousel/fracture.avif", detailedImg: "./static/images/carousel/mapfracture.png", name: "Fracture", id: "slide7" },
            { img: "./static/images/carousel/pearl.avif", detailedImg: "./static/images/carousel/mappearl.png", name: "Pearl", id: "slide8" },
            { img: "./static/images/carousel/lotus.avif", detailedImg: "./static/images/carousel/maplotus.png", name: "Lotus", id: "slide9" },
            { img: "./static/images/carousel/abyss.avif", detailedImg: "./static/images/carousel/mapabyss.png", name: "Abyss", id: "slide10" },
            { img: "./static/images/carousel/sunset.avif", detailedImg: "./static/images/carousel/mapsunset.png", name: "Sunset", id: "slide11" },
        ];
    
        const carouselItems = maps.map((map, index) => {
            const nextSlide = maps[(index + 1) % maps.length];
            const prevSlide = maps[(index - 1 + maps.length) % maps.length];
    
            return `
                <div id="${map.id}" class="carousel-item relative w-full group" data-detailed-img="${map.detailedImg}">
                    <img src="${map.img}" class="w-full map-image" alt="${map.name}" />
                    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#${prevSlide.id}" class="btn btn-circle">❮</a>
                        <a href="#${nextSlide.id}" class="btn btn-circle">❯</a>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 text-center p-4 bg-opacity-50 bg-black text-white">${map.name}</div>
                </div>
            `;
        }).join('');
    
        document.getElementById("carouselContainer").innerHTML = carouselItems;
    
        const carouselItemsDOM = document.querySelectorAll('.carousel-item');
        carouselItemsDOM.forEach(item => {
            const image = item.querySelector('img');
            const detailedImg = item.getAttribute('data-detailed-img');
    
            item.addEventListener('mouseenter', function () {
                image.style.filter = 'blur(5px)';
    
                const detailedImageElement = document.createElement('img');
                detailedImageElement.src = detailedImg;
                detailedImageElement.classList.add('detailed-map-image');
                detailedImageElement.style.position = 'absolute';
                detailedImageElement.style.top = '50%';
                detailedImageElement.style.left = '50%';
                detailedImageElement.style.transform = 'translate(-50%, -50%)';
                detailedImageElement.style.width = '45%';
                detailedImageElement.style.height = 'auto';
                detailedImageElement.style.borderRadius = '8px';
                detailedImageElement.style.zIndex = '10';
    
                item.appendChild(detailedImageElement);
            });
    
            item.addEventListener('mouseleave', function () {
                image.style.filter = 'none';
    
                const detailedImageElement = item.querySelector('.detailed-map-image');
                if (detailedImageElement) {
                    item.removeChild(detailedImageElement);
                }
            });
        });
    }
    
    generateCarousel();

    let lastScrollTop = 0;
    const navbar = document.querySelector("nav");
    const navLinks = document.querySelectorAll('nav a');
    let isScrolling = false;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            isScrolling = true;
            
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
    
            window.scrollTo({
                top: targetElement.offsetTop - navbar.offsetHeight,
                behavior: "smooth"
            });
    
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        });
    });
    
    window.addEventListener("scroll", () => {
        if (isScrolling) return;
    
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
            navbar.style.top = "-100px";
        } else {
            navbar.style.top = "0";
        }
    
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });


    const btn = document.getElementById('start-questionnaire-btn');
    const body = document.body;
    
    function clearPage() {
        body.innerHTML = '';
        
        body.classList.remove('bg-gray-800', 'text-white');
        body.classList.add('bg-white', 'text-black');

        const questionnaireContainer = document.createElement('div');
        
        body.appendChild(questionnaireContainer);
    }
    
    btn.addEventListener('click', function() {
        clearPage();
    });

    function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        menu.classList.toggle('flex-col');
        menu.classList.toggle('space-y-4');
        menu.classList.toggle('mt-4');
      }
});
