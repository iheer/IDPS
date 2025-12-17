# traffic_logger.py
from scapy.all import sniff
import json
import threading
import time

traffic_data = {
    "packets_per_second": 0,
    "suspicious_ips": []
}

packet_count = 0

def count_packets(pkt):
    global packet_count
    packet_count += 1

def monitor_packets():
    sniff(prn=count_packets, store=0)

def update_json():
    global packet_count
    while True:
        time.sleep(2)
        traffic_data["packets_per_second"] = packet_count // 2
        packet_count = 0
        with open("network.json", "w") as f:
            json.dump(traffic_data, f)

def start_sniffing():
    threading.Thread(target=monitor_packets, daemon=True).start()
    threading.Thread(target=update_json, daemon=True).start()

def get_traffic_data():
    return traffic_data
