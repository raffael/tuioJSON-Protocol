# The tuioJSON Protocol

In the attached document you'll find a detailed specification for the tuioJSON Protocol, a protocol to stream TUIO events via JSON format to JavaScript enabled clients.

The tuioJSON Protocol is the bridge between your TUIO based hardware and your Web Application. Using the tuioJSON Protocol, you can easily build multitouch enabled applications based on modern HMTL5 technologies.

In order to transmit data from your TUIO Server to your HTML5 Application, you need a Connector, that receives TUIO data and transmits it in tuioJSON format via, e.g., WebSockets to the Client Application (Editor's choice: the Touch&Write SDK).

## Parsing the protocol
Since this project only specifies the interface, you won't find a tuioJSON Parser in here. You will find the Parser project on https://github.com/raffael-me/tuioJSON-Parser