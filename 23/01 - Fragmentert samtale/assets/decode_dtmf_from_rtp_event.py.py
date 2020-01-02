# decode_dtmf_from_rtp_event.py
import sys, os, binascii
from scapy.all import *

packets = rdpcap('undecoded.pcap')
tones={}
for pkt in packets:
  if pkt.haslayer(UDP):
    packet = pkt[UDP]
    rtp=RTP(packet["Raw"].load)
    payload=rtp.payload["Raw"].load
    if len(payload) == 4:
      # https://tools.ietf.org/html/rfc2833#section-3.10i
      # tone is first 8bit
      if rtp.timestamp not in tones:
        tones[rtp.timestamp] = int(binascii.hexlify(payload[0]), 16)

print("DTMF tones: %s" % "".join([str(tones[x]) for x in sorted(tones.keys())]))