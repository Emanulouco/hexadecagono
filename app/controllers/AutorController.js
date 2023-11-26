const utils = require("../lib/utils")

class AutorController {
    index(req, res) {
        let autor = {
            nome: 'Emanuel',
            formacoes: [
                'Graduado em Matemática',
                'Graduando em Análise e Desenvolvimento de Sistemas'
            ]
        }

        utils.renderizarEjs(res, './views/autor.ejs', autor);
    }
}

module.exports = AutorController;