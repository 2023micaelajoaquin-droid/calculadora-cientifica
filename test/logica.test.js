const assert = require('node:assert/strict');
const { calculate } = require('../script.js');

assert.equal(calculate('sumar', '8', '3').value, 11);
assert.equal(calculate('restar', '8', '3').value, 5);
assert.equal(calculate('multiplicar', '8', '3').value, 24);
assert.equal(calculate('dividir', '8', '4').value, 2);
assert.equal(calculate('sumar', '', '3').error, 'Ingresá ambos valores.');
assert.equal(calculate('sumar', 'Infinity', '3').error, 'Ingresá números válidos.');
assert.equal(calculate('dividir', '8', '0').error, 'No se puede dividir por cero.');
assert.equal(calculate('potencia', '2', '3').value, 8);
assert.equal(calculate('raiz', '81', '').value, 9);
assert.equal(calculate('raiz', '-1', '').error, 'No se puede calcular la raíz de un número negativo.');
assert.equal(calculate('potencia', '10', '1000').error, 'El resultado está fuera del rango numérico.');

console.log('Pruebas de lógica completadas.');

const { formatResult } = require('../script.js');
assert.equal(formatResult(0.1 + 0.2), '0,3');
assert.notEqual(formatResult(1e-15), '0');
assert.match(calculate('raiz', '', '').error, /primer valor/);
assert.ok(calculate('sumar', '  ', '2').error);
