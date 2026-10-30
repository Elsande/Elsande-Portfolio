# Iffo Elsande — React portfolio

Portfolio React + Vite dengan desain editorial, pilihan EN/ID, tema terang/gelap, animasi monogram, serta halaman arsip proyek. Konten mengikuti CV dan Profile PDF. Tanggal freelance mengikuti Profile: Juli 2024–Agustus 2026.

## Menjalankan

Gunakan Node.js 22.12+ dan npm.

```sh
npm install
npm run dev
```

Buka alamat localhost yang ditampilkan Vite. Gunakan server Vite; membuka HTML langsung melalui `file://` tidak menjalankan JSX.

```sh
npm run build     # hasil produksi di dist/
npm run preview   # melihat hasil build secara lokal
npm run check     # tes interaksi, build, dan pemeriksaan aset
```

Untuk instalasi ulang sesuai lockfile, gunakan `npm ci`.

## Struktur folder

```text
public/
  documents/cv.pdf         CV yang diunduh pengunjung
  images/portrait.webp    foto yang telah dioptimalkan
  favicon.svg
src/
  components/             Header, Footer, Loader, ProjectCard, ExternalLink
  sections/               Hero, About, Experience, SelectedWork, Skills, Contact
  pages/                  HomePage dan ProjectsPage
  data/                   profil, pengalaman, proyek, keahlian, terjemahan
  hooks/                  context dan hook preferensi bahasa/tema
  styles/                 base, components, layout, motion, responsive
  App.jsx                 susunan aplikasi dan pemilihan halaman
  main.jsx                entry React
  ...
docs/
  references/             Profile PDF dan foto asli
  plans/                  rancangan dan catatan migrasi
tests/                    tes React dan pemeriksaan build
index.html                entry beranda
projects.html             entry arsip proyek
vite.config.js            konfigurasi dua halaman dan pengujian
```

## Mengedit konten

- Ringkasan profil About EN/ID: `src/data/about.js`.
- Identitas, kontak, dan lokasi aset: `src/data/profile.js`.
- Pengalaman dan terjemahan deskripsinya: `src/data/experience.js`.
- Proyek, kategori, workflow, URL repository, dan deskripsi EN/ID: `src/data/projects.js`.
- Keahlian: `src/data/skills.js`.
- Teks antarmuka: `src/data/translations.js`. Teks Inggris menjadi key; nilainya terjemahan Indonesia. Baris baru memakai `\n` dan dirender sebagai teks, tanpa HTML mentah.
- Warna dan tipografi dasar: `src/styles/base.css`; breakpoint: `src/styles/responsive.css`.

## Perilaku

URL `/projects.html` tetap didukung langsung, tanpa router tambahan atau rewrite hosting. Deploy isi `dist/` ke hosting statis yang mendukung file HTML. Aplikasi belum dideploy oleh migrasi ini.

Loader tampil sekali per sesi tab dan menghormati pengaturan reduced motion. Pilihan bahasa/tema disimpan lokal bila storage tersedia; saat diblokir, pilihan tetap berfungsi selama halaman terbuka. Menu mobile mendukung Escape dan pengembalian fokus. Tombol salin email memakai clipboard browser dengan pesan fallback; fitur clipboard memerlukan HTTPS atau localhost. Tautan email membuka aplikasi email pengunjung. Tidak ada backend formulir kontak.

Grafik proyek merupakan ilustrasi workflow, bukan screenshot aplikasi atau klaim angka performa. URL repository mengikuti versi portfolio sebelumnya.

## Pengujian

`npm test` menguji komponen React dengan Vitest + jsdom, termasuk StrictMode, navigasi, filter, persistensi bahasa/tema, storage diblokir, loader, reduced motion, dan clipboard. `node tests/check-build.mjs` memeriksa hasil build yang sudah ada. Setup tes memakai storage asli jsdom untuk menghindari konflik global localStorage eksperimental Node 26.

## Ikon dan animasi

Ikon antarmuka menggunakan `lucide-react` melalui named imports. Ikon dekoratif diberi `aria-hidden`; nama tombol tetap tersedia untuk pembaca layar.

Animasi reveal memakai `src/components/Reveal.jsx` dan IntersectionObserver native, dengan CSS di `src/styles/motion.css`. Konten tetap terlihat jika observer tidak tersedia. Preferensi reduced motion menonaktifkan animasi, termasuk bila diubah saat halaman terbuka. Foto ditampilkan dalam warna asli tanpa filter grayscale atau blending.


Animasi masuk halaman menunggu loading pertama selesai. Baris pengalaman, keahlian, serta kartu proyek muncul bertahap saat scroll. Navigasi beranda–arsip menggunakan cross-document view transitions bila browser mendukungnya, dengan animasi masuk CSS sebagai fallback. Seluruh animasi dinonaktifkan ketika reduced motion aktif.
