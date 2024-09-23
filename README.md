# Interprete_Jison_Conf2S24

# Frontend

Para poder ejecutar el frontend de forma correcta, seguir los siguientes pasos:
```bash

# Dirigirse al directorio del frontend
cd directorio_proyecto
# Instalar las dependencias
npm install
# Ejecutar la app
npm run dev
```


# Backend

Para poder ejecutar el backend de forma correcta, seguir los siguientes pasos:
```bash

# Dirigirse al directorio del frontend
cd directorio_proyecto
# Instalar las dependencias
npm install
# Compilar código ts (Para obtener el compilado js)
npm run tsc
# Ejecutar la app
npm start
```


# Cambios en grámatica

Si se desean realizar cambios a la gramática, seguir los siguientes pasos

```bash
# Dirigirse al directorio donde se encuentra la gramática
cd directorio_gramática
# Instalar jison (Por si no se tiene instalado, el "-g" es por si se quiere instalar de forma global
npm install jison -g
#Compilar la gramática
jison nombre_archivo_gramatica # Ej: jison grammar.jison

#Si no hay errores el archivo js generado debería actualizarse sin problemas.
```
