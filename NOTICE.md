# NOTICE — Third-party attributions

5Ghost WiFi Lab (by PINGEQUA) is a derivative work. It builds upon the
following open-source projects. Original copyright and license notices are
retained as required.

## Flipper FAP

- **gorebrau/delfyRTL** — MIT License
  https://github.com/gorebrau/delfyRTL
  Base for the Flipper application (UART control of BW16) and the bundled
  RTL8720DN firmware.

- **jamisonderek/flipper-zero-tutorials** — UART helper / ring buffer pattern
  https://github.com/jamisonderek/flipper-zero-tutorials
  `uart_helper.c/.h`, `ring_buffer.c/.h` originate from the UART example.

## BW16 (RTL8720DN) firmware

- **tesa-klebeband/RTL8720dn-Deauther** — **GNU GPL v3**
  https://github.com/tesa-klebeband/RTL8720dn-Deauther
  Source of the 2.4/5GHz attack layer (`wifi_cust_tx`, deauth logic).
  Upstream license text: `firmware/RTL8720dn-firmware/LICENSE`.
  NOTE: GPLv3 is copyleft — any **distributed** BW16 firmware derived from this
  must itself be GPLv3 (source disclosed). This constrains firmware distribution
  only; the Flipper FAP does not contain or link this code.

## Handshake capture (Task #14 — planned, original implementation)

WPA/WPA2 4-way handshake capture will be written from the Realtek Ameba SDK
promiscuous-mode API (`wifi_set_promisc`), as original code. Third-party
projects such as Cancro29/RTL8720dn-Handshake-Capture (license unconfirmed)
are NOT incorporated — so no attribution is owed for that feature.

---

5Ghost WiFi Lab original additions (protocol, branding, refactor, new
features) © PINGEQUA. The Flipper **FAP** is MIT-licensed (see `LICENSE`) and
distributed as a compiled `.fap` binary; its source is not published (MIT does
not require source disclosure). The **BW16 firmware** derives from a GPLv3
upstream (tesa-klebeband) — its distribution is planned separately and, if
distributed, must comply with GPLv3. See the project README.
