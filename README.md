# Wiki Marvel

## Prueba técnica posición React Native Red Arbor:

En la rama [Main](https://github.com/Tonisg91/marvel_app_RN/tree/main), está la primera versión que hice con el context sin utilizar el objeto Proxy.

En [Dev](https://github.com/Tonisg91/marvel_app_RN/tree/dev) está la versión 100% como requieren las directrices de la prueba.

## Flujo de trabajo:

[Trello](https://trello.com/b/km5oxJLM/marvel-app-rn)

## Notas:

Los datos de autenticación están en el archivo src/seeds.json

Hay un polyfill para el objeto URL nativo de JS. En la versión solicitada por las directrices, el dicho objeto añade un "/" al final de la URL e imposibilita la consulta.

[Issue](https://github.com/facebook/react-native/issues/24428)

[Polifyll](https://github.com/charpeni/react-native-url-polyfill)

Mi experiencia con Typescript es un poco limitada. Veréis algunos fallos de tipado o tipos impuestos "a lo bruto" con la keyword "as".

## Descripción:

Solicitamos que desarrolle una app con React-Native v0.63 que conste de un login simulado
(mediante un servicio mockeado local que sólo deje a acceder con una dirección de correo
en concreto, devolviendo nombre y apellidos); tras el acceso, una vista de listado de héroes
de Marvel como pantalla principal; y una vista de detalle para cada uno de los héroes.

La documentación y el registro en la API de Marvel (para la obtención de las claves
necesarias) está accesible en https://developer.marvel.com/. Para la interacción desde
React con la mencionada API será necesario que el candidato utilice el paquete apisauce.

Funcionalidades a implementar:

1. Pantalla de login → persistencia de datos en proveedor (mail, nombre, apellidos)
2. Autorización para la API de Marvel (según su especificación)
3. Obtener y pintar el listado de héroes, con paginación tipo endless-scroll, y con los
   siguientes datos por cada uno de ellos:

- Imagen
- Nombre
- Número de cómics en los que aparece

4. Cuando se pulse un héroe del listado, navegar a su detalle con:

- Nombre
- Descripción
- Imagen
  d. Un listado (también endless-scroll) de los cómics en los que aparece el héroe

5. Utilizar un objeto Proxy (EcmaScript 6) mediante un proveedor (que adjuntamos en
   el código base, con partes pendientes de implementar) como caché de peticiones de
   API (una segunda petición con los mismos parámetros no debe generar llamadas de
   red, si no obtener el valor transparentemente de dicho Proxy)
6. Dar la posibilidad de cerrar la sesión
