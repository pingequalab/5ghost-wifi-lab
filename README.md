<h1 align="center">5Ghost WiFi Lab</h1>

<p align="center">
  <strong>Dual-band 2.4 + 5 GHz Wi-Fi recon &amp; security testing for Flipper Zero.</strong><br>
  The first BW16 toolkit that's <em>integrated, reliable, dual-band, and PMF-aware</em> —<br>
  preloaded on the PINGEQUA 5G board. Plug into the GPIO header and go. No wiring, no flashing.
</p>

<p align="center">
  <img alt="Bands: 2.4 + 5 GHz" src="https://img.shields.io/badge/Wi--Fi-2.4%20%2B%205%20GHz-ff6b00">
  <img alt="Firmware: Official · Momentum · Unleashed" src="https://img.shields.io/badge/Firmware-Official%20%C2%B7%20Momentum%20%C2%B7%20Unleashed-44a8b3">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue">
  <img alt="Version 2.0" src="https://img.shields.io/badge/app-v2.0-555">
</p>

<p align="center">
  <img src="assets/board-antenna.jpg" width="540" alt="PINGEQUA Flipper Zero 5G WiFi dev board with 8dBi high-gain antenna">
</p>

---

## Why 5Ghost?

Almost every Flipper Wi-Fi tool is **2.4 GHz only** — the popular ESP32-based ones *can't* do 5 GHz, because the chip has no 5 GHz radio. The handful of tools on **BW16 / RTL8720DN** hardware (which *does* have 5 GHz) are scattered: one does deauth, another does sniffing, most can't capture a handshake reliably, and **none of them tell you when an AP is immune to your attack.**

**5Ghost pulls it together on a single board** — and puts the 5 GHz radio to work where it matters most.

- 🛰️ **Real 5 GHz.** Scan, capture handshakes, and analyze the 5 GHz band that 2.4-only tools simply can't see.
- 🛡️ **PMF-aware.** It flags 802.11w (Protected Management Frames) APs — the ones that *ignore* deauth — so you stop wasting time on dead ends. Almost no other tool does this.
- 🤝 **Handshakes that actually land.** On-device WPA/WPA2 4-way handshake capture straight to a standard PCAP — verified on real hardware, crackable in hashcat / aircrack-ng.
- 🎛️ **One clean app.** Purpose-built UI for the 128×64 screen, not a wall of serial commands.

---

## 🛒 Get the board

