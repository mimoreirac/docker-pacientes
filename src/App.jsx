import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    sexo: '',
    edad: '',
    diagnostico: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nombres || !formData.apellidos || !formData.sexo || !formData.edad || !formData.diagnostico) {
      setMessage('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          sexo: formData.sexo,
          edad: parseInt(formData.edad),
          diagnostico: formData.diagnostico
        })
      });

      if (response.ok) {
        setMessage('Datos enviados correctamente');
        setFormData({
          nombres: '',
          apellidos: '',
          sexo: '',
          edad: '',
          diagnostico: ''
        });
      } else {
        setMessage('Error al enviar los datos');
      }
    } catch (error) {
      setMessage('Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-2">Ingrese su información</h3>
      <p className="mb-4">Por favor ingrese la información del paciente</p>
      
      <div className="w-full">
        <div className="grid grid-cols-2 grid-flow-row gap-2 w-full mb-4">
          <div>Nombres</div>
          <div>Apellidos</div>
          <input 
            type="text" 
            name="nombres" 
            id="nombresPaciente"
            value={formData.nombres}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <input 
            type="text" 
            name="apellidos" 
            id="apellidosPaciente"
            value={formData.apellidos}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
          
          <div className="col-span-full mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="sexo" 
                  id="sexoFemenino" 
                  value="femenino"
                  checked={formData.sexo === 'femenino'}
                  onChange={handleChange}
                />
                <label htmlFor="sexoFemenino">Femenino</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="sexo" 
                  id="sexoMasculino" 
                  value="masculino"
                  checked={formData.sexo === 'masculino'}
                  onChange={handleChange}
                />
                <label htmlFor="sexoMasculino">Masculino</label>
              </div>
            </div>
          </div>
          
          <div className="col-span-full mt-2">Edad</div>
          <input 
            className="col-span-full border border-gray-300 rounded px-2 py-1" 
            type="number" 
            name="edad" 
            id="edadPaciente"
            value={formData.edad}
            onChange={handleChange}
            min="0"
            max="150"
          />
          
          <div className="col-span-full mt-2">Diagnóstico</div>
          <input 
            className="col-span-full border border-gray-300 rounded px-2 py-1 h-32" 
            type="text" 
            name="diagnostico" 
            id="diagnosticoPaciente"
            value={formData.diagnostico}
            onChange={handleChange}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Nuestro servicio respeta la Ley Orgánica de Protección de Datos del Ecuador
        </p>
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar datos'}
        </button>
        
        {message && (
          <div className={`mt-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-200 text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;