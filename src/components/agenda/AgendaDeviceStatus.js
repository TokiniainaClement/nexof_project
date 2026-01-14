import React from 'react';
import { Wifi, Smartphone, Monitor, Activity } from 'lucide-react';

const AgendaDeviceStatus = ({ devices = [] }) => {
  const defaultDevices = [
    { id: '1', name: 'iPhone 15', type: 'phone', status: 'online', lastSync: '2 min ago' },
    { id: '2', name: 'MacBook Pro', type: 'computer', status: 'online', lastSync: '1 min ago' },
    { id: '3', name: 'iPad Air', type: 'tablet', status: 'offline', lastSync: '1h ago' },
  ];

  const displayDevices = devices.length > 0 ? devices : defaultDevices;

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'phone': return <Smartphone className="w-4 h-4" />;
      case 'computer': return <Monitor className="w-4 h-4" />;
      case 'tablet': return <Smartphone className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'syncing': return 'text-yellow-400 animate-pulse';
      default: return 'text-gray-400';
    }
  };

  const onlineCount = displayDevices.filter(d => d.status === 'online').length;

  return (
    <div className="space-y-4">
      <div className="backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-lg p-4 hover:border-blue-400/60 transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-mono text-blue-300">Connected Devices</span>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-blue-300">
            <span className="text-blue-400">Online:</span> <span className="font-bold text-cyan-300">{onlineCount}</span>
          </p>
          <p className="text-blue-300">
            <span className="text-blue-400">Total:</span> <span className="font-bold text-cyan-300">{displayDevices.length}</span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {displayDevices.map((device) => (
          <div
            key={device.id}
            className="backdrop-blur-md bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-400/30 rounded p-3 hover:border-blue-400/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={getStatusColor(device.status)}>
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">{device.name}</p>
                  <p className="text-xs text-blue-300/70">
                    {device.lastSync ? `Last sync: ${device.lastSync}` : 'Never synced'}
                  </p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                device.status === 'online' ? 'bg-green-400' :
                device.status === 'syncing' ? 'bg-yellow-400 animate-pulse' :
                'bg-gray-400'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaDeviceStatus;