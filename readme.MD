## Listador de personas con Javascript  
  
v1.0.0 - 24/05/2021  
-Version inicial  
-Diseño visual unicamente para 1080p en 16:9 y similares  
*Limitacion funcional conocida: Eliminar una entrada con igual nombre que otras, eliminara todas en la misma orden. (fixed v1.1)  
*Limitacion funcional conocida: No es posible añadir nombres o apellidos con espacios. (fixed v1.1)  
  
  
v1.0.5 - 24/05/2021  
-Modificado fondo  
-Añadido algo de diseño responsivo  
-Mejorada logica en javascript (?)  
-Diseño mas reactivo, alerta al usuario en cuanto sea conveniente -> Puede mejorarse  
*Limitacion funcional conocida: eliminar de la lista los elementos de acuerdo a su value resulta problematico (fixed 1.1)  
*En pantallas grandes, puede mejorarse el orden al tabear en los inputs(fixed 1.1)  
  
  
v1.1 - 29/05/2021  
-Reemplazadas algunas malas practicas en el codigo JS (DOM & function related)  
-Reemplazada tipo de lista por unordered  
+Algo de diseño responsivo  
+En pantallas grandes, tabear en la zona de inputs respeta un orden logico (nombre, apellido, boton para agregar)  
+Se corrigio limitacion al agregar nombres/apellidos con espacios y la eliminacion de ingresos identicos, mediante la asignacion de valores a cada elemento de lista  
  
  
v1.1.1 - 30/05/2021  
-Listeners reducidos por aplicar delegacion de eventos  
-Tweaks en diseño responsivo  
*Contador no se actualiza al eliminar vaciar la lista (fixed 1.1.3)  
  
  
v1.1.2 - 31/05/2021  
-Animaciones al crear o borrar los nombres  
-'Mejoras' en codigo JS respetando buenas practicas del DOM  
  
  
v2.0 beta - 31/05/2021  
-Funcionalidad de sorteo agregada, podra seleccionarse una cantidad logica de ganadores, se elegiran al azar cada vez que sea demandado.  
+Tras ser vaciada la lista: i) Incorporada animacion a todos los elementos. ii) Solucionada actualizacion del contador  
*Diseño responsivo no disponible seccion de sorteo