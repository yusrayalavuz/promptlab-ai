# AI_LOG.md

## Proje

PromptLab — AI Çözüm Merkezi

## Kullanılan AI Araçları

- ChatGPT
- Claude

AI araçları geliştirme sürecinde yardımcı araç olarak kullanılmıştır. Nihai teknik kararlar ve uygulama sonuçları geliştirici tarafından değerlendirilmiş ve test edilmiştir.

## AI Kullanım Alanları

AI araçlarından aşağıdaki aşamalarda yararlanılmıştır:

- Proje fikrinin ve kapsamının netleştirilmesi
- Kullanıcı akışının ve form yapısının planlanması
- Frontend kodunun geliştirilmesi
- API endpoint yapısının oluşturulması
- Client-side ve server-side validation yaklaşımının geliştirilmesi
- Supabase entegrasyonunun planlanması
- Hata ayıklama ve alternatif çözüm üretme
- Kod inceleme ve iyileştirme
- Responsive arayüz ve CSS geliştirme
- README ve teknik dokümantasyonun oluşturulması

## Çalışma Yaklaşımı

AI destekli geliştirme sürecinde aşağıdaki akış takip edilmiştir:

1. Problemi ve gereksinimi tanımlama
2. AI ile olası çözüm ve uygulama seçeneklerini değerlendirme
3. Uygun yaklaşımı seçme
4. Kodu uygulama
5. Uygulamayı çalıştırarak test etme
6. Beklenen davranış ile gerçek sonucu karşılaştırma
7. Hata veya uyumsuzluk varsa kaynağını araştırma
8. Çözümü değiştirerek tekrar test etme

AI tarafından verilen öneriler doğrudan doğru kabul edilmemiştir. Öneriler gerçek çalışma ortamında uygulanarak doğrulanmıştır.

## Örnek: Supabase, RLS ve Form Akışı

Talep formunun yalnızca frontend tarafında çalışması yerine, gerçek bir server-side API üzerinden Supabase'e kalıcı kayıt oluşturması hedeflenmiştir.

İlk uygulamada Supabase bağlantısı server-side bir secret/service key ile gerçekleştirilmiştir. Daha sonra bu yaklaşım en az yetki prensibi açısından tekrar değerlendirilmiş ve uygulamanın ihtiyacının yalnızca yeni talep kaydı oluşturmak olduğu görüldüğünden anon key + Row Level Security yaklaşımına geçilmiştir.

Supabase üzerinde `requests` tablosu için RLS etkinleştirilmiş ve yalnızca `INSERT` işlemine izin veren bir policy oluşturulmuştur.

Bu değişiklik sonrasında ilk testte RLS hatası alınmıştır. Sorunun yalnızca INSERT yetkisi bulunan bir policy ile birlikte API tarafındaki `.select()` çağrısından kaynaklanabileceği değerlendirildi. Insert işleminden sonra kaydı tekrar okumaya gerek olmadığı için `.select().single()` kaldırılmış ve API yalnızca INSERT işlemi yapacak şekilde düzenlenmiştir.

Ardından form tekrar test edilmiştir. Talep başarıyla API üzerinden gönderilmiş ve Supabase `requests` tablosunda kaydın oluştuğu doğrulanmıştır.

Bu süreçte AI önerisi doğrudan uygulanmak yerine gerçek hata çıktısı, Supabase policy durumu ve veritabanındaki sonuçlar karşılaştırılarak çözüm doğrulanmıştır.

## Örnek: Validation ve Hata Ayıklama

Form akışında hem kullanıcı deneyimi için client-side validation hem de güvenilirlik için server-side validation uygulanmıştır.

Server-side validation kapsamında:

- Boş alan kontrolü
- Ad Soyad uzunluk kontrolü
- E-posta formatı ve uzunluk kontrolü
- Hizmet seçiminin izin verilen değerlerden biri olup olmadığının kontrolü
- Proje açıklamasının uzunluk kontrolü

uygulanmıştır.

Geçersiz bir e-posta ile doğrudan API isteği gönderilerek server-side validation ayrıca test edilmiş ve HTTP 400 sonucu doğrulanmıştır.

Ayrıca geçerli bir form gönderimi sonrasında başarı mesajının yalnızca API başarılı döndüğünde gösterilmesi ve kaydın Supabase tablosunda gerçekten oluşması kontrol edilmiştir.

## AI Çıktılarının Kontrolü

AI tarafından önerilen kodlar ve teknik yaklaşımlar aşağıdaki yöntemlerle doğrulanmıştır:

- Lokal development server üzerinde çalıştırma
- Form üzerinden gerçek istek gönderme
- Hatalı form verileriyle validation testi
- Doğrudan API isteği ile server-side validation testi
- Supabase tablosunda kayıt kontrolü
- RLS policy kontrolü
- `npm run build` ile production build kontrolü
- Git değişikliklerinin kontrol edilmesi
- Git commit ve GitHub push sonrası repository kontrolü
- Canlı deployment üzerinde form akışının kontrol edilmesi

## Teknik Kararlar

AI farklı alternatifler sunduğunda seçim yapılırken aşağıdaki kriterler dikkate alınmıştır:

- Assessment gereksinimlerine uygunluk
- Uygulamanın sadeliği
- En az yetki prensibine uygunluk
- Güvenli environment variable kullanımı
- Client-side ve server-side validation
- Gerçek veri kalıcılığı
- Test edilebilirlik
- Bakım kolaylığı

Örneğin Supabase tarafında yalnızca ihtiyaç duyulan INSERT yetkisinin RLS ile sınırlandırılması tercih edilmiştir. Böylece server tarafındaki uygulamanın veritabanında gereğinden fazla yetkiye sahip olması engellenmiştir.

## Sonuç

AI, bu projede nihai karar verici olarak değil, geliştirme sürecini hızlandıran, alternatifler üreten ve teknik problemleri analiz etmeye yardımcı olan bir araç olarak kullanılmıştır.

Öneriler gerçek çalışma ortamında test edilmiş; hatalar yalnızca AI çıktısına göre değil, terminal çıktıları, API yanıtları, Supabase kayıtları, RLS policy durumu ve production build sonuçları üzerinden değerlendirilmiştir.

Kodun çalışması, veri kalıcılığı, validation, RLS erişimi ve teslim öncesi kontroller geliştirici tarafından test edilerek doğrulanmıştır.
