# PromptLab — AI Çözüm Merkezi

PromptLab, işletmelerin yapay zekâ ihtiyaçlarını keşfetmeleri ve proje taleplerini iletmeleri için hazırlanmış tek sayfalık bir teknoloji hizmetleri landing page uygulamasıdır.

Proje kapsamında kullanıcılar sunulan AI hizmetlerinden birini seçerek ad, e-posta ve proje açıklaması bilgileriyle talep oluşturabilir. Form verileri hem istemci hem sunucu tarafında doğrulanır ve başarılı talepler Supabase veritabanında kalıcı olarak saklanır.

## Proje Özeti

Uygulamanın temel amacı, basit bir iletişim formundan ziyade gerçek bir uçtan uca veri akışı oluşturmaktır:

**Kullanıcı → Frontend → API → Server-side Validation → Supabase → Başarı/Hata durumu**

Başarılı kayıt oluşturulmadan kullanıcıya başarı mesajı gösterilmez.

## Özellikler

**Ürün Tarafı**

- Responsive AI hizmetleri landing page
- AI Chatbot hizmeti
- RAG & Bilgi Asistanı hizmeti
- AI Otomasyonu hizmeti
- Veri & AI Çözümleri hizmeti
- Proje talep formu

**Teknik Implementasyon**

- Client-side form validation (backend ile simetrik kurallar)
- Server-side validation
- E-posta formatı kontrolü
- Hizmet seçimi kontrolü
- Alan uzunluğu kontrolleri (isim, açıklama)
- Loading / Success / Error state yönetimi
- Supabase üzerinde kalıcı veri kaydı
- API üzerinden server-side Supabase erişimi (anon key + RLS)

## Teknoloji Stack

- Next.js
- React
- TypeScript
- CSS Modules
- Supabase
- PostgreSQL
- Git / GitHub
- Vercel

## Proje Yapısı

    promptlab-ai/
    ├── app/
    │   ├── api/
    │   │   └── requests/
    │   │       └── route.ts
    │   ├── globals.css
    │   ├── page.module.css
    │   ├── page.tsx
    │   └── layout.tsx
    ├── public/
    ├── .gitignore
    ├── package.json
    └── README.md

## Form Akışı

1. Kullanıcı form alanlarını doldurur.
2. Frontend tarafında temel alan ve e-posta kontrolleri yapılır.
3. Form `/api/requests` endpoint'ine POST isteği gönderir.
4. Sunucu gelen veriyi tekrar doğrular.
5. Geçersiz veri gönderilmişse API 400 hatası döndürür.
6. Geçerli veri Supabase `requests` tablosuna kaydedilir.
7. Veritabanı kaydı başarılıysa kullanıcıya başarı mesajı gösterilir.
8. Veritabanı işleminde hata oluşursa kullanıcıya hata mesajı gösterilir.

## Server-side Validation

API katmanında aşağıdaki kontroller uygulanmaktadır:

- Tüm alanların dolu olması
- Ad Soyad uzunluğu: 2-100 karakter
- E-posta formatı ve maksimum uzunluk kontrolü
- Geçerli hizmet seçimi
- Proje açıklaması uzunluğu: 10-2000 karakter

Geçersiz istekler veritabanına kaydedilmeden reddedilir.

## Veritabanı

Supabase üzerinde `requests` isimli tablo kullanılmaktadır.

| Alan          | Tip         | Açıklama                       |
| ------------- | ----------- | ------------------------------ |
| `id`          | bigint      | Otomatik artan kayıt ID'si     |
| `name`        | text        | Talep sahibinin adı            |
| `email`       | text        | Talep sahibinin e-posta adresi |
| `service`     | text        | Seçilen hizmet                 |
| `description` | text        | Proje açıklaması               |
| `created_at`  | timestamptz | Kayıt oluşturulma zamanı       |

**Erişim modeli:** Uygulama, tam yetkili bir service role key yerine bilinçli olarak **anon key** kullanır. Tabloda Row Level Security (RLS) etkindir ve yalnızca `insert` işlemine izin veren bir politika tanımlıdır:

```sql
alter table requests enable row level security;

grant insert on table requests to anon, authenticated;

create policy "Herkes talep oluşturabilir"
  on requests
  for insert
  to public
  with check (true);
```

Bu sayede API, veritabanına yeni kayıt ekleyebilir ama mevcut kayıtları okuyamaz, güncelleyemez veya silemez — "en az yetki" prensibine uygun bir erişim modeli.

## Environment Variables

Uygulamanın Supabase bağlantısı environment variable üzerinden sağlanmaktadır.

`.env.local` dosyasında:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_ANON_KEY`
  bulunmalıdır.

`SUPABASE_ANON_KEY` yalnızca server-side kodda (API route) kullanılmaktadır ve repository'ye dahil edilmemektedir.

`.env*` dosyaları `.gitignore` içerisinde ignore edilmektedir.

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

    npm install

Environment variable'ları `.env.local` dosyasına ekleyin.

Development server'ı başlatın:

    npm run dev

Ardından uygulamayı lokal ortamda açın:

    http://localhost:3000

## Testler

### Başarılı form gönderimi

Geçerli test verileriyle form gönderildiğinde:

- API isteği başarılı şekilde tamamlandı.
- Supabase `requests` tablosuna kayıt oluşturuldu.
- Kullanıcıya başarı mesajı gösterildi.

### Client-side validation

Geçersiz e-posta formatı ile gönderim denenmiş ve tarayıcı/form validation tarafından engellenmiştir.

### Server-side validation

API endpoint'ine doğrudan geçersiz e-posta gönderilerek test yapılmıştır.

Beklenen ve alınan sonuç:

**HTTP 400 Bad Request**

Server tarafında geçersiz e-posta için hata mesajı döndürülmüştür.

## AI Destekli Geliştirme

Bu proje geliştirilirken AI araçları; fikir üretme, kod geliştirme, problem çözme, hata ayıklama, alternatifleri değerlendirme ve kod inceleme süreçlerinde yardımcı olarak kullanılmıştır.

AI tarafından üretilen veya önerilen çözümler doğrudan kabul edilmemiş; uygulama çalıştırılarak, test edilerek ve beklenen davranışla karşılaştırılarak doğrulanmıştır.

AI kullanım sürecinin ayrıntıları `AI_LOG.md` dosyasında belgelenmiştir.

## Bilinen Eksikler

- Kullanıcı authentication sistemi bulunmamaktadır.
- Admin paneli bulunmamaktadır.
- Otomatik test suite'i henüz eklenmemiştir.
- Form kayıtları için ayrı bir yönetim arayüzü bulunmamaktadır.

Bu özellikler assessment kapsamında belirlenen temel teslim kapsamının dışında tutulmuştur.

## Deployment

Production deployment için Vercel kullanılacaktır.

**Canlı adres:** https://promptlab-ai-pearl.vercel.app/

## Repository

Kaynak kod GitHub repository'sinde tutulmaktadır.

Repository:

https://github.com/yusrayalavuz/promptlab-ai

## Geliştirme Notu

Bu proje, AI destekli yazılım geliştirme sürecinde planlama, üretim, doğrulama, test ve teslim adımlarının birlikte uygulanmasını göstermek amacıyla hazırlanmıştır.
