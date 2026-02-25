# tercan.github.io

Tercan Keskin'in kişisel proje vitrini olarak hazırlanan, GitHub Pages üzerinde yayınlanan statik web sitesi.

English version is available below: [English Version](#english-version).

**Quick Links:** [TR](#tr-toc) | [EN](#en-toc)

<a id="tr-toc"></a>
## İçindekiler (TR)

[EN TOC'ye geç](#en-toc)

- [Proje Özeti](#tr-project-summary)
- [Özellikler](#tr-features)
- [Teknoloji Yığını](#tr-tech-stack)
- [Yerel Geliştirme](#tr-local-development)
- [Yayınlama](#tr-deployment)
- [Dizin Yapısı](#tr-directory-structure)
- [Sürüm Geçmişi](#tr-changelog)
- [English Version](#english-version)

<a id="tr-project-summary"></a>
## Proje Özeti

Bu sayfada öne çıkan projeler listelenir:

- Terkip
- Telkari
- Tabibe
- WP Heading Buttons

Site; Türkçe/İngilizce içerik değişimi, açık/koyu tema desteği ve mobil uyumlu bir kart düzeni sunar.

<a id="tr-features"></a>
## Özellikler

- Statik HTML/CSS/JavaScript mimarisi
- EN-TR dil desteği
- Light/Dark tema geçişi
- Erişilebilirlik odaklı etkileşimler (odak stilleri, aria etiketleri)
- SEO temel bileşenleri (`canonical`, Open Graph, Twitter meta, `robots.txt`, `sitemap.xml`)

<a id="tr-tech-stack"></a>
## Teknoloji Yığını

- HTML5
- CSS3
- Vanilla JavaScript

<a id="tr-local-development"></a>
## Yerel Geliştirme

Bu proje build adımı gerektirmez. Yerelde test için bir HTTP sunucu ile çalıştırın:

```bash
cd /Users/tercan/Dev/personal/tercan.github.io
python3 -m http.server 5500
```

Ardından tarayıcıda:

```text
http://localhost:5500
```

<a id="tr-deployment"></a>
## Yayınlama

Proje GitHub Pages üzerinde `main` branch üzerinden yayınlanır.

Örnek sürüm etiketleme akışı:

```bash
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin main
git push origin v0.2.0
```

<a id="tr-directory-structure"></a>
## Dizin Yapısı

```text
.
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── favicon.png
├── tercan-keskin.jpg
├── README.md
└── CHANGELOG.md
```

<a id="tr-changelog"></a>
## Sürüm Geçmişi

Sürüm notları için:

- [CHANGELOG.md](./CHANGELOG.md)

---

<a id="en-toc"></a>
## English Version

Static website published on GitHub Pages as Tercan Keskin's personal project showcase.

[Go to TR TOC](#tr-toc)

### Table of Contents (EN)

- [Project Summary](#en-project-summary)
- [Features](#en-features)
- [Technology Stack](#en-tech-stack)
- [Local Development](#en-local-development)
- [Deployment](#en-deployment)
- [Directory Structure](#en-directory-structure)
- [Changelog](#en-changelog)

<a id="en-project-summary"></a>
### Project Summary

This page highlights the following projects:

- Terkip
- Telkari
- Tabibe
- WP Heading Buttons

The site provides Turkish/English language switching, light/dark theme support, and a mobile-friendly card layout.

<a id="en-features"></a>
### Features

- Static HTML/CSS/JavaScript architecture
- EN-TR language support
- Light/Dark theme toggle
- Accessibility-focused interactions (focus styles, aria labels)
- Core SEO setup (`canonical`, Open Graph, Twitter meta, `robots.txt`, `sitemap.xml`)

<a id="en-tech-stack"></a>
### Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript

<a id="en-local-development"></a>
### Local Development

This project does not require a build step. Run a local HTTP server for testing:

```bash
cd /Users/tercan/Dev/personal/tercan.github.io
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

<a id="en-deployment"></a>
### Deployment

The project is published via the `main` branch on GitHub Pages.

Example release tagging flow:

```bash
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin main
git push origin v0.2.0
```

<a id="en-directory-structure"></a>
### Directory Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── favicon.png
├── tercan-keskin.jpg
├── README.md
└── CHANGELOG.md
```

<a id="en-changelog"></a>
### Changelog

For release notes:

- [CHANGELOG.md](./CHANGELOG.md)
