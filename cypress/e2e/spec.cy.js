const URL = 'http://192.168.0.7:8080/'


context('Memotest', () => {

  describe('Comprueba al cargar la pagina', () => {
    before(() => {
      cy.visit(URL);
      });
  
    it('Se asegura de que haya la cantidad de imagenes correcta', () => {
      cy.get('.imagenes').find('.imagen').should('have.length', 20);
    });
  
  })

  describe('Comprueba al cargar la pagina', () => {
    before(() => {
      cy.visit(URL);
    });

    it('Se asegura de que las imagenes se ocultan al cargar la pagina', () => {
      cy.get('.imagen').each( (imagen) => {
        cy.wrap(imagen).should('have.class', 'ocultar');
      });
    }
    );

  })

  describe('Juego', () => {
    before(() => {
      cy.visit(URL);
    });

    it('Se asegura de que las imagenes son aleatorias', () => {
      cy.get('.imagen').then((imagenes) => {
       let imagenesOriginales = [];
       imagenes.each( (imagenes) => {
         imagenesOriginales.push(imagenes.src);
       });
 
       cy.visit(URL);
 
       let imagenesNuevas = [];
       cy.get('.imagen').then(nuevasImagenes => {
         nuevasImagenes.each( (imagen) => {
           imagenesNuevas.push(imagen.src);
         });
         cy.wrap(imagenesOriginales).should('not.equal', imagenesNuevas);
       });
     });
   });

  })



})