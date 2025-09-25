import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Navigation, Car, AlertTriangle, Settings, Phone, Music, MessageCircle, Fuel, Wrench, Clock, MapPin } from 'lucide-react';

const CarAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [isNavActive, setIsNavActive] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'fuel', message: 'Niveau carburant faible - Station à 2km', priority: 'medium' },
    { id: 2, type: 'maintenance', message: 'Révision dans 500km', priority: 'low' }
  ]);

  const [vehicleData, setVehicleData] = useState({
    speed: 65,
    fuel: 25,
    destination: 'Paris Centre',
    eta: '15 min',
    distance: '8.5 km'
  });

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setVoiceCommand('Écoute en cours...');
      setTimeout(() => setVoiceCommand(''), 3000);
    } else {
      setVoiceCommand('');
    }
  };

  const handleVoiceCommand = (command) => {
    setVoiceCommand(`"${command}"`);
    setTimeout(() => {
      setVoiceCommand('Commande traitée ✓');
      setTimeout(() => setVoiceCommand(''), 2000);
    }, 1500);
  };

  const quickCommands = [
    'Trouve une station essence',
    'Appelle Marie',
    'Navigation domicile',
    'Météo destination',
    'Musique jazz',
    'Messages non lus'
  ];

  const DashboardView = () => (
    <div className="space-y-4">
      {/* Navigation actuelle */}
      <div className="bg-blue-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Navigation className="w-6 h-6" />
            <div>
              <p className="font-semibold">{vehicleData.destination}</p>
              <p className="text-sm opacity-90">{vehicleData.distance} • {vehicleData.eta}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{vehicleData.speed}</p>
            <p className="text-xs">km/h</p>
          </div>
        </div>
      </div>

      {/* Alertes importantes */}
      {alerts.map(alert => (
        <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
          alert.priority === 'high' ? 'bg-red-50 border-red-500' :
          alert.priority === 'medium' ? 'bg-orange-50 border-orange-500' :
          'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <p className="text-sm">{alert.message}</p>
          </div>
        </div>
      ))}

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handleVoiceCommand('Navigation domicile')} 
                className="bg-green-500 text-white p-3 rounded-lg flex items-center space-x-2 hover:bg-green-600">
          <MapPin className="w-5 h-5" />
          <span>Domicile</span>
        </button>
        <button onClick={() => handleVoiceCommand('Trouve station essence')} 
                className="bg-orange-500 text-white p-3 rounded-lg flex items-center space-x-2 hover:bg-orange-600">
          <Fuel className="w-5 h-5" />
          <span>Essence</span>
        </button>
        <button onClick={() => handleVoiceCommand('Appelle contact')} 
                className="bg-blue-500 text-white p-3 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
          <Phone className="w-5 h-5" />
          <span>Appeler</span>
        </button>
        <button onClick={() => handleVoiceCommand('Musique')} 
                className="bg-purple-500 text-white p-3 rounded-lg flex items-center space-x-2 hover:bg-purple-600">
          <Music className="w-5 h-5" />
          <span>Musique</span>
        </button>
      </div>
    </div>
  );

  const NavigationView = () => (
    <div className="space-y-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Navigation Active</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Destination:</span>
            <span className="font-medium">{vehicleData.destination}</span>
          </div>
          <div className="flex justify-between">
            <span>Distance:</span>
            <span className="font-medium">{vehicleData.distance}</span>
          </div>
          <div className="flex justify-between">
            <span>Temps estimé:</span>
            <span className="font-medium">{vehicleData.eta}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <p className="text-sm">🚧 Ralentissement à 3km - +5min</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Stations service sur le trajet:</h4>
        <div className="space-y-1">
          <p className="text-sm bg-gray-50 p-2 rounded">Total - 1.2km • 1.89€/L</p>
          <p className="text-sm bg-gray-50 p-2 rounded">Shell - 4.5km • 1.85€/L</p>
        </div>
      </div>
    </div>
  );

  const VehicleView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Fuel className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <p className="text-sm text-gray-600">Carburant</p>
          <p className="text-xl font-bold">{vehicleData.fuel}%</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Car className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-600">Vitesse</p>
          <p className="text-xl font-bold">{vehicleData.speed} km/h</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center">
          <Wrench className="w-5 h-5 mr-2" />
          Maintenance
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Prochaine révision:</span>
            <span>500 km</span>
          </div>
          <div className="flex justify-between">
            <span>Pression pneus:</span>
            <span className="text-green-600">✓ OK</span>
          </div>
          <div className="flex justify-between">
            <span>Huile moteur:</span>
            <span className="text-green-600">✓ OK</span>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
        Diagnostic complet
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-black text-white min-h-screen">
      {/* En-tête */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">CarAI</h1>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">14:32</span>
        </div>
      </div>

      {/* Commande vocale */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={toggleVoice}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isListening ? 'bg-red-600' : 'bg-blue-600'
            } hover:opacity-80 transition-all`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>{isListening ? 'Arrêter' : 'Parler'}</span>
          </button>
          
          {voiceCommand && (
            <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
              {voiceCommand}
            </div>
          )}
        </div>

        {/* Commandes rapides */}
        <div className="grid grid-cols-2 gap-2">
          {quickCommands.slice(0, 4).map((command, index) => (
            <button 
              key={index}
              onClick={() => handleVoiceCommand(command)}
              className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation des vues */}
      <div className="flex bg-gray-800">
        {[
          { id: 'dashboard', name: 'Accueil', icon: Car },
          { id: 'navigation', name: 'Navigation', icon: Navigation },
          { id: 'vehicle', name: 'Véhicule', icon: Settings }
        ].map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 ${
              currentView === id ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{name}</span>
          </button>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="p-4 pb-6">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'navigation' && <NavigationView />}
        {currentView === 'vehicle' && <VehicleView />}
      </div>

      {/* Assistant vocal en bas */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-900 p-3 border-t border-gray-700">
        <p className="text-center text-sm text-gray-400">
          "Dis CarAI suivi de ta demande" ou utilise les boutons
        </p>
      </div>
    </div>
  );
};

export default CarAI;
