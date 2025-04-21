//7.- Dado un array de objetos con valores numéricos, suma una propiedad específica
const datos=[
    {id:1,valor:22},
    {id:2,valor:5},
    {id:3,valor:70}
]
function sumaPropiedad(array, propiedad) {
    return array.reduce((acumulador, elemento) => acumulador + elemento[propiedad], 0);
 }

console.log(sumaPropiedad(datos, 'valor'));