export const content = {
  biodata: {
    namaBrand: "pizzapie",
    jenisUsaha: "Makanan",
    kepemilikan: "Pribadi",
    jumlahPegawai: 1,
    namaPemilik: "Raymon",
    noWaPemilik: "6282257999523",
  },
  navbar: {
    hariOperasional: "Senin - Jum'at",
    jamOperasional: "16:30 - 23:00",
    noWaUsaha: "6282257999523",
    adaLogo: true,
    logo: "/images/logo.png",
  },
  hero: {
    produkTerlaris: {
      nama: "Pizza Coba",
      harga: 25000,
      hero: "/images/produkTerlaris.png",
    },
  },
  produk: [
    {
      src: "/images/product1.png",
      rating: 5,
      nama: "Pizza Crunchy Nyos",
      harga: 35000,
    },
    {
      src: "/images/product2.png",
      rating: 5,
      nama: "Pizza Lumer",
      harga: 60000,
    },
    {
      src: "/images/product3.png",
      rating: 5,
      nama: "Pizza Roll",
      harga: 40000,
    },
  ],
  testimoni: {
    tampilkanFotoProfil: true,
    list: [
      {
        nama: "Niko",
        isi: "Kulit pizzanya benar-benar renyah, kejunya meleleh sempurna, dan topping-nya terasa sangat segar. Jujur, ini pizza terenak yang pernah saya makan sejak lama",
        rating: 5,
        src: "/images/testimoni1.png",
      },
      {
        nama: "Heru",
        isi: "Rasanya sederhana tapi elegan. Saus tomatnya segar, basilnya wangi, dan kejunya benar-benar bikin nagih. Pizza klasik yang nggak pernah salah",
        rating: 5,
        src: "/images/testimoni2.png",
      },
      {
        nama: "Risa",
        isi: "Topping sayurannya segar banget, dari paprika, jamur, sampai zaitun. Ringan tapi tetap mengenyangkan, pas banget buat yang pengin makan sehat",
        rating: 5,
        src: "/images/testimoni3.png",
      },
    ],
  },
  faq: [
    {
      tanya: "Bisa pesan antar nggak?",
      jawab:
        "Bisa dong! Kita ada layanan antar cepat, pizzanya tetep hangat sampai rumah. Tinggal pesan online atau telpon, nanti langsung kita kirim.",
    },
    {
      tanya: "Boleh pilih topping sendiri?",
      jawab:
        "Tentu aja! Kamu bisa mix & match topping segar kita biar pizzanya pas banget sama selera kamu.",
    },
    {
      tanya: "Ada menu vegetarian atau vegan nggak?",
      jawab:
        "Ada kok! Kita punya pilihan pizza vegetarian yang enak banget, plus keju vegan kalau kamu mau.",
    },
  ],
  tentangKami: {
    slogan: "Slice Into Happiness",
    fotoRuko: "/images/ruko.png",
    keunggulan:
      "Pizza kita beda banget, karena rasanya seimbang bahan segar, topping mantap, dan adonannya selalu fresh tiap hari. Sayurannya dipilih yang paling oke, kejunya premium, meleleh bikin nagih. Adonannya dibiarin istirahat dulu biar empuk, terus dipanggang panas banget sampai kulitnya renyah tapi dalemnya lembut. Kita nggak pernah asal-asalan, tiap pizza dibuat dengan care biar setiap gigitan bikin puas.",
    poinKeunggulan: [
      "Selalu Pakai Bahan Fresh",
      "Kulit Pizza Matang Pas, Renyah di Luar, Lembut di Dalam",
      "Bisa Di-custom Sesuai Selera Kamu",
    ],
  },
  sertifikat: {
    ada: true,
    list: [
      {
        nama: "Sertifikat 1",
        localPath: "/images/sertifikat1.png",
      },
      {
        nama: "Sertifikat 2",
        localPath: "/images/sertifikat2.png",
      },
      {
        nama: "Sertifikat 3",
        localPath: "/images/sertifikat3.png",
      },
    ],
  },
  kontak: {
    mediaSosial: ["WhatsApp", "Instagram", "TikTok"],
    marketplace: ["Tidak berjualan di Marketplace"],
    ojekOnline: ["GoFood", "GrabFood", "ShopeeFood"],
    akun: "Instagram @grobakonlen, Tiktok @grobakonlen",
    lokasi: {
      alamat: "Universitas Muhammadiyah Purwokerto",
      alamat2: "",
      kota: "Banyumas",
      provinsi: "Jawa Tengah",
      kodePos: "",
      negara: "Indonesia",
    },
    linkGmaps: "https://maps.app.goo.gl/MrQNF2eV33zWErNm8",
  },
  buktiTf: true,
};

export type ContentType = typeof content;
