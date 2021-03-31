**RF** => Requisitos Funcionais

**RNF** => Requisitos não Funcionais

**RN** => Regra de negócio

# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possivel listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com status de disponivel por padrão.
Somente usuários administradores podem cadastrar um novo carro.

# Listagem de carros

**RF**
Deve ser possiveis listar todos os carros disponiveis.

**RN**
O usuário não precisar estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel listar todas as espeficicações.
Deve ser possivel listar todos os carros com essas especificações

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
Somente usuários administradores podem cadastrar uma especificação.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RNF**
Utilizar o multer para upload de imagem.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Somente usuários administradores podem cadastrar uma nova imagem para carro carro.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel.

**RN**
O aluguel deve ter duração minima de 24 horas.
Somente carros com status disponivel podem ser alugados.
Não deve ser possivel cadastrar um novo aluguel em andamento para o mesmo usuário.
