import '../commands/apiCommands';
describe('Testes Trello', ()=> {
  let boardId;
  const boardName = 'Nome do Board de TESTE';
  const cardList = 'Lista de Testes TC002';
  const cardName = 'Card de Teste';
  
    it('TC001 Cadastrar um board', () => {
        cy.fazerLogin()
        cy.get('[data-testid="AddIcon"]').click()
        cy.get('[data-testid="header-create-board-button"]').click()
        cy.get('[data-testid="create-board-title-input"]').type(boardName)
        cy.get('[data-testid="create-board-submit-button"]').click()    
        cy.wait(5000)
        cy.getBoardId(boardName).then((id) => {  // pega o id e verifica se o board foi criado com status 200
          boardId = id;         
        });      
        
      })

    it('TC002 Cadastrar uma Lista', () => {
        cy.fazerLogin()
        cy.acessarBoard()        
        cy.get('[data-testid="list-composer-button"]').click()
        cy.get('[data-testid="list-name-textarea"]').type(cardList)
        cy.get('[data-testid="list-composer-add-list-button"]').click()        


    })
    it('TC003 Cadastrar um Card', () => {
      cy.fazerLogin()
      cy.acessarBoard()        
      cy.get('[data-testid="list-add-card-button"]').click()
      cy.get('[data-testid="list-card-composer-textarea"]').type("Card de Teste")
      cy.get('[data-testid="list-card-composer-add-card-button"]').click()
      cy.wait(5000)
      cy.getCardId(boardId, cardName);  //verifica se o card foi criado pela API e valida retorno 200


  })
   it('TC004 Excluir Card', () => {
      cy.fazerLogin()
      cy.acessarBoard()        
      cy.get('[data-testid="card-name"]').click()
      cy.contains('Arquivar').click()
      cy.contains('Excluir').click()
      cy.get('[class="js-confirm full nch-button nch-button--danger"]').click()
})
})

describe('Limpar Massa de Dados', () => {
  it('Excluir Board Todo', () => {
    cy.limparMassaDados();
  })
})


Cypress.Commands.add('fazerLogin', () => {

    cy.visit('https://www.trello.com')
    cy.contains('Log in').click()        
        cy.origin('https://id.atlassian.com', () => {
            const email = ''
            const senha = ''
            cy.get('input[placeholder="Insira seu e-mail"]').type(email)
            cy.contains('Continuar').click()
            cy.get('input[placeholder="Digitar senha"]').type(senha)
            cy.contains('Entrar').click()     

})
})

Cypress.Commands.add('acessarBoard', () => {
    cy.get('[title="Nome do Board de TESTE"]').click({ multiple: true })
})