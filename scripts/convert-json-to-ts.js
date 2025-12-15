const fs = require("fs");
const path = require("path");

console.log("🚀 Starting conversion...");
console.log("📁 Current directory:", process.cwd());

// Check if content.json exists
const contentPath = "./scripts/content.json";
if (!fs.existsSync(contentPath)) {
  console.error("❌ content.json not found!");
  console.log("📁 Files in current directory:");
  try {
    const files = fs.readdirSync(".");
    files.forEach((file) => console.log(`   - ${file}`));
  } catch (e) {
    console.log("Error reading directory");
  }
  process.exit(1);
}

try {
  // Read and parse JSON
  console.log("📖 Reading content.json...");
  const rawData = fs.readFileSync(contentPath, "utf8");
  const jsonData = JSON.parse(rawData);
  const data = Array.isArray(jsonData) ? jsonData[0] : jsonData;

  console.log("✅ JSON parsed successfully");
  console.log("📊 Available fields:", Object.keys(data).length);

  // Create data directory
  const dataDir = "./data";
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("📁 Created data directory");
  }

  // Helper functions
  const parseBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return Boolean(value);
  };

  const cleanString = (str) => {
    if (!str || typeof str !== "string") return "";
    return str.trim();
  };

  const cleanNumber = (num) => {
    if (typeof num === "number") return num;
    if (typeof num === "string") {
      const parsed = Number.parseFloat(num);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Build clean content object
  const content = {
    biodata: {
      namaBrand: cleanString(data["Nama Merk/Brand Usaha"]) || "Unknown Brand",
      jenisUsaha: cleanString(data["Jenis Usaha"]) || "Unknown",
      kepemilikan: cleanString(data["Kepemilikan Usaha"]) || "Unknown",
      jumlahPegawai: cleanNumber(data["Jumlah Pegawai Saat Ini"]),
      namaPemilik: cleanString(data["Nama Pemilik Usaha"]) || "Unknown",
      noWaPemilik: cleanString(data["No. WA Pemilik Usaha"]) || "",
    },

    navbar: {
      hariOperasional: cleanString(data["Hari Operasional Usaha"]) || "",
      jamOperasional: cleanString(data["Jam Operasional Usaha"]) || "",
      noWaUsaha: cleanString(data["No. WA Usaha"]) || "",
      adaLogo: parseBoolean(data["Apakah Usaha Anda Memiliki Logo?"]),
      logo: parseBoolean(data["Apakah Usaha Anda Memiliki Logo?"])
        ? "/images/logo.png"
        : "",
    },

    hero: {
      produkTerlaris: {
        nama: cleanString(data["Nama Produk Terlaris"]) || "",
        harga: cleanNumber(data["Harga Produk Terlaris"]),
        hero: "/images/produkTerlaris.jpg",
      },
    },

    produk: (() => {
      const jumlahProduk = cleanNumber(
        data["Berapa Menu Yang Ingin Anda Tampilkan?"]
      );
      const products = [];

      for (let i = 1; i <= jumlahProduk; i++) {
        const nama = cleanString(data[`Nama Produk ${i}`]);
        const harga = cleanNumber(data[`Harga Produk ${i}`]);

        if (nama && harga > 0) {
          products.push({
            src: `/images/product${i}.jpg`,
            rating: cleanNumber(data[`Rating Bintang Produk ${i}`]),
            nama: nama,
            harga: harga,
          });
        }
      }

      return products;
    })(),

    testimoni: (() => {
      const jumlahTestimoni = cleanNumber(
        data["Berapa Testimoni Yang Ingin Anda Tampilkan?"]
      );
      const tampilkanFoto = parseBoolean(
        data["Apakah Anda Ingin Menampilkan Foto Profil Pelanggan?"]
      );
      const testimonials = [];

      for (let i = 1; i <= jumlahTestimoni; i++) {
        const nama = cleanString(data[`Nama Pelanggan ${i}`]);
        const isi = cleanString(data[`Testimoni Pelanggan ${i}`]);

        if (nama && isi) {
          const testimoni = {
            nama: nama,
            isi: isi,
            rating: cleanNumber(data[`Rating Bintang Pelanggan ${i}`]),
          };

          if (tampilkanFoto) {
            testimoni.src = `/images/testimoni${i}.png`;
          }

          testimonials.push(testimoni);
        }
      }

      return {
        tampilkanFotoProfil: tampilkanFoto,
        list: testimonials,
      };
    })(),

    faq: (() => {
      const jumlahFaq = cleanNumber(
        data["Berapa FAQ/Pertanyaan Umum Yang Ingin Anda Tampilkan?"]
      );
      const faqs = [];

      for (let i = 1; i <= jumlahFaq; i++) {
        const tanya = cleanString(data[`Pertanyaan ${i}`]);
        const jawab = cleanString(data[`Jawaban ${i}`]);

        if (tanya && jawab) {
          faqs.push({ tanya, jawab });
        }
      }

      return faqs;
    })(),

    tentangKami: {
      slogan: cleanString(data["Slogan Usaha Anda"]) || "",
      fotoRuko: "/images/ruko.jpg",
      keunggulan:
        cleanString(
          data["Deskripsikan Keunggulan Produk Anda Dibanding Kompetitor"]
        ) || "",
      poinKeunggulan: [
        cleanString(data["Poin Keunggulan Pertama"]),
        cleanString(data["Poin Keunggulan Kedua"]),
        cleanString(data["Poin Keunggulan Ketiga"]),
      ].filter((poin) => poin !== ""),
    },

    sertifikat: (() => {
      const adaSertifikat = parseBoolean(
        data["Apakah Usaha Anda Memiliki Sertifikasi ( Halal, BPOM, dll )"]
      );
      const sertifikats = [];

      if (adaSertifikat) {
        for (let i = 1; i <= 3; i++) {
          const url = data[`Sertifikat ${i}`];
          if (url && url.trim() !== "") {
            sertifikats.push({
              nama: `Sertifikat ${i}`,
              localPath: `/images/sertifikat${i}.png`,
            });
          }
        }
      }

      return {
        ada: adaSertifikat,
        list: sertifikats,
      };
    })(),

    kontak: {
      mediaSosial: (data["Apa Saja Media Sosial Yang Usaha Anda Pakai?"] || "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      marketplace: (data["Apa Saja Marketplace Yang Usaha Anda Pakai?"] || "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      ojekOnline: (data["Apa Saja Layanan Ojek Online Yang Digunakan?"] || "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      akun: cleanString(
        data["Nama Akun Media Sosial, Marketplace Usaha, & Layanan Ojek Online"]
      ),
      lokasi: {
        alamat: cleanString(data["Address - Lokasi Usaha"]),
        alamat2: cleanString(data["Address Line2 - Lokasi Usaha"]),
        kota: cleanString(data["City - Lokasi Usaha"]),
        provinsi: cleanString(data["State - Lokasi Usaha"]),
        kodePos: cleanString(data["Zip Code - Lokasi Usaha"]),
        negara: cleanString(data["Country - Lokasi Usaha"]),
      },
      linkGmaps: cleanString(data["Link Google Maps"]),
    },

    buktiTf: Boolean(data["Kirim Bukti Transfer"]),
  };

  // Generate sosmed data
  const generateSosmedData = () => {
    const mediaSosial = content.kontak.mediaSosial;
    const akunInfo = content.kontak.akun;

    const sosmedData = mediaSosial.map((platform) => {
      let url = "#";
      let username = "";

      // Extract username from account info
      const extractUsername = (platform, text) => {
        const patterns = {
          instagram: [
            /instagram[\s:]*[@]?([\w.]+)/i,
            /ig[\s:]*[@]?([\w.]+)/i,
            /@([\w.]+)/i,
          ],
          tiktok: [/tiktok[\s:]*[@]?([\w.]+)/i, /tt[\s:]*[@]?([\w.]+)/i],
          facebook: [/facebook[\s:]*[@]?([\w.]+)/i, /fb[\s:]*[@]?([\w.]+)/i],
          youtube: [/youtube[\s:]*[@]?([\w.]+)/i, /yt[\s:]*[@]?([\w.]+)/i],
          twitter: [/twitter[\s:]*[@]?([\w.]+)/i, /x[\s:]*[@]?([\w.]+)/i],
        };

        const platformPatterns = patterns[platform.toLowerCase()] || [];
        for (const pattern of platformPatterns) {
          const match = text.match(pattern);
          if (match && match[1]) {
            return match[1];
          }
        }
        return null;
      };

      // Generate URL based on platform
      switch (platform.toLowerCase()) {
        case "whatsapp":
          const waNumber = content.navbar.noWaUsaha.replace(/\D/g, "");
          url = `https://wa.me/${waNumber}`;
          username = content.navbar.noWaUsaha;
          break;
        case "instagram":
          username = extractUsername("instagram", akunInfo);
          if (username) {
            url = `https://instagram.com/${username}`;
          }
          break;
        case "tiktok":
          username = extractUsername("tiktok", akunInfo);
          if (username) {
            url = `https://tiktok.com/@${username}`;
          }
          break;
        case "facebook":
          username = extractUsername("facebook", akunInfo);
          if (username) {
            url = `https://facebook.com/${username}`;
          }
          break;
        case "youtube":
          username = extractUsername("youtube", akunInfo);
          if (username) {
            url = `https://youtube.com/@${username}`;
          }
          break;
        case "twitter":
          username = extractUsername("twitter", akunInfo);
          if (username) {
            url = `https://twitter.com/${username}`;
          }
          break;
        default:
          url = "#";
      }

      return {
        platform: platform,
        url: url,
        username: username || platform,
      };
    });

    return sosmedData;
  };

  // Generate image mapping for download reference
  const generateImageMapping = () => {
    const imageMapping = {
      totalImages: 0,
      required: {},
      optional: {},
    };

    // Required images
    const requiredImages = {
      produkTerlaris: data["Foto Produk Terlaris"],
      ruko: data["Foto Ruko/Gerobak"],
    };

    // Optional images
    const optionalImages = {
      logo: data["Logo"],
      buktiTransfer: data["Kirim Bukti Transfer"],
    };

    // Process required images
    Object.entries(requiredImages).forEach(([key, url]) => {
      if (url && url.trim() !== "") {
        imageMapping.required[key] = {
          originalUrl: url,
          localPath: `/images/${key}.png`,
          filename: `${key}.png`,
        };
        imageMapping.totalImages++;
      }
    });

    // Process optional images
    Object.entries(optionalImages).forEach(([key, url]) => {
      if (url && url.trim() !== "") {
        imageMapping.optional[key] = {
          originalUrl: url,
          localPath: `/images/${key}.png`,
          filename: `${key}.png`,
        };
        imageMapping.totalImages++;
      }
    });

    // Process product images
    imageMapping.produk = {};
    for (
      let i = 1;
      i <= cleanNumber(data["Berapa Menu Yang Ingin Anda Tampilkan?"]);
      i++
    ) {
      const url = data[`Foto Produk ${i}`];
      if (url && url.trim() !== "") {
        imageMapping.produk[`product${i}`] = {
          originalUrl: url,
          localPath: `/images/product${i}.png`,
          filename: `product${i}.png`,
          productName: data[`Nama Produk ${i}`] || `Produk ${i}`,
        };
        imageMapping.totalImages++;
      }
    }

    // Process testimonial images
    if (content.testimoni.tampilkanFotoProfil) {
      imageMapping.testimoni = {};
      for (
        let i = 1;
        i <= cleanNumber(data["Berapa Testimoni Yang Ingin Anda Tampilkan?"]);
        i++
      ) {
        const url = data[`Foto Profil Pelanggan ${i}`];
        if (url && url.trim() !== "") {
          imageMapping.testimoni[`testimoni${i}`] = {
            originalUrl: url,
            localPath: `/images/testimoni${i}.png`,
            filename: `testimoni${i}.png`,
            customerName: data[`Nama Pelanggan ${i}`] || `Pelanggan ${i}`,
          };
          imageMapping.totalImages++;
        }
      }
    }

    // Process certification images
    if (content.sertifikat.ada) {
      imageMapping.sertifikat = {};
      for (let i = 1; i <= 3; i++) {
        const url = data[`Sertifikat ${i}`];
        if (url && url.trim() !== "") {
          imageMapping.sertifikat[`sertifikat${i}`] = {
            originalUrl: url,
            localPath: `/images/sertifikat${i}.png`,
            filename: `sertifikat${i}.png`,
          };
          imageMapping.totalImages++;
        }
      }
    }

    return imageMapping;
  };

  const sosmedData = generateSosmedData();
  const imageMapping = generateImageMapping();

  // Write clean content.ts
  const contentOutput = `export const content = ${JSON.stringify(
    content,
    null,
    2
  )};

export type ContentType = typeof content;
`;

  // Write sosmed.ts
  const sosmedOutput = `export const sosmed = ${JSON.stringify(
    sosmedData,
    null,
    2
  )};

export type SosmedType = typeof sosmed;
`;

  // Write image-mapping.json
  const imageMappingOutput = JSON.stringify(imageMapping, null, 2);

  // Write all files
  fs.writeFileSync(path.join(dataDir, "content.ts"), contentOutput, "utf8");
  console.log("✅ content.ts created successfully");

  fs.writeFileSync(path.join(dataDir, "sosmed.ts"), sosmedOutput, "utf8");
  console.log("✅ sosmed.ts created successfully");

  fs.writeFileSync(
    path.join(dataDir, "image-mapping.json"),
    imageMappingOutput,
    "utf8"
  );
  console.log("✅ image-mapping.json created successfully");

  // Generate download script
  const downloadScript = `#!/bin/bash
# Auto-generated image download script
# This script will download all images from the form to public/images/

echo "🚀 Starting image download..."
mkdir -p public/images

${Object.entries(imageMapping.required)
  .map(
    ([key, img]) =>
      `echo "📥 Downloading ${key}..."
curl -L "${img.originalUrl}" -o "public/images/${img.filename}"`
  )
  .join("\n")}

${Object.entries(imageMapping.optional)
  .map(
    ([key, img]) =>
      `echo "📥 Downloading ${key}..."
curl -L "${img.originalUrl}" -o "public/images/${img.filename}"`
  )
  .join("\n")}

${Object.entries(imageMapping.produk || {})
  .map(
    ([key, img]) =>
      `echo "📥 Downloading ${img.productName}..."
curl -L "${img.originalUrl}" -o "public/images/${img.filename}"`
  )
  .join("\n")}

${Object.entries(imageMapping.testimoni || {})
  .map(
    ([key, img]) =>
      `echo "📥 Downloading ${img.customerName} photo..."
curl -L "${img.originalUrl}" -o "public/images/${img.filename}"`
  )
  .join("\n")}

${Object.entries(imageMapping.sertifikat || {})
  .map(
    ([key, img]) =>
      `echo "📥 Downloading ${key}..."
curl -L "${img.originalUrl}" -o "public/images/${img.filename}"`
  )
  .join("\n")}

echo "✅ All ${imageMapping.totalImages} images downloaded successfully!"
echo "📁 Images saved to: public/images/"
`;

  fs.writeFileSync("./scripts/download-images.sh", downloadScript, "utf8");
  console.log("✅ download-images.sh created successfully");

  // Summary
  console.log("\n📊 Summary:");
  console.log(`- Brand: ${content.biodata.namaBrand}`);
  console.log(`- Produk: ${content.produk.length} items`);
  console.log(`- Testimoni: ${content.testimoni.list.length} items`);
  console.log(`- FAQ: ${content.faq.length} items`);
  console.log(`- Sertifikat: ${content.sertifikat.list.length} items`);
  console.log(
    `- Poin Keunggulan: ${content.tentangKami.poinKeunggulan.length} items`
  );
  console.log(`- Media Sosial: ${sosmedData.length} platforms`);
  console.log(`- Total Gambar: ${imageMapping.totalImages} files`);

  console.log("\n🔗 Media Sosial:");
  sosmedData.forEach((social) => {
    console.log(`- ${social.platform}: ${social.url}`);
  });

  console.log("\n✅ All files generated successfully!");
  console.log("📝 Files created:");
  console.log("   - data/content.ts (clean, no metadata)");
  console.log("   - data/sosmed.ts");
  console.log("   - data/image-mapping.json");
  console.log("   - download-images.sh");

  console.log("\n🖼️  To download all images automatically:");
  console.log("   chmod +x download-images.sh");
  console.log("   ./scripts/download-images.sh");
  console.log("");
  console.log("   Or run it step by step:");
  console.log("   1. chmod +x download-images.sh  (make it executable)");
  console.log("   2. ./download-images.sh         (run the download)");
  console.log("");
  console.log(
    `   This will download ${imageMapping.totalImages} images to public/images/`
  );
} catch (error) {
  console.error("❌ Error during conversion:", error.message);
  console.error("Stack trace:", error.stack);
  process.exit(1);
}
