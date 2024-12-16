# Introdução ao Projeto
Este projeto foi desenvolvido como parte do processo seletivo para estágio em desenvolvimento front-end. O objetivo era criar uma aplicação que permitisse gerenciar veículos, motoristas e viagens, incluindo funcionalidades de listagem, adição, edição e exclusão.
# Descrição do Projeto
A aplicação foi construída utilizando React e Tailwind CSS. Ela consiste em três principais entidades: veículos, motoristas e viagens. Cada entidade tem uma tabela para listagem, um botão flutuante para adicionar novos registros e a capacidade de editar e excluir registros existentes através de modais.
# Funcionalidades Implementadas
### Listagem de Veículos, Motoristas e Viagens: 
A aplicação busca dados de veículos, motoristas e viagens de uma API e os exibe em tabelas.
### Adição de Veículos, Motoristas e Viagens: 
Um botão flutuante permite adicionar novos registros, que são enviados para a API.
### Edição de Veículos, Motoristas e Viagens: 
Cada registro pode ser editado através de um modal que atualiza os dados na API.
### Exclusão de Veículos, Motoristas e Viagens: 
Cada registro pode ser excluído com um botão de exclusão.
### Atualizações em Tempo Real: 
Utilizei WebSockets para exibir atualizações em tempo real, usando um badge com um ícone de sino para notificar o usuário sobre novas atualizações.

# Melhorias Futuras:
## Durante o desenvolvimento deste projeto, identifiquei algumas áreas que eu poderia trabalhar melhor:
### Validação de Formulários: 
Como, por exemplo, verificar se o ID do motorista que foi informado no formulário realmente é válido.
### Responsividade: 
Embora o projeto seja responsivo, ajustes adicionais poderiam ser feitos para garantir uma melhor experiência em dispositivos móveis ou em tamanhos de tela variados.
### Estilização Consistente: 
Embora o Tailwind CSS tenha sido usado para estilizar o projeto, uma revisão para garantir que todos os componentes seguem um padrão consistente de estilização seria legal.
### Documentação Adicional: 
Adicionar documentação mais detalhada sobre como cada componente funciona e como eles interagem poderia ajudar outros desenvolvedores a entender melhor o projeto.
### Componentização: 
Criar componentes reutilizáveis para elementos como inputs, botões e outros componentes de interface poderia melhorar a modularidade e a manutenção do código.

## Introdução ao Create React App
Este projeto foi inicializado com o Create React App.
Scripts Disponíveis no diretório do projeto, você pode executar:
### npm start: 
Executa o aplicativo no modo de desenvolvimento. Abra http://localhost:3000 para visualizá-lo no seu navegador. A página será recarregada quando você fizer alterações. Você também pode ver erros de lint no console.
### npm test: 
Inicia o executor de teste no modo de observação interativo. Veja a seção sobre execução de testes para mais informações.
### npm run build: 
Cria o aplicativo para produção na pasta de compilação. Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho. A compilação é minimizada e os nomes de arquivo incluem os hashes. Seu aplicativo está pronto para ser implantado!
