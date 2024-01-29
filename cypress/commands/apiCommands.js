const apiKey = ''; 
const apiToken = ''; 

Cypress.Commands.add('getBoardId', (boardName) => {
   return cy.wrap(
    new Cypress.Promise((resolve) => {
      cy.request({
        method: 'GET',
        url: 'https://api.trello.com/1/members/me/boards',
        qs: {
          key: apiKey,
          token: apiToken,
        },
      }).then((response) => {
     
        expect(response.status).to.equal(200);        
        const board = response.body.find((board) => board.name === boardName);// Encontra o board pelo nome na lista de boards
        resolve(board.id);

      });
    })
  );
});

Cypress.Commands.add('getCardId', (boardId, cardName) => {
  
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/boards/${boardId}/cards`,
      qs: {
        key: apiKey,
        token: apiToken,
      },
    }).then((response) => {

      expect(response.status).to.equal(200);        
      const card = response.body.find((card) => card.name === cardName);  // Encontra o card pelo nome na lista de cards
      expect(card).to.exist;

    });
  });

Cypress.Commands.add('limparMassaDados', () => {
    const boardName = 'Nome do Board de TESTE';
  
    cy.request({
      method: 'GET',
      url: 'https://api.trello.com/1/members/me/boards',
      qs: {
        key: apiKey,
        token: apiToken,
      },
    }).then((response) => {
    
      expect(response.status).to.equal(200);       
      const board = response.body.find((board) => board.name === boardName);   
    
      if (board) {
        cy.request({
          method: 'DELETE',
          url: `https://api.trello.com/1/boards/${board.id}`,
          qs: {
            key: apiKey,
            token: apiToken,
          },
        }).then((deleteResponse) => {         
          expect(deleteResponse.status).to.equal(200);
        });
      } else {     
        cy.log(`Board com o nome "${boardName}" não encontrado.`);
      }
    });
  });
