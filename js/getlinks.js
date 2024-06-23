async function getLinks() {
    try {
        // Carrega o conteúdo do arquivo
        const response = await fetch('https://rodrigograc4.github.io/ApexHub/API/streaming.txt');
        const content = await response.text();
        // Divide o conteúdo por linhas
        const lines = content.split('\n');

        // Inicializa arrays para armazenar os links filtrados
        let f1GrandPrixLinks = [];
        let englishLinks = [];
        let italianLinks = [];
        let portugueseLinks = [];
        let brazilianLinks = [];

        lines.forEach(line => {
            //Grand Prix
            if (line.includes('F1') && line.includes('Grand Prix')) {
                const url = line.match(/https:\/\/\S+/g);
                if (url) {
                    f1GrandPrixLinks.push(url[0]);
                    console.log('Link encontrado:', url[0]);
                }
            }
            //Qualifying
            else if (line.includes('F1') && line.includes('Qualifying')) {
                const url = line.match(/https:\/\/\S+/g);
                if (url) {
                    f1GrandPrixLinks.push(url[0]);
                    console.log('Link encontrado:', url[0]);
                }
            }
            //Practice 3
            else if (line.includes('F1') && line.includes('Practice 3')) {
                const url = line.match(/https:\/\/\S+/g);
                if (url) {
                    f1GrandPrixLinks.push(url[0]);
                    console.log('Link encontrado:', url[0]);
                }
            }
            //Practice 2
            else if (line.includes('F1') && line.includes('Practice 2')) {
                const url = line.match(/https:\/\/\S+/g);
                if (url) {
                    f1GrandPrixLinks.push(url[0]);
                    console.log('Link encontrado:', url[0]);
                }
            }
        });

        // Filtra os links que terminam com os sufixos específicos
        f1GrandPrixLinks.forEach(link => {
            if (link.endsWith('hd1.php')) {
                englishLinks.push(link);
            } else if (englishLinks.length === 0 && link.endsWith('hd2.php')) {
                englishLinks.push(link);
            } else if (englishLinks.length === 0 && link.endsWith('hd3.php')) {
                englishLinks.push(link);
            } else if (englishLinks.length === 0 && link.endsWith('hd4.php')) {
                englishLinks.push(link);
            } else if (englishLinks.length === 0 && link.endsWith('hd5.php')) {
                englishLinks.push(link);
            } else if (link.endsWith('hd8.php')) {
                italianLinks.push(link);
            } else if (italianLinks.length === 0 && link.endsWith('hd7.php')) {
                italianLinks.push(link);
            } else if (link.endsWith('sporttv4.php')) {
                portugueseLinks.push(link);
            } else if (link.endsWith('br4.php')) {
                brazilianLinks.push(link);
            } else if (brazilianLinks.length === 0 && link.endsWith('br5.php')) {
                brazilianLinks.push(link);
            }
        });
    
    if (englishLinks.length === 0) {
        englishLinks.push("https://v3.sportsonline.si/channels/hd/hd1.php");
    }

    if (portugueseLinks.length === 0) {
        portugueseLinks.push("https://v3.sportsonline.si/channels/pt/sporttv4.php");
    }

    // Armazena os links no localStorage
    localStorage.setItem('English', JSON.stringify(englishLinks));
    localStorage.setItem('Portuguese', JSON.stringify(portugueseLinks));
    localStorage.setItem('Brazilian', JSON.stringify(brazilianLinks));
    localStorage.setItem('Italian', JSON.stringify(italianLinks));

    // Verifica se há links e desativa botões se não houver
    function checkLinksAndDisable() {
        disableButton('English', englishLinks);
        disableButton('Portuguese', portugueseLinks);
        disableButton('Brazilian', brazilianLinks);
        disableButton('Italian', italianLinks);
    }

    // Desativa botão se não houver links disponíveis
    function disableButton(key, links) {
        const button = document.getElementById(`${key}-btn`);
        if (!links || links.length === 0) {
            button.classList.add('disabled');
        }
    }

    checkLinksAndDisable();

    } catch (error) {
        console.log('Erro ao carregar o arquivo:', error);
    }
}


getLinks();