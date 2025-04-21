//2.- Dada una frase, encuentra la palabra más larga.
let frase = " Escribo poco pero lo hago cuando quiero";
let palabras = frase.split(" ");
let palabraMasLarga = palabras.reduce((a, b) => a.length > b.length ? a : b);
console.log(palabraMasLarga);