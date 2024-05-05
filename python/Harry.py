import network
import urequests
import utime
import ujson
from machine import Pin, PWM

ledpin = [13, 14, 15]
leds = []
for e in ledpin :
    leds.append(PWM(Pin(e, mode=Pin.OUT)))

for e in leds :
    e.freq(1_000)
    e.duty_u16(0)

def turnoff():
    for e in leds:
        e.duty_u16(0)

Gryf = [255, 0, 0]
Serp = [0, 255, 0]
Pouf = [255, 255, 0]
Serd = [0, 0, 255]
nd = [255,255,255]
def setcolor(c) :
    div = 65534/255
    div = int(div)
    i = 0
    for e in leds :
        e.duty_u16(c[i]*div)
        i+=1

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid = 'Redmi Note 11'
password = '12345678k'
wlan.connect(ssid, password)
url = "http://192.168.83.24:3000/house"

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("GET")
        r = urequests.get(url)
        house = r.json()["house"]
        if house == "Gryffindor":
            setcolor(Gryf)
        elif house == "Slytherin":
            setcolor(Serp)
        elif house == "Hufflepuff":
            setcolor(Pouf)
        elif house == "Ravenclaw":
            setcolor(Serd)
        else :
            setcolor(nd)
            utime.sleep(0.1)
            turnoff()
            utime.sleep(0.1)
        r.close()
        utime.sleep(1)  
    except Exception as e:
        print(e)