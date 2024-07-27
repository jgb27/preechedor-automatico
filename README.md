# Preechedor Automatico

## Descrição
O **Preechedor Automatico** é um projeto que modifica um arquivo base enviado em formato `.docx`. Ele permite que o usuário substitua tags dentro do documento por valores de sua escolha. Por exemplo, se o documento contém a tag `{nome}`, o programa pode substituir essa tag por vários nomes fornecidos em uma lista, gerando múltiplos documentos personalizados. Além disso, o projeto oferece a funcionalidade de exportar e importar tags previamente configuradas.

## Dependências Necessárias
- Node.js

## Instruções de Instalação
Para instalar e configurar o projeto, utilize um dos seguintes comandos:
```bash
npm install
# ou
yarn add
```

## Exemplos de Uso

Se no seu texto você colocar uma tag entre chaves, como {nome}, você pode usar o programa para gerar vários documentos, cada um com um nome diferente da lista fornecida. Por exemplo, se você desejar substituir a tag {data}, o programa alterará todas as ocorrências dessa tag pelo valor que você especificar.

Arquivo base (template.docx):

```
Olá {nome},

Estamos felizes em informar que sua consulta está marcada para o dia {data}.

Atenciosamente,
Equipe

```

Lista de nomes:

```
- João
- Maria
- Carlos
```

Documentos gerados:
- Olá João, ...
- Olá Maria, ...
- Olá Carlos, ...

Licença
Este projeto está licenciado sob a licença MIT.

## Contribuição
Contribuições são bem-vindas! Para contribuir, siga os seguintes passos:

1. Faça um fork do projeto
2. Crie uma nova branch (git checkout -b minha-nova-feature)
3. Commit suas mudanças (git commit -m 'Adiciona nova feature')
4. Faça o push para a branch (git push origin minha-nova-feature)
5. Abra um Pull Request para revisão
