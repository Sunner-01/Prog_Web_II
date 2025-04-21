//1.-Dado un array de números, devuelve un objeto con la cantidad de números pares e impares..
Numeros=[2,5,6,9,15,30,25,12]
let resultado={pares:0 , impares:0}
for (let i = 0; i < Numeros.length; i++) {
    if (Numeros[i] % 2 == 0) {
        resultado.pares++;
    } 
    else {
         resultado.impares++;
    }
}
console.log(resultado); 
