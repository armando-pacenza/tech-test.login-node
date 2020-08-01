#
# TechTest - Proyecto Ejemplo de uso de spring, javascript, angular y node.
#

Version 1.0.0

MODULO DE LOGIN - (login-node):

Front End:  EJS
Back End: NodeJS
Base de Datos: MySQL


Descripcion:
Aplicacion Node que implementa a traves de passport la  validacion de usuario utilizando una estrategia "local" 
que accede a una base sql. Se utiliza express session y cookie parser para implementar el concepto de sesion. Si el login es valido se redirecciona a la pagina de inicio del modulo de contratos. Esta pagina esta en views/contrato.html
Para que el sistema funcione se copia del proyecto ng-contratos  el dist/index.html a views/contrato.html 
y dist/*.js dist/*.map a public/js


Se implementa HTTPS via un certificado autofirmado.
Se usa crear-cert.sh se uso para generar los certificados. Par que funcione se tiene que incluir a mando el certificado en chrome. El certificado esta generado para pacho.com.ar .  Por eso se tuvo que agregar al /etc/hosts:

127.0.0.1	pacho.com.ar 


En los comentarios de LoginApp se explica el funcionamiento propio de la app.



Disclaimer:
 No es "Production Grade" solo se usa como ejemplo práctico para ver el funcionameinto de distintas tecnologias.



