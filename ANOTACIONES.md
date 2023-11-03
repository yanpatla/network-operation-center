domain

Lo que yo coloco en domain son las reglas con las cuales van a regir mi app a un lvl bien alto/macro aljandose del FE, de las capas mas externas. ORigines de datos, como lucen mis models, mis entities(que luego se van a pegar a las DB) y el repository que como quiero yo poder trabajar con mis datasources, los use-cases 


Infrastructure

Aqui es donde ya tenemos nuestras implementaciones de nuestro repositorio  y el datasource. En el datasource es donde lit, hacemos el trabajo en donde estamos pegando a nuestros origen de datos, recuperandolos, procesando la informacion. Luego la parte de los repositories que trabajan con el datasource 



Presentacion en esta parte es la que esta mas cerca, nuestra app de console, luego tambien colocaremos nuestro server de express, basicamente esto son cosas que estan bien cerca de nuestros usuarios/consola