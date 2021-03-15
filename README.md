# TestAval

Este Proyecto esta generado en Angular version 11.1.4.

## TestAval API:

Proyecto Generado con .Net Core y Entity Framework.

-------

## INTEGRACION BACKEND Y FRONTEND LOCAL 

* Se debe abrir el proyecto frontend en una terminal y ejecutar el comando npm install y luego npm start. Correra sobre http://localhots:4200

* El proyecto Backend se ejecuta preferiblemente desde el proyecto de Visual Studio, compilando y haciendo Build.  Correra sobre  https://localhost:5001, 

* Para la autenticacion de la aplicacion web se utiliza Firebase Authentication, solo es necesario npm install sobre el proyecto frontend.

* Para Evitar errores de CORS, se implemento un proxy en el proyecto frontend, que esta apuntando al endpoint  https://localhost:5001, si se corre en otro puerto el backend se debe modificar este archivo proxy.conf.json en el proyecto angular

* Dentro del Proyecto se encuentra el archivo dataBaseQuery.sql correspondiente a la base de datos y se debe ejecutar sobre ambienre Sql Server.

----
