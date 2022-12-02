from microdot_asyncio import Microdot, Response, send_file
from microdot_utemplate import render_template
from dht_module import DHTModule
import ujson

# Our DHT Module
dht_sensor = DHTModule(22)

app = Microdot()
Response.default_content_type = 'text/html'


@app.route('/')
async def index(request):
    return render_template('index.html')


@app.route('/updateValues')
async def get_dht_reads(request):
    print("Receive get values request!")
    sensor_reads = dht_sensor.get_values()
    return ujson.dumps(sensor_reads)


@app.route('/shutdown')
async def shutdown(request):
    request.app.shutdown()
    return 'The server is shutting down...'


@app.route('/static/<path:path>')
def static(request, path):
    if '..' in path:
        # directory traversal is not allowed
        return 'Not found', 404
    return send_file('static/' + path)

app.run()