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

    it('Se asegura de que las imagenes esten ocultas al cargar la pagina', () => {
      cy.get('.imagen').each( (imagen) => {
        cy.wrap(imagen).should('have.class', 'ocultar');
      });
    }
    );

  })

  describe('Al comenzar el juego', () => {
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

  describe('Al comenzar el juego', () => {
    before(() => {
      cy.visit(URL);
    });

    let mapaDePares, listaDePares;
    
    it('Comprueba que haya un par de cada imagen', () => {
      cy.get('.imagen').then((imagenes) => {
        mapaDePares = new Map();
        listaDePares = [];
        imagenes.each( (imagen) => {
          let src = imagen.src;
          if (mapaDePares.has(src)) {
            let cantidad = mapaDePares.get(src);
            mapaDePares.set(src, cantidad + 1);
          } else {
            mapaDePares.set(src, 1);
          }
        });
        mapaDePares.forEach((value, key) => {
          if (value === 2) {
            listaDePares.push(key);
          }
        });
      });
    });

  });

  describe('Al terminar el juego', () => {
    before(() => {
      cy.visit(URL);
    });

    it('Se asegura de que las imagenes esten ocultas al terminar el juego', () => {
      cy.get('.imagen').each( (imagen) => {
        cy.wrap(imagen).should('have.class', 'ocultar');
      });
    });
  });


});
