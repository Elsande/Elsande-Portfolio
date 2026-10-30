# Migrasi portfolio ke React

## Tujuan

Memindahkan portfolio statis yang ada ke React dengan struktur folder yang mudah dirawat. Mempertahankan desain editorial yang disetujui, isi berdasarkan CV/Profile, dan semua fitur yang sudah tersedia.

## Teknologi

React dengan Vite dan JavaScript. CSS biasa dipertahankan. Tidak memerlukan backend, UI library, state management library, atau layanan eksternal. Dependensi dicatat di package.json dan lockfile.

## Struktur

```text
public/
  images/portrait.webp
  documents/cv.pdf
  favicon.svg
src/
  components/       # Header, Footer, Loader, ProjectCard
  sections/         # Hero, About, Experience, SelectedWork, Skills, Contact
  pages/            # HomePage, ProjectsPage
  data/             # Profil, pengalaman, proyek, dan terjemahan EN/ID
  hooks/            # Preferensi bahasa dan tema dengan penanganan storage diblokir
  styles/           # Base, layout, components, responsive, dan motion
  App.jsx
  main.jsx
docs/
  references/       # PDF Profile dan foto asli
  plans/
tests/
index.html
projects.html
package.json
vite.config.js
README.md
```

Dua HTML menjadi entry Vite dan menggunakan aplikasi React yang sama. URL projects.html tetap berfungsi tanpa memerlukan aturan rewrite hosting atau router tambahan. App memilih halaman dari pathname.

## Perilaku dan data

State bahasa dan tema dikelola React dan diwariskan ke komponen melalui context kecil. Teks render menggunakan JSX dan data terstruktur, tanpa manipulasi innerHTML. Header menangani navigasi mobile, aria-expanded, Escape, dan penutupan setelah memilih tautan. Filter proyek menggunakan state lokal halaman proyek dan mengumumkan jumlah hasil.

Loader monogram tampil sekali per sesi tab, memiliki batas waktu, tidak memblokir pembacaan konten, dan menghormati prefers-reduced-motion. Clipboard memakai API browser dengan pesan fallback. Email tetap membuka aplikasi email pengunjung. CV bisa diunduh dari public/documents/cv.pdf. Konten dan tanggal freelance mengikuti keputusan sebelumnya: Juli 2024–Agustus 2026.

## Migrasi dan pembersihan

Pindahkan aset ke folder yang sesuai. Hapus script DOM dan entry statis lama setelah penggantinya tersedia, termasuk styles_loader.css yang tidak digunakan. Perbarui pengujian dan README untuk npm install, npm run dev, npm run build, dan npm run preview. Pertahankan dokumen sumber; jangan ubah folder lingkungan .agents, .codex, .aws, .git, atau skills.

## Verifikasi

Build kedua entry dengan Vite. Uji render dan interaksi bahasa, tema, navigasi mobile, filter, loader, dan fallback storage/clipboard. Periksa file hasil build, unduhan PDF, dan tautan lokal. Cek browser desktop/mobile bila browser pengujian dapat dijalankan; laporkan batasan bila tidak tersedia.

## Batas scope

Tidak mengubah arah desain, menambah klaim portfolio, membuat backend kontak, atau melakukan deployment.
