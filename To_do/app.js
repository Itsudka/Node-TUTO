import { inquirerMenu, pausa, LeerInput } from './helpers/inquirer.js';
import 'colors';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

const main = async () => {


  let opt = '';
  const tareas = new Tareas();

  const tareasDB =  leerDB();

  if( tareasDB ) {
      tareas.cargarTareasFromArray( tareasDB );
  }

  await pausa();

  do {
    opt = await inquirerMenu();
 
    switch (opt) {
        case '1':
            const desc = await LeerInput('Descripción:');
            tareas.crearTarea( desc );
            console.log(desc);
        break;
        
        case '2':
            tareas.listadoCompleto();
        break;
    
        default:
            break;
    }

    guardarDB( tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();