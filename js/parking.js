
let dragged; //Almacenar el objeto que esta siendo dragged
window['moment-range'].extendMoment(moment);

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const parkingRules = {
    ambulance: {
        days: weekdays,
        times: createRange(moment().set('hour', 21), moment().add(1, 'day').set('hour', 3))
        // 9pm to 3am (the next day)
    },
    fireTruck: {
        days: ['Saturday', 'Sunday']
    },
    car: {
        days: weekdays,
        times: createRange(moment().set('hour', 3), moment().set('hour', 15)) // 3am - 3pm
    },
    bicycle: {
        days: weekdays,
        times: createRange(moment().set('hour', 15), moment().set('hour', 21)) // 3pm to 9pm
    }
};

function createRange(start, end) {
    if (start && end) {
        return moment.range(start, end);
    }
}

function onDragStart(event) {
    let target = event.target;
    // If target es una imagen
    if (target && target.nodeName === 'IMG') {
        dragged = target;
        // Hacerla medio transparente
        event.target.style.opacity = .3;
    }
}

function onDragEnd(event) {
    if (event.target && event.target.nodeName === 'IMG') {
        // Reset the transparency
        event.target.style.opacity = '';
        dragged = null;
    }
}

function onDragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
}

function onDragLeave(event) {
    event.target.style.background = '';
}

function getDay() {
    return moment().format('dddd'); // format as 'monday' not 1
}

function getHours() {
    return moment().hour();
}

function canPark(vehicle) {
    /* Checar el tiempo y el tipo de vehículo siendo arrastrado
    * para ver si puede estacionarse en este tiempo
    */
    if (vehicle && parkingRules[vehicle]) {
        const rules = parkingRules[vehicle];
        const validDays = rules.days;
        const validTimes = rules.times;
        const curDay = getDay();
        if (validDays) {
            /* Si el dia actual está incluido en los dias de estacionamiento
            * parael vehículo y si la hora actual esta dentro del rango
            */
            return validDays.includes(curDay) && (validTimes ? validTimes.contains(moment()) : true);
            /* Moment.range contiene una función que checa
            * para ver si el rango contiene un momento.
            https://github.com/rotaready/moment-range#contains
            */
        }
    }
    return false;
}

function onDragEnter(event) {
    const target = event.target;
    if (dragged && target) {
        // ej. bicycle, ambulance
        const vehicleType = dragged.alt;
        if (canPark(vehicleType)) {
            event.preventDefault();
            // Establecer dropEffect a move
            event.dataTransfer.dropEffect = 'move';
            /* Cambiar el color a verde para mostrar que puede
            * ser soltado
            */
            target.style.background = '#1f904e';
        }
        else {
            /* Cambiar el color a rojo para mostrar
            * que no púede ser soltado. Nótese
            * que no se llama a event.preventDefault() aqui
            * por si el navegador no permite soltar
            * por default
            */
            target.style.backgroundColor = '#d51c00';
        }
    }
}

function onDrop(event) {
    const target = event.target;
    if (target) {
        const data = event.dataTransfer.getData('text');
        const dragged = document.getElementById(data);
        const vehicleType = dragged.alt;
        target.style.backgroundColor = '';
        if (canPark(vehicleType)) {
            event.preventDefault();
            // Obtener el ID del target y agregar elemento al target en el DOM
            dragged.style.opacity = '';
            target.appendChild(dragged);
        }
    }
}

const vehicles = document.querySelector('.vehicles');
const dropZone = document.querySelector('.drop-zone');

// Agregandi oyentes de eventos
vehicles.addEventListener('dragstart', onDragStart);
vehicles.addEventListener('dragend', onDragEnd);
dropZone.addEventListener('drop', onDrop);
dropZone.addEventListener('dragenter', onDragEnter);
dropZone.addEventListener('dragleave', onDragLeave);
dropZone.addEventListener('dragover', onDragOver);
