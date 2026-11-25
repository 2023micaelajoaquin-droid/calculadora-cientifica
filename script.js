(function () {
  const errors = {
    empty: 'Ingresá ambos valores.',
    invalid: 'Ingresá números válidos.',
    divisionByZero: 'No se puede dividir por cero.',
    overflow: 'El resultado está fuera del rango numérico.',
    unknown: 'Elegí una operación válida.'
  };

  function calculate(operation, rawA, rawB) {
    rawA = typeof rawA === 'string' ? rawA.trim() : rawA;
    rawB = typeof rawB === 'string' ? rawB.trim() : rawB;
    if (operation === 'raiz' && (rawA === '' || rawA == null)) return { error: 'Ingresá el primer valor para calcular la raíz.' };
    if (rawA === '' || rawA == null || (operation !== 'raiz' && (rawB === '' || rawB == null))) {
      return { error: errors.empty };
    }

    const a = Number(rawA);
    const b = operation === 'raiz' ? undefined : Number(rawB);
    if (!Number.isFinite(a) || (operation !== 'raiz' && !Number.isFinite(b))) {
      return { error: errors.invalid };
    }

    let value;
    switch (operation) {
      case 'sumar': value = a + b; break;
      case 'restar': value = a - b; break;
      case 'multiplicar': value = a * b; break;
      case 'dividir':
        if (b === 0) return { error: errors.divisionByZero };
        value = a / b;
        break;
      case 'potencia': value = a ** b; break;
      case 'raiz':
        if (a < 0) return { error: 'No se puede calcular la raíz de un número negativo.' };
        value = Math.sqrt(a);
        break;
      default: return { error: errors.unknown };
    }

    if (!Number.isFinite(value)) return { error: errors.overflow };
    return { value };
  }

  function formatResult(value) {
    return new Intl.NumberFormat('es-AR', { maximumSignificantDigits: 12 }).format(value);
  }

  function showResult(operation) {
    if (typeof document === 'undefined') return;
    const result = document.getElementById('resultado');
    const message = document.getElementById('mensaje');
    const a = document.getElementById('valor-a');
    const b = document.getElementById('valor-b');
    const output = calculate(operation, a.value, b.value);
    result.textContent = output.error ? '—' : formatResult(output.value);
    message.textContent = output.error || '';
  }

  function clear() {
    if (typeof document === 'undefined') return;
    document.getElementById('valor-a').value = '';
    document.getElementById('valor-b').value = '';
    document.getElementById('resultado').textContent = '—';
    document.getElementById('mensaje').textContent = '';
    document.getElementById('valor-a').focus();
  }

  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-operacion]').forEach((button) => {
      button.addEventListener('click', () => showResult(button.dataset.operacion));
    });
    document.getElementById('borrar').addEventListener('click', clear);
    ['valor-a', 'valor-b'].forEach((id) => {
      document.getElementById(id).addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          showResult('sumar');
        }
      });
    });
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { calculate, formatResult };
})();
