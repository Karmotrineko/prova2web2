# Prova Otávio: Passo a Passo para Configurar o Projeto

## Configuração do Back-End

1. **Baixe o projeto.**
2. **Abra um terminal integrado na pasta do back-end** e execute os seguintes comandos:

   ```bash
   npm init -y
   npm i typescript
   npm i ts
   npx tsc
   npm install express
   npm i --save-dev @types/express
   npx tsc --init
   npm install prisma --save-dev
   npx prisma init --datasource-provider sqlite

3. **Crie um arquivo .env na raiz do projeto** com o seguinte conteúdo:
   ```bash
   DATABASE_URL=file:./dev.db
   GROQ_API_KEY=(sua chave groq)
   
4. **Execute os comandos abaixo para configurar o Prisma e as dependências adicionais:**
    ```bash
    npx install
    npx prisma generate
    npm install --save groq-sdk
    npm i bcrypt
    npm i --save-dev @types/bcrypt

5. **Finalmente, inicie o servidor back-end com:**
    ```bash
    npm run dev
    
## Configuração do Front-End

1. **Baixe o archetipo do Otávio**
2. **Coloque os arquivos na pasta do projeto front-end:** Substitua os arquivos, exceto as pastas app, assets e components.
3. **Abra um terminal integrado na pasta do front-end** e execute os seguintes comandos:
    ```bash
    npm install
    npm install expo-router
    npm run web

você já vai estar dentro do projeto na tela de login.

Para demonstrar a integração com o front end podemos logar em um usuário que já existe no banco de dados do back end, como:

**Email = teste**

**Senha = 123**

Támbem podemos criar um novo usuário para adicionar o mesmo no banco de dados do back end:

Clique em cadastro, crie seu usuário.

Logando dentro do projeto teremos a tela inicial que demonstra todos os posts presentes no back end, você também pode clicar em 'ver comentários'
