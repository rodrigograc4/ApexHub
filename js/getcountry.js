// URLs das APIs
let original_api = "https://ergast.com/api/f1/current/next/races.json";
let country_codes_api = "../API/countrycodes.json";

// Opções para a requisição
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// Função para obter o código do país a partir do nome do país
async function getCountryCode(countryName) {
    let result = await fetch(country_codes_api, requestOptions);
    let dt = await result.json();
    let country = dt.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.code.toLowerCase() : null;
}

// Função principal para obter a próxima corrida e exibir a bandeira
async function displayNextRaceFlag() {
    try {
        // Obter dados da próxima corrida
        let result = await fetch(original_api, requestOptions);
        let dt = await result.json();
        let data = dt.MRData;
        let nextRace = 0; // Pega a primeira corrida da lista de próximas corridas
        const countryName = data.RaceTable.Races[nextRace].Circuit.Location.country;

        // Obter o código do país e convertê-lo para minúsculas
        const countryCode = await getCountryCode(countryName);
        console.log(countryCode);

        if (countryCode) {
            // Construir a URL da bandeira
            let flagUrl = `https://flagcdn.com/256x192/${countryCode}.png`;

            // Inserir a imagem da bandeira no HTML
            let raceTextElement = document.getElementById('race-gp');
            if (raceTextElement) {
                let imgElement = document.createElement('img');
                imgElement.src = flagUrl;
                imgElement.alt = `${countryName} Flag`;
                imgElement.classList.add('country-flag');

                // Inserir a imagem antes do texto do h3
                raceTextElement.insertBefore(imgElement, raceTextElement.firstChild);
            } else {
                console.error('Elemento de texto da corrida não encontrado.');
            }
        } else {
            console.error('Código do país não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao obter dados:', error);
    }
}

// Chamar a função para exibir a bandeira
displayNextRaceFlag();
