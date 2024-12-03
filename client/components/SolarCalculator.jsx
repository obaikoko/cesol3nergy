'use client'
import React, { useState } from 'react';

const SolarCalculator = () => {
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [voltage, setVoltage] = useState('');
  const [load, setLoad] = useState('');
  const [efficiency, setEfficiency] = useState(90);
  const [devices, setDevices] = useState([]);
  const [runtime, setRuntime] = useState(null);

  const addDevice = () => {
    if (!load) {
      alert('Please enter a load value.');
      return;
    }
    setDevices([...devices, { load: Number(load) }]);
    setLoad('');
  };

  const calculateRuntime = () => {
    if (!batteryCapacity || devices.length === 0) {
      alert('Please enter battery capacity and at least one device load.');
      return;
    }

    const totalLoad = devices.reduce((sum, device) => sum + device.load, 0);

    const capacityInWh = voltage ? batteryCapacity * voltage : batteryCapacity;

    const calculatedRuntime = (capacityInWh * (efficiency / 100)) / totalLoad;

    setRuntime(calculatedRuntime.toFixed(2));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-lg w-full'>
        <h2 className='text-2xl font-bold text-purple text-center mb-4'>
          Solar Inverter Runtime Calculator
        </h2>
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700'>
              Battery Capacity (Wh or Ah):
            </label>
            <input
              type='number'
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
              className='w-full p-2 border rounded focus:outline-purple focus:ring-1'
              placeholder='e.g., 100'
            />
          </div>
          <div>
            <label className='block text-gray-700'>
              Voltage (if capacity is in Ah):
            </label>
            <input
              type='number'
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className='w-full p-2 border rounded focus:outline-purple focus:ring-1'
              placeholder='e.g., 12'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Efficiency (%):</label>
            <input
              type='number'
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              className='w-full p-2 border rounded focus:outline-purple focus:ring-1'
              placeholder='e.g., 90'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Device Load (Watts):</label>
            <input
              type='number'
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className='w-full p-2 border rounded focus:outline-purple focus:ring-1'
              placeholder='e.g., 50'
            />
            <button
              onClick={addDevice}
              className='mt-2 w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-dark'
            >
              Add Device
            </button>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='text-lg font-bold'>Devices:</h3>
          {devices.length > 0 ? (
            <ul className='list-disc pl-5'>
              {devices.map((device, index) => (
                <li key={index} className='text-gray-700'>
                  Load: {device.load} W
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500'>No devices added yet.</p>
          )}
        </div>
        <button
          onClick={calculateRuntime}
          className='mt-6 w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-dark'
        >
          Calculate Runtime
        </button>
        {runtime && (
          <div className='mt-4 text-center'>
            <h3 className='text-xl font-bold text-gray-700'>
              Estimated Runtime: {runtime} hours
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
