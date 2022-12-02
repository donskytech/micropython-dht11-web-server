from machine import Pin
import dht

class DHTModule:
    def __init__(self, pinNumber):
        self.dht_sensor = dht.DHT11(Pin(pinNumber))
    
    def get_values(self):
        self.dht_sensor.measure()
        temperature = self.dht_sensor.temperature()
        humidity = self.dht_sensor.humidity()
        
        print(f"Temperature: {temperature:.2f}")
        print(f"Humidity: {humidity:.2f}")
        
        return temperature, humidity