| Product | Description |
|---|---|
| **[Flipper Zero 5G WiFi Module →](https://www.pingequa.com/products/flipper-zero-5g-wifi-module)** | The dual-band RTL8720DN dev board, **preloaded with 5Ghost firmware**. |
| **[5G WiFi Board + 8 dBi Antenna →](https://www.pingequa.com/products/flipper-zero-dual-band-5ghz-2-4ghz-wifi-devboard-preloaded-firmware-rtl8720dn-bw16-gpio-module-with-high-gain-8dbi-external-antenna-long-range-iot-network-analysis-packet-monitor-tool)** | Same board bundled with a long-range **8 dBi external antenna**. |

> ⚠️ **Built for the PINGEQUA board.** Other BW16 / RTL8720DN boards ship different firmware, pinouts, and antennas — they are **not supported** and may not work.

<p align="center">
  <img src="assets/board.jpg" width="430" alt="BW16 RTL8720DN module on the PINGEQUA dev board">
</p>

---

## Features

| | Feature | What it does — and why it matters |
|---|---|---|
| 📡 | **Dual-band scan** | Lists 2.4 **and 5 GHz** APs with signal, encryption, **precise PMF** (capable / required), and same-SSID mesh markers. The PMF flag tells you up front which APs will ignore a deauth. |
| 📊 | **Channel Map** | A congestion view across both bands with the least-busy channel highlighted — pick a clear channel, or find where the targets are. |
| 🤝 | **Capture Handshake** | Forces a reconnect and grabs the WPA/WPA2 4-way handshake on **5 GHz**, written as a standard PCAP to the SD card. Drop it straight into hashcat (22000) or aircrack-ng. |
| 🪤 | **Evil Portal** | Captive-portal credential capture with a clean modern page — **or load your own HTML** from the SD card. Auto-opens on iOS. |
| 🚫 | **PMF-aware Deauth** | Deauth on 2.4 + 5 GHz, and it tells you when a target is 802.11w-protected (deauth-immune) instead of failing silently. Hits every same-SSID mesh node in one pass. |
| 📶 | **Create AP · Send Beacon** | Stand up a soft AP or flood custom / random / Rickroll beacons. |
| 💾 | **Everything to SD** | Scans (CSV), captured credentials, and handshakes (PCAP) all save to `/ext/apps_data/5ghost/`, with on-screen save confirmation. |

---

## Screens

| Home | Scan |
|:---:|:---:|
| ![Home menu — firmware status + tools](assets/screenshots/home.png) | ![Scan list — lock, SSID, RSSI, mesh markers](assets/screenshots/scan-list.png) |
| **AP detail** | **Channel Map** |
| ![AP detail — encryption, channel, band, MAC + actions](assets/screenshots/ap-detail.png) | ![Channel Map — band congestion + best channel](assets/screenshots/channel-map.png) |

---

## How it compares

|  | **5Ghost WiFi Lab** | 2.4 GHz tools<br>(ESP32 / Marauder-class) | Other BW16 firmware |
|---|:---:|:---:|:---:|
| **5 GHz** scan + attack | ✅ | ❌ *(no 5 GHz radio)* | partial |
| Handshake → **PCAP on device** | ✅ verified | varies | limited / standalone |
| **PMF / 802.11w** awareness | ✅ | ❌ | ❌ |
| Evil Portal + **custom HTML** | ✅ | varies | rare |
| Native **Flipper app** UI | ✅ | ✅ | often serial / Web UI only |
| **One build** for 3 firmwares | ✅ | — | varies |

The 5 GHz radio + PMF awareness + a reliable on-device handshake path is the combination no single tool offered before. *(Capabilities of other projects vary by version — check their docs.)*

---

## Compatibility

One universal `.fap` build runs on the three major Flipper firmwares:

**Official** · **Momentum** · **Unleashed**

It's a companion app **for Flipper Zero**, designed for the PINGEQUA 5G WiFi board (RTL8720DN / BW16) over the GPIO UART.

---

## Install

1. Download the latest **`.fap`** from [**Releases**](../../releases).
2. Copy it to your Flipper SD card under `/ext/apps/GPIO/`.
3. Plug in your PINGEQUA 5G board and open **Apps → GPIO → 5Ghost WiFi Lab**.

The board ships **preloaded** — there's nothing to flash.

---

## Good to know (and honest limits)

- **5 GHz does the heavy lifting.** Handshake capture runs on 5 GHz, where the RTL8720DN reliably hears the client — something 2.4 GHz-only tools can't reach.
- **PMF-protected APs can't be deauthed** — that's 802.11w working as designed, on *any* tool. 5Ghost's value is that it **tells you**, instead of letting you guess.
- **Mesh roaming is hard.** Same-channel mesh nodes are hit in one pass; cross-channel 802.11r roaming is difficult to fully suppress on single-radio hardware. No tool truly solves this.
- **Android captive-portal auto-open** can be blocked by Private DNS / DoH — the portal still appears when the user opens any HTTP page.

---

## Legal

For **authorized testing and education only.** Only test networks and devices you **own** or have **explicit written permission** to test. You are responsible for complying with all applicable laws and radio regulations (e.g. **FCC Part 15** in the US). Provided **as-is, with no warranty.**

---

## License &amp; credits

The Flipper app is distributed as a compiled `.fap` under the **MIT License** (see [LICENSE](LICENSE)). Third-party attributions are in [NOTICE.md](NOTICE.md).

<p align="center">
  <sub><strong>PINGEQUA</strong> · <a href="https://pingequa.com">pingequa.com</a></sub>
</p>
