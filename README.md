# Email service

### Proposta de serviço de envio de emails

* Utilizado NodeJS e typescript
* Implementação utilizando Nodemailer e serviço de email GMAIL do google


Para executar:


```npm install | npm run build | npm start```

* Serviço rodando em http://localhost:3000

* Rota de envio de email 
    POST em http://localhost:3000/api/email com body:

```
{
    "to": "email@email.com",
    "from": "anotheremail@email.com",
    "subject":"Subject of this example mail",
    "body" : "<p>Olá mundo</p>"
}

``` 

* Documetação do serviço na rota http://localhost:3000/docs