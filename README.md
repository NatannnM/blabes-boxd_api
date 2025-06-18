Para rodar o projeto corretamente, é necessário seguir alguns passos, que são:
- Baixar ou Clonar o repositório;
- Caso ocorra qualquer problema de biblioteca, instale elas no terminal com "npm install -g @nestjs/cli" e "npm add pg reflect-metadata typeorm @nestjs/typeorm"
- Criar o banco com o nome “blabesboxd”;
- Ao abrir o projeto e com o terminar aberto na raiz dele, execute o comando “npm run typeorm-default -- migration:run” para criar as tabelas;
- Após criar as tabelas, execute a seed com o comando “npm run typeorm-seed -- migration:run”, para povoar o banco de dados;
- Atenção a etapa anterior, pois ela é essencial para o uso das collections posteriormente;
- Abra o Postman, e importe a collection “BlabesBoxd_Collection.postman_collection” que está na raiz do projeto;
- É recomendável começar a executar as requests pela ordem: Gêneros, Diretor, Estudios, Filmes, Usuarios e por fim Autenticação. Pois algumas das requests levam em conta alterações já realizadas anteriormente. Como por exemplo, o cadastro do novo usuário, que leva em conta o filme cadastrado no request do Filmes;
- As regras de negócio foram criadas e estão no fim do service de cada entidade.

