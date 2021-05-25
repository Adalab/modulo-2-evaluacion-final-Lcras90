# modulo-2-evaluacion-final-Lcras90

##Aplicación para la búsqueda de Series de TV con la API de TVmaze.

La aplicación consta de un campo de texto para escribir la búsqueda y un botón. Además, tenemos un título para la página, y dos subtítulos que pertecen 
a dos contenedores donde iremos poniendo el listado general de series, y las favoritas con un botón de reset.

1) Cuando escribimos  el nombre de la serie buscada se inspecciona el LS por si la serie ha sido ya buscada, si lo ha sido, pinta el resultado y sino
hace la petición a la API y la pinta. 

2) Una vez que tenemos el listado de series podemos seleccionar la serie como favorita, sabremos que la hemos clicado, porque el borde cambiará a un amarillo 
brillante y se colocará en el contenedor de series favoritas.

3) Las series marcadas como favoritas se guardarán en el LS, y aparecerán en su contenedor siempre que recarguemos la página.

4) Si decidimos que la serie ya no nos gusta tanto como para tenerla como favorita, podremos quitarla dándole al boton "x" que tenemos en la esquina superior
izquierda. Cada vez que eliminemos una serie, también la borraremos de LS para que no vuelva a aparecer al recargar.

5) Si queremos librarnos de todas las series marcadas como favoritas, sin quitarlas una a una podremos usar el botón de reset,
que mos limpiará el contendor al completo.

