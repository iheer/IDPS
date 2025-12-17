from flask import Flask, jsonify
from flask_cors import CORS
from traffic_logger import start_sniffing, get_traffic_data

app = Flask(__name__)
CORS(app)

start_sniffing()

@app.route("/api/live_stats")
def live_stats():
    data = get_traffic_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5000)

@app.route("/api/live_stats")
def get_live_stats():
    return jsonify({
        "activeThreats": 2,
        "blockedAttacks": 43,
        "trafficAnalyzed": "123.4 MB",
        "systemUptime": "5 hours 24 minutes"
    })
