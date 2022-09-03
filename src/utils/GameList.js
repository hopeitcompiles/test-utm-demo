const games=[
    {name:'drive_test',
    display_name:"Test Psicométrico: Control de Coches Doble",
        id:1,
        image:'drive_test.jpg',
        short:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo.',
        description:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo   por lo cual debe de mantener los coches dentro de  carril correspondiente por un laptop de 45 segundos, para aprobar.'
    },{name:'puntitos_test',
    display_name:"Test Psicométrico: Toca los circulos",
        id:2,
        image:'puntitos_test.jpg',
        short:'Este test  tiene como objetivo medir su reacción  visual y motriz mediante la selección  de círculos que cambian de posición.',
        description:'Este test tiene como objetivo medir  reacción  visual y motriz, este test consiste en dar clic sobre el círculo que  cambia  a color verde y de posicion para poder sumar  un punto, siendo así el objetivo de lograr 30 puntos  en un lapso de 25 segudos para aprobar el test.'
    }]

export function getList(){
    return games;
}