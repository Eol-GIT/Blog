const resources = {
    en: {
        translation: {
            otherProjectsText: "Other projects",
            hereText: "here",
            linkToProjectText: "Link to the project can be found",
            cyberCityIntro: "Is a website that I did for a company that wanted to sell technology services to people.",
            technologiesUsedText: "The technologies that were used in {{projectName}} are",
            pythonText: "that handled all the backend logic {{extra}}",
            sqliteText: "as a database to store data {{extra}}",
            javascriptText: "that handled all the frontend logic {{extra}}",
            cssText: "was used for UI design {{extra}}",
            selectText: "Select",
            configText: "Configuration",
            selectOneText: "Please select one",
            movieFreaksIntro: "Is a website for streaming movies online for FREE. This project took me 5-6 months to complete totally.",
            dinoGameIntro: "Is a desktop application game that is a replication of chrome's dino game made with Python, with a few features added like turning on/off the music, pressing the p key to pause and start and play again screens.",
            sprinterText: "was used to create all the sprints for the game",
            towerWarIntro: "Is a desktop application game, where you place towers to defeat the monsters that are coming. There are three difficulties with twenty levels for each. If you beat them all you win.",
            eCommerceIntro: "Is an e-commerce website for purchasing store products online. This was made for a customer in Kosovo for his business.",
            sqLanguage: "Albanian Language",
            enLanguage: "English Language",

        },
    },
    sq: {
        translation: {
            otherProjectsText: "Projekte të tjera",
            hereText: "këtu",
            linkToProjectText: "Linku për tek projekti mund të gjendet",
            cyberCityIntro: "Është një faqe interneti që e bëra për një kompani që donte t'u shiste shërbime teknologjike njerëzve.",
            technologiesUsedText: "Teknologjitë që janë përdorur në {{projectName}} janë",
            pythonText: "që trajtonte të gjithë logjikën e backend-it {{extra}}",
            sqliteText: "si një databazë për ruajtjen e të dhënave {{extra}}",
            javascriptText: "që trajtonte të gjithë logjikën e frontend-it {{extra}}",
            cssText: "është përdorur për dizajn të UI {{extra}}",
            selectText: "Zgjedh",
            configText: "Konfigurimi",
            selectOneText: "Ju lutemi zgjidhni një",
            movieFreaksIntro: "Është një faqe interneti për transmetimin e filmave në internet FALAS. Ky projekt më mori 5-6 muaj për ta përfunduar plotësisht.",
            dinoGameIntro: "Është një lojë aplikacioni desktop që është një kopje e lojës dino të chrome e punuar me Python, me disa veçori të shtuara si ndezja/fikja e muzikës, shtypja e tastit p për të ndalur dhe për të nisur dhe riprodhuar ekranet.",
            sprinterText: "u përdor për të krijuar të gjitha sprintet për lojën",
            towerWarIntro: "Është një lojë aplikacioni desktop, ku vendosni kulla për të mposhtur përbindëshat që po vijnë. Ka tre vështirësi me njëzet nivele për secilin. Nëse i mposhtni të gjithë, fitoni.",
            eCommerceIntro: "Është një faqe interneti e-commerce për blerjen e produkteve të dyqaneve në internet. Kjo është bërë për një klient në Kosovë për biznesin e tij.",
            sqLanguage: "Gjuha Shqipe",
            enLanguage: "Gjuha Angleze",
        },
    },
  };
const setLocale = (language) => {
    i18next.init({
      fallbackLng: ["en"],
      lng: language,
      resources,
    });
};
var url = new URL(window.location.href);
setLocale(localStorage.getItem("ln"))