const utils = require('./../lib/utils');
const Estudante = require('./../lib/academico/Estudante');

class EstudantesController {
    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');
    }
    
    media(req, res) {
        let corpoTexto = '';
        let i = 0;
        req.on('data', function (pedaco) {
            corpoTexto += pedaco;
            console.log(i++, corpoTexto);
        });
        req.on('end', () => {
            // chave=valor&chave2=valor2
            let query = utils.decoficarUrl(corpoTexto);
            
            console.log(query);
            let estudante = new Estudante();
            estudante.nome = query.nome;
            estudante.medida = parseFloat(query.medida);
            
            utils.renderizarEjs(res, './views/media.ejs', estudante);
        });
    }

}

module.exports = EstudantesController;