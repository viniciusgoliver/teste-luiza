# Sistema de Processamento de Pedidos

## Descrição

O Sistema de Processamento de Pedidos é uma aplicação desenvolvida para processar e gerenciar pedidos a partir de arquivos de texto. Ele permite o upload de arquivos contendo dados de pedidos, processa esses dados e oferece endpoints para consultar pedidos com base em filtros específicos.

## Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: NestJS
- **Banco de Dados**: Nenhum banco de dados foi utilizado; os dados são gerenciados em memória.
- **Testes**: Jest para testes unitários e de integração.
- **Docker**: Utilizado para criar um ambiente isolado e reproduzível para o serviço.

## Arquitetura

A arquitetura do sistema é baseada em uma abordagem de **Camadas**:

- **Controller**: Gerencia as requisições HTTP e interage com o serviço.
- **Service**: Contém a lógica de negócios e manipula dados.
- **DTO (Data Transfer Object)**: Define os dados trocados entre camadas e com o cliente.
- **Validator**: Verifica a validade dos dados.

## Estrutura do Projeto

- **src/**
  - **controllers/**: Contém os controladores que gerenciam as requisições HTTP.
  - **services/**: Contém os serviços que implementam a lógica de negócios.
  - **dto/**: Contém os Data Transfer Objects usados para troca de dados.
  - **validators/**: Contém os validadores que garantem a integridade dos dados.
  - **app.module.ts**: Configuração principal do módulo da aplicação.
  - **main.ts**: Ponto de entrada da aplicação.

## Como Subir o Ambiente Local

### Com Docker

1. **Certifique-se de ter o Docker e o Docker Compose instalados.**

2. **Clone o repositório**:
   ```bash
   git clone https://github.com/viniciusgoliver/teste-luiza.git
   cd teste-luiza

  ```
3. **Crie e inicie o contêiner Docker**:
    ```bash
      docker-compose up --build
      O serviço estará disponível em http://localhost:3000.
    ```

### Sem Docker

1. **Instale as dependências**:
    ```bash
      npm install
    ```
2. **Compile o projeto**:
    ```bash
      npm run build
    ```
3. **Inicie o servidor**:
    ```bash
      npm run start
    ```

### Rodar Testes

**Testes Unitários**
 - Para rodar os testes unitários, utilize o comando:
  ```bash
    npm run test
  ```

**Testes de Cobertura**
 - Para rodar os testes de cobertura e gerar o relatório, utilize:
  ```bash
    npm run test:cov
  ```

### Endpoints da API

**Upload de Arquivo**

#### POST /orders/upload

 - Descrição: Envia um arquivo de texto para processamento.
 - Body: Arquivo file (multipart/form-data).
 - Resposta: 200 OK com a mensagem de sucesso ou 400 Bad Request para erros.

Exemplo de Curl:
```bash
    curl --request POST \
  --url http://localhost:3000/orders/upload \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@/caminho/para/seu/arquivo.txt'
```

#### POST /orders

- Descrição: Consulta pedidos com filtros opcionais.
- Body Params:
   * order_id (opcional): ID do pedido para filtrar.
   * date (opcional): Data de início no formato YYYY-MM-DD.
- Resposta: Lista de pedidos filtrados.

Exemplo de Curl:

```bash
    curl --request POST \
  --url http://localhost:3000/orders/list-orders \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@/caminho/para/seu/arquivo.txt'
```

## Fluxo de Processo

### Upload de Arquivo

- **Requisição**: O cliente envia um arquivo com informações de pedidos.
- **Controller**: Recebe o arquivo e chama o método `processFile` do `OrdersService`.
- **Serviço**: Lê e processa o arquivo, valida e agrupa os dados.
- **Resposta**: Retorna os dados processados ou um erro de validação.

### Consulta de Pedidos

- **Requisição**: O cliente envia parâmetros de consulta para filtrar os pedidos.
- **Controller**: Recebe os parâmetros e chama o método de filtragem do `OrdersService`.
- **Serviço**: Filtra os pedidos com base nos parâmetros fornecidos.
- **Resposta**: Retorna os pedidos filtrados ou um erro, se necessário.

## Decisões Tecnológicas e Arquiteturais

- **Framework**: O NestJS foi escolhido por sua estrutura modular, escalabilidade e suporte robusto para TypeScript.
- **Armazenamento de Dados**: Os dados são mantidos em memória para simplificar o desenvolvimento. Em um ambiente de produção, um sistema de armazenamento mais robusto seria necessário.
- **Validação**: A biblioteca `class-validator` é usada para garantir a integridade dos dados.

## Padrão Arquitetural

O projeto segue uma **Arquitetura em Camadas** para separar responsabilidades de forma clara e organizada.

### Detalhamento das Camadas

#### Camada de Apresentação (Controller)

- **Responsabilidade**: Gerencia as requisições HTTP e controla o fluxo de dados entre o cliente e o serviço.
- **Implementação**: O `OrdersController` é responsável por expor os endpoints `/orders/upload` e `/orders/list-orders`.

#### Camada de Serviço (Service)

- **Responsabilidade**: Contém a lógica de negócios e o processamento dos dados.
- **Implementação**: O `OrdersService` processa os arquivos recebidos, valida e filtra os dados. O método `processFile` manipula a leitura do arquivo e a agregação dos dados. O método `listOrders` aplica filtros nos dados existentes.

#### Camada de Dados (Model e DTO)

- **Responsabilidade**: Representa a estrutura dos dados que o sistema manipula.
- **Implementação**: O `OrderResponseDto` define a estrutura dos dados de resposta da API. A validação dos dados é feita usando a biblioteca `class-validator`, garantindo que estejam no formato correto antes de serem processados.

### Camada de Validação e Helpers

- **Responsabilidade**: Contém lógica auxiliar e validação de dados, complementando a camada de serviço.
- **Implementação**: Funções como `isValidOrderResponseDto` são utilizadas para validar se um DTO é válido, além de utilizar `class-validator` para validações adicionais.

## Conclusão

Esta arquitetura em camadas proporciona uma clara separação de responsabilidades, facilitando a manutenção, escalabilidade e extensão do sistema. A aplicação de boas práticas como a validação de dados e a containerização com Docker assegura que o sistema seja robusto e fácil de configurar em diferentes ambientes.
