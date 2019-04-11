#include <SPI.h>
#include <Ethernet.h>
#include <PubNub.h>

byte mac [] = {0x00, 0x0E, 0xEF, 0x00, 0x00, 0x04};

const int publedPin = 13;
const int analogIn = A0;

char pubkey [] = "pub-c-c728d004-7b54-4b04-a93c-1258dac25849";
char subkey [] = "sub-c-a9cba9fe-ed7d-11e8-b085-b2b44c5b7fba";
char channel [] = "iotchannel";


void setup() {
  // put your setup code here, to run once:
  pinMode(publedPin, OUTPUT);
  digitalWrite(publedPin, LOW);
  Serial.begin(9600);
  Serial.println("Serial Setup");
  while(!Ethernet.begin(mac)){
    Serial.println("Ethernet setup Error!");
    delay(1000);
  }
  Serial.println("Ethernet Setup Success!");
  PubNub.begin(pubkey, subkey);
  Serial.println("Pubnub Setup!");
  
}

void flash( int ledPin) {
  for (int i = 0; i < 3; i++) {
    digitalWrite(ledPin, HIGH);
    delay(100);
    digitalWrite(ledPin, LOW);
    delay(100);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  Ethernet.maintain();

  EthernetClient *client;

  char msg[64] = "{\"eon\":{\"sensor\":";
  sprintf(msg + strlen(msg), "%d", analogRead(analogIn));
  strcat(msg, "}}");

  Serial.print("Publishing message: ");
  Serial.println(msg);
  client = PubNub.publish(channel, msg);
  if(!client) {
    Serial.println("Publishing Error");
  } else {
    flash(publedPin);
    client->stop();
  }

  delay(500);
  
}
