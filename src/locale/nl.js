const nl = {
    title: "TU Student Blog",
    login: {
        title: "Inloggen",
        meta: {
            ifAccount: {
                "title": "Met een account",
                "details": {
                    "emojis": "emoji-markeringen blijven bewaard in je account",
                    "exercises": "maak oefenopgaven",
                    "and": "en is er",
                    "waitingTime": "geen wachttijd"
                }
            },
            ifNoAccount: {
                "title": "Zonder een account",
                "details": {
                    "emojis": "geen toegang tot emoji-markeringen",
                    "exercises": "geen oefenopgaven",
                    "and": "en is er",
                    "waitingTime": "wachttijd van 5 seconden"
                }
            }
        }
    },
    update: "Laatst geupdate in januari 2025",
    biography: {
        main: `Momenteel volg ik de WO Bacheloropleiding Technische Informatica, ook wel bekend als Computer Science and Engineering bij een onderzoeksuniversiteit in Europa. 🇪🇺`,
        references: {
            textual: "Wat is",
            textual2: "Wikipedia zegt dat",
            textual3: "de studie is van",
            textual4: 'en',
            computerscience: "Technische Informatica",
            computation: "berekeningen",
            information: "informatie",
            automation: "automatisering"
        }   
    },
    translated: "Zoek je een vertaalde versie van deze pagina?",
    archive: "Laatste Archief",
    filter: "alle",
    substack: "Meld aan bij mijn substack voor notificaties",
    posts: [{
		title: "vwo wiskunde b",
		style: "text-purple-400 border-purple-400 bg-purple-400/10",
		posts: [
			{
				title: "Wat Is Een Functie?",
				date: "2025-01-07T20:53:04.188Z",
				slug: "what-is-a-function"
			},
			{
				title: "Wat Is Wiskundige Modellering?",
				date: "2025-01-06T20:53:04.188Z",
				slug: "what-is-mathematical-modeling"
			}
		]
	}],
    months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    days: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
	error: "Oeps, helaas niet gevonden, ga terug naar",
};

export default nl;