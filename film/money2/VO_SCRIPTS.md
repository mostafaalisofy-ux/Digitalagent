# «قاموس الفلوس» v2: voice-over scripts

Voice: ElevenLabs "Rawi – Calm & Clear Fusha Narrator" (`F2jHHIMyJTh1pdwoLzNQ`), model `eleven_v4`, one take per episode. Modern Standard Arabic, the same register as episode 01. Generate on a paid plan (commercial licence), then have a native speaker review each take.

Each episode is one take, with `[long pause]` between the phrases below: `mix.py` splits the take on pauses longer than 0.45 s and lays phrase N on cue N of that episode in `film.html` (`vo: [...]`). The number of phrases must equal the number of cues. Save the take as `handover/launch-film/money/vo/epN.mp3`, then run `python3 film/money2/mix.py N`; no picture re-render is needed.

Every number is hypothetical, as on screen («مثال توضيحي»).

## 01 · ROAS (done, free-plan take)

عائدُ إعلاناتِك أربعةُ أضعاف؟ جميل… لكن انتظر. اطرحْ تكلفةَ البضاعة، والشحن، والعمولات. العائدُ يقيسُ المبيعات… لا الربح. اعرفْ هامشَك قبل أن تحتفل.

## 02 · CPA (9 phrases → cues 0.4, 3.0, 5.0, 6.9, 8.6, 11.1, 12.8, 15.8, 19.6)

```
حملتان بالميزانيةِ نفسِها. [long pause] الأولى نقرتُها أرخص… [long pause] فهل هي الأفضل؟ [long pause] انظرْ إلى الطلبات. [long pause] الأولى: خمسةٌ وعشرون طلبًا. [long pause] الثانية: خمسون. [long pause] تكلفةُ الطلب: مئتان… مقابل مئة. [long pause] النقرةُ الأرخص ليست دائمًا الطلبَ الأرخص. [long pause] قِسْ بتكلفةِ الطلب.
```

## 03 · AOV (8 phrases → cues 0.4, 2.4, 4.6, 7.2, 10.0, 13.3, 14.8, 17.8)

```
مئةُ طلبٍ في الشهر. [long pause] متوسطُ الطلب: ثلاثُمئة. [long pause] المبيعات: ثلاثون ألفًا. [long pause] أضِفْ منتجًا مكمِّلًا إلى السلة… [long pause] فيرتفعُ المتوسطُ إلى ثلاثِمئةٍ وستّين. [long pause] الطلباتُ نفسُها… [long pause] والمبيعاتُ ستةٌ وثلاثون ألفًا. [long pause] قبل أن تبحثَ عن عملاءَ جدد، ارفعْ قيمةَ الطلب.
```

## 04 · CR (8 phrases → cues 0.4, 2.2, 4.2, 5.6, 7.5, 10.3, 14.6, 18.3)

```
عشرةُ آلافِ زائر. [long pause] واحدٌ في المئة يشترون… [long pause] مئةُ طلب. [long pause] تريدُ طلباتٍ أكثر؟ [long pause] لا تشترِ زوارًا أكثرَ بالضرورة. [long pause] صفحةٌ أوضح، وسعرٌ ظاهر، وشحنٌ معروفٌ قبل الدفع. [long pause] واحدٌ ونصفٌ في المئة… مئةٌ وخمسون طلبًا. [long pause] الزوارُ أنفسُهم… طلباتٌ أكثر.
```
