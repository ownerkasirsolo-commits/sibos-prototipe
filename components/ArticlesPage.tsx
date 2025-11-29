import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, Clock, Tag, ChevronRight } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "Era Baru Ritel: Mengapa Kasir Saja Tidak Cukup?",
    category: "Edukasi Bisnis",
    date: "10 Oktober 2025",
    author: "Amin Maghfuri",
    readTime: "5 Menit",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Dunia ritel telah berubah. Mesin kasir yang hanya mencatat angka kini harus berevolusi menjadi otak bisnis yang cerdas.",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-gray-300">
          Masih ingatkah Anda pada mesin kasir 'kling-klung' zaman dulu? Yang fungsinya hanya menyimpan uang dan mencetak struk sederhana. Di tahun 2025 ini, menggunakan alat seperti itu sama saja dengan berperang menggunakan bambu runcing melawan tank.
        </p>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Pergeseran Perilaku Konsumen</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Pelanggan hari ini tidak hanya membeli produk; mereka membeli pengalaman. Mereka ingin tahu apakah stok tersedia via WhatsApp sebelum datang ke toko. Mereka ingin poin loyalty mereka terintegrasi saat belanja online maupun offline. Inilah yang disebut era <strong>Omnichannel</strong>.
        </p>
        <p className="mb-6 leading-relaxed text-gray-300">
          SIBOS lahir dari keresahan ini. Kami melihat banyak toko yang tutup bukan karena produknya jelek, tapi karena manajemennya buta. Mereka tidak tahu barang mana yang <em>fast-moving</em>, mereka tidak tahu kebocoran stok di gudang, dan mereka tidak punya data pelanggan.
        </p>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Data Adalah Emas Baru</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Dalam ekosistem SIBOS, setiap transaksi adalah data. 
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Jam berapa toko paling ramai?</li>
            <li>Siapa pelanggan yang paling sering belanja?</li>
            <li>Produk apa yang sering dibeli bersamaan (bundling)?</li>
          </ul>
        </p>
        <p className="mb-6 leading-relaxed text-gray-300">
          Jawaban dari pertanyaan di atas bukan sekadar angka, tapi strategi. Dengan fitur AI Assistant di SIBOS, data tersebut diolah menjadi saran praktis: <em>"Stok Kopi Arabika menipis, segera order ke supplier X karena biasanya laku keras di akhir pekan."</em>
        </p>
        <div className="bg-sibos-orange/10 border-l-4 border-sibos-orange p-6 my-8 rounded-r-xl">
          <p className="italic text-gray-200">"Bisnis tanpa data ibarat menyetir mobil dengan mata tertutup. Anda mungkin bergerak, tapi Anda tidak tahu kapan akan menabrak tembok."</p>
        </div>
        <p className="leading-relaxed text-gray-300">
          Jadi, jika Anda masih berpikir mesin kasir hanya alat hitung, saatnya berpikir ulang. Bergabunglah dengan ekosistem yang memberdayakan bisnis Anda.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: "Melawan Raksasa: Filosofi Ekonomi Berbagi SIBOS",
    category: "Komunitas",
    date: "15 Oktober 2025",
    author: "Tim Komunitas",
    readTime: "7 Menit",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop",
    excerpt: "Bagaimana SIBOS mendobrak hegemoni kapitalis dalam industri software dengan konsep bagi hasil yang radikal.",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-gray-300">
          Industri SaaS (Software as a Service) seringkali kejam. Pemain besar dengan modal triliunan membakar uang untuk mematikan kompetitor, memonopoli pasar, lalu menaikkan harga seenaknya ketika user sudah ketergantungan.
        </p>
        <p className="mb-6 leading-relaxed text-gray-300">
          SIBOS mengambil jalan yang sunyi dan berbeda. Kami tidak mencari "Unicorn" status. Kami mencari keberkahan kolektif.
        </p>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Konsep Anti-Paus (Anti-Whale)</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Dalam struktur investasi SIBOS, kami membatasi kepemilikan saham individu. Mengapa? Agar tidak ada satu orang pun yang bisa mendikte arah kebijakan komunitas demi keuntungan pribadi semata. Keputusan diambil berdasarkan konsensus yang menguntungkan ekosistem, bukan investor tunggal.
        </p>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Rejeki Tidak Akan Tertukar</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Salah satu inovasi paling radikal kami adalah <strong>Distribusi Klien Otomatis</strong>. 
        </p>
        <p className="mb-6 leading-relaxed text-gray-300">
          Bayangkan Partner A sangat jago marketing. Dia mendapatkan 1.000 klien. Secara kapasitas manusia, mustahil dia melayani 1.000 orang dengan prima. Di sistem lama, Partner A akan menjadi serakah, pelayanan memburuk, dan klien kecewa.
        </p>
        <p className="mb-6 leading-relaxed text-gray-300">
          Di SIBOS, sistem akan berkata: <em>"Halo Partner A, kapasitasmu sudah penuh. Klien ke-1001 ini akan kami berikan ke Partner B yang baru bergabung, agar dia bisa tumbuh. Kamu tetap dapat persentase referral, tapi biaya maintenance bulanan masuk ke Partner B."</em>
        </p>
        <p className="leading-relaxed text-gray-300">
          Ini adalah implementasi teknologi untuk keadilan sosial. Kami percaya, jika semua orang makan, tidak ada yang perlu berkelahi.
        </p>
      </>
    )
  },
  {
    id: 3,
    title: "AI & Masa Depan UMKM: Ancaman atau Kawan?",
    category: "Teknologi",
    date: "20 Oktober 2025",
    author: "Divisi R&D",
    readTime: "4 Menit",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Kecerdasan buatan bukan untuk menggantikan manusia, tapi untuk membebaskan manusia dari pekerjaan membosankan.",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-gray-300">
          Banyak pemilik UMKM takut mendengar kata "AI" (Artificial Intelligence). Bayangannya adalah robot yang mengambil alih pekerjaan karyawan. Padahal, realitanya jauh lebih sederhana dan membantu.
        </p>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Otomatisasi Hal Membosankan</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Berapa jam waktu yang dihabiskan admin Anda untuk rekap nota? Berapa kali terjadi selisih hitungan stok opname? AI di SIBOS menangani hal-hal repetitif ini.
        </p>
        <GlassCard className="mb-8 !bg-slate-800">
          <h4 className="font-bold text-sibos-orange mb-2">Contoh Kasus: Toko Roti</h4>
          <p className="text-sm text-gray-300">
            Biasanya, pemilik toko menebak-nebak berapa roti yang harus dipanggang besok. Jika kebanyakan, basi. Jika sedikit, rugi peluang.
            <br/><br/>
            <strong>Dengan SIBOS AI:</strong> Sistem menganalisis data penjualan 3 tahun terakhir, cuaca besok (ya, kami cek ramalan cuaca), dan tren libur nasional. Sistem memberi notifikasi: <em>"Besok hujan dan libur, produksi Roti Keju tingkatkan 20%, kurangi Donat Coklat."</em>
          </p>
        </GlassCard>
        <h3 className="text-2xl font-bold text-white mb-4 mt-8">Demokratisasi Teknologi</h3>
        <p className="mb-6 leading-relaxed text-gray-300">
          Dulu, teknologi prediksi seperti ini hanya milik perusahaan raksasa sekelas Amazon atau Walmart. SIBOS membawanya ke warung kelontong dan bengkel motor. Karena kami percaya, teknologi canggih adalah hak segala bangsa, bukan hanya hak konglomerat.
        </p>
      </>
    )
  }
];

