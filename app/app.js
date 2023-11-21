const http = require('http');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [ url, queryString ] = req.url.split('?');

    if (url == '/index') {
        index(req, res);
    }
    else if (url == '/area') {
        area(req, res);
    }
    else if (url == '/autor') {
        autor(req, res);
    } 
    else {
        naoEncontrado(req, res);
    }
});

function index(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<nav> <ul><li><a href="/index">Início</a></li><li><a href="/autor">Autor</a></li></ul></nav>');
    res.write('<h1>Áreas em formatos hexadecagonais</h1>');
    res.write('<p><strong>Descrição do problema:</strong></p>');
    res.write('<p>Determine a área de uma área em forma de hexadecágono. Se a área for maior que 40 metros quadrados, é uma área grande. Se for menor que 40 metros quadrados, é uma área pequena.</p>');
    res.write('<form action="area" method="post">');
    res.write('<label>');
    res.write('<span>Nome</span>');
    res.write('<input name="nome">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>lado</span>');
    res.write('<input name="lado">');
    res.write('</label>');
    res.write('<button>Ok</button>');
    res.write('</form>');
    res.write(`</body>
    </html>`);
    res.end();
}

function area(req, res) {
    let metodo = req.method;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>area, ' + metodo + '!</h1>');

    let corpoTexto = '';
    let i = 0;
    req.on('data', function (pedaco) {
        corpoTexto += pedaco;
        console.log(i++, corpoTexto);
    });
    req.on('end', () => {
        let query = decoficarUrl(corpoTexto);
        
        console.log(query);
        let nome = query.nome;
        let lado = parseFloat(query.lado);
        let area = (4 * lado ** 2) * (1 / Math.tan(Math.PI / 16));
        res.write('<nav> <ul><li><a href="/index">Início</a></li><li><a href="/autor">Autor</a></li></ul></nav>');
        res.write('<h1>Explicação da conta</h1>');
        res.write('<p>A área de um hexadecágono regular pode ser calculada usando a fórmula:</p>');
        res.write('<p><strong>Área = (4 * lado^2) * (1 / tan(π/16))</strong></p>');
        res.write('<p><strong>lado</strong>: Comprimento de um lado do hexadecágono.</p>');
        res.write('<p><strong>π</strong>: Número Pi (aproximadamente 3.14159).</p>');
        res.write('<h1>Resposta:</h1>');
        res.write(`<p>Lado do heptadecágono inserido: ${lado}</p>`);
        res.write(`<p>Área do hexadeágono: ${area.toFixed(2)} metros quadrados</p>`);
        if (area > 40) {
            res.write('<p>Área grande</p>');
        }
        else {
            res.write('<p>Área pequena</p>');
        }
        res.write('<footer>Desenvolvido por Emanuel Lopes</footer>');
        res.write(`</body>
        </html>`);
        res.end();
    });
}

function autor(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<nav> <ul><li><a href="/index">Início</a></li><li><a href="/autor">Autor</a></li></ul></nav>');
    res.write('<h1>Autor</h1>');
    res.write('<p>Nome: Emanuel Gleydson Melo Lopes</p>');
    res.write('<h2>Formações Acadêmicas</h2>');
    res.write('<ul>');
    res.write('<li>Graduado em Matemática </li>');
    res.write('<li>Instituição: Universidade de Pernambuco</li>');
    res.write('<li>Ano: 2016</li>');
    res.write('<li>Pós-Graduação em Psicopedagogia e Supervisão Escolar</li>');
    res.write('<li>Instituição: Facudade Futura</li>');
    res.write('<li>Ano: 2016</li>');
    res.write('<li>Análise e desenvolvimento de sistemas (Cursando)</li>');
    res.write('<li>Instituição: Unifatecie</li>');
    res.write('<li>Ano: 2023</li>');
    res.write('<li>Técnico em Informática para Internet (Cursando)</li>');
    res.write('<li>Instituição: Instituto Federal do Ceará (IFCE)</li>');
    res.write('<li>Ano: 2023</li>');
    res.write('</ul>');
    res.write('<h2>Experiências Profissionais</h2>');
    res.write('<ul>');
    res.write('<li>Função: Bolsista da Biblioteca</li>');
    res.write('<li>Empresa: Escola Técnica Federal do Ceará</li>');
    res.write('<li>Ano: 1996-1998</li>');
    res.write('<li>Função: Soldado Especialista</li>');
    res.write('<li>Empresa: Força Aérea Brasileira</li>');
    res.write('<li>Ano: 1999-2001</li>');
    res.write('<li>Função: Sargento de Infantaria</li>');
    res.write('<li>Empresa: Exército Brasileiro</li>');
    res.write('<li>Ano: 2002-até hoje</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('<footer>Desenvolvido por Emanuel Lopes</footer>');
    res.write('</html>');
    res.end();
}


function naoEncontrado(req, res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Não encontrado!</h1>');
    res.write('<footer>Desenvolvido por Emanuel Lopes</footer>');
    res.write(`</body>
    </html>`);
    res.end();
}

function decoficarUrl(url) {
    let propriedades = url.split('&');
    let query = {};
    for (let propriedade of propriedades) {
        let [ variavel, valor ] = propriedade.split('=');
        query[variavel] = valor;
    }
    return query;
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});