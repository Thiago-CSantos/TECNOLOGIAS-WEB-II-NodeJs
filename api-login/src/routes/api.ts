/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *     FavoriteDTO:
 *       type: object
 *       required:
 *         - id_user
 *         - urlNew
 *         - urlImage
 *         - title
 *       properties:
 *         id_user:
 *           type: string
 *           description: ID do usuário
 *         urlNew:
 *           type: string
 *           description: URL da notícia
 *         urlImage:
 *           type: string
 *           description: URL da imagem
 *         title:
 *           type: string
 *           description: Título da notícia
 *     NewsResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         totalResults:
 *           type: number
 *         articles:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               urlToImage:
 *                 type: string
 *               publishedAt:
 *                 type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: object
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - emailPost
 *         - senhaPost
 *       properties:
 *         emailPost:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: usuario@email.com
 *         senhaPost:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *           example: "123456"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token para autenticação
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     LoginError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *           example: "Invalid credentials"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuário
 *     description: Realiza o login do usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             emailPost: "usuario@email.com"
 *             senhaPost: "123456"
 *     responses:
 *       200:
 *         description: Login bem sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginError'
 *             example:
 *               message: "Invalid credentials"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginError'
 *             example:
 *               message: "Invalid credentials: [erro detalhado]"
 */

/**
 * @swagger
 * /teste:
 *   get:
 *     summary: Rota de teste
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Teste bem sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teste:
 *                   type: string
 */

/**
 * @swagger
 * /ibovespa:
 *   get:
 *     summary: Obtém dados do índice Ibovespa
 *     tags: [Market Data]
 *     responses:
 *       200:
 *         description: Dados do Ibovespa obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IbovespaData'
 *       500:
 *         description: Erro ao obter dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /valida-acesso:
 *   get:
 *     summary: Valida o token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Token não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Busca notícias com base nos parâmetros fornecidos
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Palavras-chave ou frases para pesquisar no título e corpo do artigo
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: Data mais antiga permitida (formato ISO 8601, ex. 2024-10-12)
 *       - in: query
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ar, de, en, es, fr, he, it, nl, no, pt]
 *         description: Código ISO-639-1 do idioma
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [relevancy, popularity, publishedAt]
 *         description: Ordem de classificação dos artigos
 *     responses:
 *       200:
 *         description: Lista de notícias encontradas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsResponse'
 *       412:
 *         description: Parâmetros obrigatórios não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ex:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Erro ao buscar notícias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Adiciona uma notícia aos favoritos
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteDTO'
 *     responses:
 *       201:
 *         description: Favorito adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Erro ao adicionar favorito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */