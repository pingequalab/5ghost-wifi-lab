# 5Ghost WiFi Lab

**Dual-band 2.4 / 5 GHz Wi-Fi security-research tool for the Flipper Zero + BW16 (RTL8720DN).**

5Ghost turns a Flipper Zero plus an inexpensive BW16 module into a dual-band Wi-Fi
field lab — scan both 2.4 **and 5 GHz**, map channel congestion, capture WPA
handshakes, run a captive portal, send beacons, or spin up an AP — behind a clean,
purpose-built UI with PMF-aware targeting.

> ⚠️ For **authorized testing and education only**. See [Legal](#legal).

<!-- screenshots: TODO add on-device captures (home / scan list / channel map / about) -->

## Why 5Ghost

- **5 GHz, not just 2.4** — most Flipper Wi-Fi tools are ESP32 (2.4 GHz only). The
  RTL8720DN adds the 5 GHz band: scanning, channel analysis, and 5 GHz handshake capture.
- **PMF-aware** — flags APs protected by 802.11w (Protected Management Frames), which are
  immune to deauth, so you don't waste time on targets that can't be knocked off.
- **Purpose-built UI** — every screen is custom-drawn for the 128×64 display (scan list,
  AP detail card, channel map, about), not stock menus.

## Features

| Feature | Notes |
|---|---|
| **Scan Wi-Fi** | Dual-band passive scan: SSID, RSSI, encryption, PMF, same-SSID mesh markers |
| **Channel Map** | 2.4 GHz + 5 GHz congestion view; highlights least-busy channels |
| **Capture Handshake** | WPA/WPA2 4-way handshake on 5 GHz → PCAP (crackable in hashcat/aircrack-ng) |
| **Deauth** | Targeted deauthentication |
| **Evil Portal** | Captive-portal credential capture; custom HTML from the SD card |
| **Create AP / Send Beacon** | Spin up an AP; beacon flood |

## Hardware

- Flipper Zero
- **BW16 (RTL8720DN)** module wired to the Flipper GPIO UART (pin 13 TX / pin 14 RX, plus GND and 3V3)
- The BW16 must run the 5Ghost companion firmware (see [Firmware](#firmware-bw16)).

## Firmware compatibility (Flipper side)

The `.fap` is built and verified against all three major firmwares:

| Flipper firmware | Tested build | API | Status |
|---|---|---|---|
| Official | 1.4.3 | 87.1 | ✅ |
| Momentum | mntm-012 | 87.1 | ✅ |
| Unleashed | unlshd-089 | 87.8 | ✅ |

Download `ghost5_wifi_lab.fap` from [Releases](../../releases) — a single build (API 87.1) loads on all three (87.1 is native on Official/Momentum and backward-compatible on Unleashed's 87.8).

## Install

1. Download `ghost5_wifi_lab.fap` from [Releases](../../releases).
2. Copy it to your Flipper SD card under `/ext/apps/GPIO/` (qFlipper or drag-and-drop).
3. On the Flipper, open **Apps → GPIO → 5Ghost WiFi Lab**.
4. Connect a BW16 running the companion firmware.

## Firmware (BW16)

The BW16 companion firmware is **not part of this release** — its distribution is being
planned separately (the attack layer derives from a GPLv3 upstream; see [NOTICE.md](NOTICE.md)).
Follow [pingequa.com](https://pingequa.com) for availability.

## Limitations (please read)

- **Mesh deauth**: deauthing one node of a same-SSID mesh often won't drop the client — it
  simply roams to another node/band. 5Ghost marks mesh duplicates so you can tell.
- **2.4 GHz handshakes**: the RTL8720DN can't reliably hear a client's 2.4 GHz uplink, so
  handshake capture runs on **5 GHz**.
- **PMF (802.11w)** APs are deauth-immune by design — 5Ghost flags them (`PMF!`) rather than
  pretending the attack will work.

## Legal

5Ghost WiFi Lab is for **authorized security testing and education only**. Only test networks
and devices you **own** or have **explicit written permission** to test. Unauthorized access to,
or disruption of, networks is illegal in most jurisdictions. You are solely responsible for
complying with all applicable laws and radio regulations (e.g. **FCC Part 15** in the US —
operating an intentional radiator may require authorization). This tool is provided **as-is,
with no warranty**, and the authors **accept no liability** for misuse or damage.

## Credits & License

Built on MIT-licensed open source. The Flipper FAP is distributed under the **MIT License**
(see [LICENSE](LICENSE)); full third-party attributions are in [NOTICE.md](NOTICE.md). The
`.fap` is shipped as a compiled binary; its source is not published.

— by **PINGEQUA** · [pingequa.com](https://pingequa.com)
