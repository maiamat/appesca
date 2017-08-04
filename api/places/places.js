let findById = function() {
  return new Promise((resolve, reject) => {
    let objPlace = {
      'name': 'Recanto do Pacú',
      'address': 'Sousas'
    }
    resolve(objPlace);
  })
}

// ----- MODULE EXPORTS -------- //
module.exports = {
    findById: findById
};