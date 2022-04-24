## Desafio Ewally

O projeto consiste em aplicação backend, onde tem como vies identificar a linha digitável de um boleto e retorna informações a baixo para os dois tipos sendo eles títulos bancários e pagamentos de concessionárias:

- status: 200 para linha válida ou 400 para linha inválida
- amount: O valor do boleto, se existir
- expirationDate: A data de vencimento do boleto, se existir
- barCode: Os 44 dígitos correspondentes ao código de barras desse boleto

Exemplo de linha digitável bancária: 21290001192110001210904475617405975870000002000

Exemplo de linha digitável concessionária: 856900000584030100649158110347945609001374691358