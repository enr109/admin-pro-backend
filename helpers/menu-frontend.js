const getMenuFrontEnd = ( role = 'USE_ROLE' ) => {
    const menu = [
        {
          titulo: 'Dashboard!!!',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/'},
            { titulo: 'Gráficas', url: 'graficas1'},
            { titulo: 'rxjs', url: 'rxjs'},
            { titulo: 'Promesa', url: 'promesa'},
            { titulo: 'ProgressBar', url: 'progress'},
          ]
        },
    
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            /* { titulo: 'Usuarios', url: 'usuarios'}, */
            { titulo: 'Hospitales', url: 'hospitales'},
            { titulo: 'Medicos', url: 'medicos'},
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE') {
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios'})
          
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}