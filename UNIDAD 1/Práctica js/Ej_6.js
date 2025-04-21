//6.- Encontrar el número que más se repite en un array
Numeros=[5,6,2,8,15,3,6,4,59,6,25,8,14,3]
function encontrarRepetido(array) {
    let repetido = array[0];
    let contador = 0;
    let maximo = 0;
    for (let i = 0; i < array.length; i++) {
        let contadorActual = 0;
        for (let j = 0; j < array.length; j++) {
            if (array[i] == array[j]) {
                contadorActual++;
                }
         }
        if (contadorActual > maximo) {
                maximo = contadorActual;
                repetido = array[i];
            }
    }
return repetido;
}
console.log(encontrarRepetido(Numeros))
