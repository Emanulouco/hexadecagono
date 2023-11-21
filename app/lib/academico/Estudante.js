class Estudante {
    media() {
        let media =  (4 * this.medida ** 2) * (1 / Math.tan(Math.PI / 16))
        return media;
    }

    estaAprovado() {
        return this.media() > 40;
    }

}

module.exports = Estudante;