export const ArticlesPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- DETAIL VIEW ---
  if (selectedArticle) {
    return (
      <div className="pt-24 min-h-screen bg-slate-950 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Progress bar indicator (optional visual) */}
        <div className="fixed top-20 left-0 w-full h-1 bg-slate-800 z-40">
           <div className="h-full bg-sibos-orange w-1/3"></div>
        </div>

        <article className="container mx-auto px-6 max-w-4xl pb-24">
          <button 
            onClick={handleBackToList}
            className="group flex items-center gap-2 text-gray-400 hover:text-sibos-orange mb-8 transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-sibos-orange/10 border border-white/10">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Kembali ke Artikel</span>
          </button>

          {/* Article Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4 items-center">
              <span className="px-3 py-1 rounded-full bg-sibos-orange/10 text-sibos-orange border border-sibos-orange/20 font-semibold">
                {selectedArticle.category}
              </span>
              <div className="flex items-center gap-1"><Calendar size={14}/> {selectedArticle.date}</div>
              <div className="flex items-center gap-1"><Clock size={14}/> {selectedArticle.readTime}</div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center">
                  <User className="text-gray-400" />
               </div>
               <div>
                 <div className="text-white font-semibold">{selectedArticle.author}</div>
                 <div className="text-gray-500 text-sm">Penulis & Kontributor</div>
               </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-sibos-orange hover:prose-a:text-orange-400 prose-strong:text-white">
            {selectedArticle.content}
          </div>

          {/* Footer Share / Tags */}
          <div className="mt-16 pt-8 border-t border-white/10">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2">
               <Tag size={18} className="text-sibos-orange"/> Topik Terkait
             </h4>
             <div className="flex gap-2 flex-wrap">
               {['Teknologi', 'Bisnis', 'UMKM', 'Indonesia', 'SaaS'].map((tag, i) => (
                 <span key={i} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-sm cursor-pointer transition-colors">
                   #{tag}
                 </span>
               ))}
             </div>
          </div>
        </article>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="pt-24 min-h-screen bg-slate-950 animate-in fade-in duration-500">
      <section className="container mx-auto px-6 pb-24">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Wawasan & <span className="text-sibos-orange">Cerita</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Kumpulan artikel, panduan bisnis, dan kabar terbaru dari ekosistem SIBOS untuk membantu usaha Anda tumbuh.
          </p>
        </div>

        {/* Featured / Hero Article (First Item) */}
        <div 
          onClick={() => handleReadArticle(articlesData[0])}
          className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 cursor-pointer mb-16 shadow-2xl hover:shadow-sibos-orange/10 transition-all duration-300"
        >
           <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden relative">
                 <div className="absolute inset-0 bg-sibos-orange/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500"></div>
                 <img 
                   src={articlesData[0].image} 
                   alt={articlesData[0].title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                 <div className="flex items-center gap-3 text-sm text-sibos-orange font-bold mb-4 uppercase tracking-wider">
                    <span>{articlesData[0].category}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>Terbaru</span>
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-sibos-orange transition-colors">
                   {articlesData[0].title}
                 </h2>
                 <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                   {articlesData[0].excerpt}
                 </p>
                 <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                   Baca Selengkapnya <ChevronRight className="ml-2" size={20} />
                 </div>
              </div>
           </div>
        </div>

        {/* Grid Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.slice(1).map((article) => (
            <GlassCard 
              key={article.id} 
              className="flex flex-col h-full p-0 overflow-hidden cursor-pointer group"
            >
              <div 
                className="relative h-48 overflow-hidden"
                onClick={() => handleReadArticle(article)}
              >
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs text-white font-medium border border-white/10">
                  {article.category}
                </div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1"><Calendar size={12} /> {article.date}</div>
                  <div className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</div>
                </div>
                
                <h3 
                  onClick={() => handleReadArticle(article)}
                  className="text-xl font-bold text-white mb-3 group-hover:text-sibos-orange transition-colors line-clamp-2"
                >
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                <button 
                  onClick={() => handleReadArticle(article)}
                  className="mt-auto w-full py-2 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm font-medium"
                >
                  Baca Artikel
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};