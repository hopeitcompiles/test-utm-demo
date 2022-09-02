const games=[
    // {name:'test',id:1,image:'test.jpg'},
    // {name:'fps',id:2,image:'fps.jpg'},
    // {name:'kart',id:3,image:'kart.jpg'},
    // {name:'lego',id:4,image:'lego.jpg'},
    {name:'drive_test',
    display_name:"Test Psicométrico: Control de Coches Doble",
        id:5,
        image:'drive_test.jpg',
        short:'Pon a prueba tus habilidades de concentración con este test psicométrico donde controlarás dos coches que aceleran automáticamente hasta su destino, tu objetivo es evitar que estos choquen',
        description:'Pon a prueba tus habilidades de concentración con este test donde controlarás dos coches que aceleran automáticamente hasta su destino, tu objetivo es evitar que estos choquen. Cada uno tiene su propio carril del cual no pueden salir. ¿Podrás mantenerlos en el camino hasta que el tiempo se acabe?'
    }]

export function getList(){
    return games;
}