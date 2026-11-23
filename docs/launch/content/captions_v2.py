# SayTamm 14-day launch — corrected captions (v2, 2026-11-23).
# Source of truth for the launch copy. Run `python3 docs/launch/content/build_posts.py` to merge it with the
# production fields into posts_v2.json (read by tools/launch/build-launch.mjs).
#
# Register per platform (owner decision, 2026-11-23):
#   Facebook, LinkedIn  -> Arabic: Modern Standard Arabic (clear business Arabic)
#   Instagram, X, TikTok -> Arabic: light conversational Arabic (the founder's natural register)
#   English everywhere  -> British spelling, no agency clichés
# Platform craft: each caption is written for its platform, not one body copied five times.
#   X stays within 280 characters; TikTok captions are short (the video carries the message);
#   LinkedIn and Facebook carry the full argument; Instagram leads with the hook and asks for a save.

HOOKS = {
    # day: (hook_ar_msa, hook_ar_conv, hook_en)
    1: ("ليست كل حركة تقدّماً.", "مش كل حركة… معناها إنك بتتقدم.", "Not all movement means progress."),
    2: ("هذا «تم». ليس بديلاً عن الفريق، بل صورة لطريقة تفكيره.", "ده «تم». مش بديل عن الفريق… ده طريقة تفكيرنا.", "Meet TAMM. Not a replacement for the team — a picture of how it thinks."),
    3: ("ثلاث عبارات نسمعها كثيراً، ولا تكفي وحدها.", "3 جمل بنسمعها كتير… ومش كفاية لوحدها.", "Three familiar agency lines — and why they are not enough."),
    4: ("قبل أن تزيد الميزانية، راجع ثلاثة أمور.", "قبل ما تزوّد الميزانية… راجع 3 حاجات.", "Before you increase the budget, check three things."),
    5: ("المشكلة نفسها لا تعني الحل نفسه.", "نفس المشكلة… مش لازم ليها نفس الحل.", "The same problem does not always need the same solution."),
    6: ("الرقم الكبير لا يعني دائماً أداءً جيداً.", "مش كل رقم كبير… معناه إن الأداء كويس.", "A big number does not automatically mean good performance."),
    7: ("الزيارات موجودة، والطلبات لا تتحرك. من أين نبدأ؟", "الزيارات موجودة… والطلبات مش بتتحرك. نبدأ منين؟", "Traffic is there. Orders are not moving. Where do we start?"),
    8: ("زر Boost ليس استراتيجية.", "زرار Boost مش هو الاستراتيجية.", "The Boost button is not a strategy."),
    9: ("تأسست قول تم عام 2021، والخبرة التي تقودها أقدم من ذلك.", "قول تم بدأت 2021… والخبرة اللي وراها أقدم بكتير.", "SayTamm was founded in 2021. The experience behind it goes back further."),
    10: ("تضيع الفكرة حين تعمل كل مرحلة وحدها.", "الفكرة بتضيع لما كل مرحلة تشتغل لوحدها.", "Good thinking gets lost when every stage works alone."),
    11: ("التقرير الذي لا ينتهي بقرار ينقصه أهم جزء.", "التقرير اللي مفيهوش قرار… ناقصه أهم حتة.", "A report that ends without a decision is missing its most important part."),
    12: ("أربعة تخصصات. خطة واحدة. هدف واضح.", "4 تخصصات. خطة واحدة. هدف واضح.", "Four disciplines. One plan. One clear objective."),
    13: ("«تم» شخصية، أما العمل فيقف خلفه فريق وخبرة.", "«تم» شخصية… بس الشغل وراه ناس وخبرة.", "TAMM is a character. The work behind it is human."),
    14: ("لديك هدف؟ ابدأ من هنا.", "عندك هدف؟ ابدأ من هنا.", "Have an objective? Start here."),
}

# Arabic purpose lines (MSA) — the single-minded purpose of each piece, for the production team.
PURPOSE = {
    1: "كسر نمط محتوى الوكالات المعتاد، وطرح سؤال يشدّ صاحب القرار: هل يتحرك التسويق نحو هدف، أم يستهلك الوقت والميزانية؟",
    2: "تقديم «تم» شخصيةً تجسّد طريقة التفكير والتنفيذ، لا بديلاً عن خبرة الفريق.",
    3: "إظهار التمايز بنقد عادات شائعة في التسويق، دون مهاجمة منافسين أو ادعاءات عن السوق.",
    4: "نصيحة قصيرة قابلة للتطبيق بصوت المؤسس: الإنفاق الإعلاني يبدأ من جاهزية العرض والصفحة والقياس.",
    5: "عرض التفكير متعدد المسارات من خلال سيناريو افتراضي، دون حالة عميل أو وعد بنتيجة.",
    6: "رفع الوعي بالمؤشرات الأساسية، والتأكيد أن العائد على الإنفاق الإعلاني ليس ربحاً.",
    7: "تشخيص سيناريو افتراضي: زيارات بلا طلبات، والبدء بالأسئلة قبل الحلول.",
    8: "تذكير عملي: تحديد الهدف وطريقة القياس قبل ترويج أي منشور.",
    9: "بناء المصداقية بحقائق معتمدة: التأسيس عام 2021 وخبرة المؤسس، دون مبالغة.",
    10: "شرح نموذج العمل من الهدف إلى القرار التالي في منظومة واحدة.",
    11: "نصيحة من المؤسس: قراءة التقرير بدءاً من القرار الذي يجب أن يدعمه.",
    12: "تقديم التخصصات الأربعة منظومةً واحدة تعمل على هدف واحد.",
    13: "إبراز الفريق خلف الشخصية: الخبرة البشرية هي التي تنفّذ.",
    14: "الإطلاق الرسمي: التموضع والخدمات ونموذج العمل ودعوة واضحة للتواصل.",
}

C = {}  # C[day][platform] = (ar, en)

C[1] = {
 "Facebook": ("""ليست كل حركة تقدّماً.

قد يكون لديك محتوى يُنشر بانتظام، وإعلانات تعمل، وتقارير مليئة بالأرقام، ومع ذلك يبقى السؤال الأهم بلا إجابة: ما الذي تحسّن فعلاً في عملك؟

في قول تم نبدأ من الهدف، ونربط الاستراتيجية والإبداع والإعلانات والتقنية في خطة واحدة؛ فالنشاط ليس نتيجة، والظهور ليس نمواً.

قل لنا الهدف، ونبدأ من هناك.
قول. تم.

ما الرقم الذي تحكم به على تسويقك اليوم؟ شاركنا في التعليقات.

#قول_تم #تسويق_رقمي""",
 """Not all movement means progress.

You can have content going out, campaigns running and reports full of numbers — and still be missing the one answer that matters: what has actually moved the business forward?

At SayTamm, we start with the objective and connect strategy, creative, media and technology in one plan. Activity is not impact. Visibility is not growth.

Tell us the objective. We start there.
Say it. Tamm it.

Which number do you judge your marketing by today? Tell us in the comments.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""مش كل حركة… معناها إنك بتتقدم.

محتوى بينزل، إعلانات شغالة، تقارير مليانة أرقام…
بس السؤال الأهم: إيه اللي اتحسن فعلاً في البيزنس؟

إحنا بنبدأ من الهدف، وبنربط الاستراتيجية والإبداع والإعلانات والتقنية في خطة واحدة.

احفظ المنشور ده وارجعله قبل قرارك الجاي.
قول. تم.

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Not all movement means progress.

Content going out. Campaigns running. Reports full of numbers.
But what has actually moved the business forward?

We start with the objective and connect strategy, creative, media and technology in one plan.

Save this for your next marketing decision.
Say it. Tamm it.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""ليست كل حركة تقدّماً.

كثير من الشركات تملك نشاطاً تسويقياً واضحاً: محتوى منتظم، وحملات تعمل، وتقارير شهرية. لكن السؤال الذي يهمّ الإدارة يبقى معلّقاً: ما الذي تغيّر في المبيعات أو العملاء المؤهلين أو الإيرادات؟

حين يغيب الهدف التجاري، يتحول التسويق إلى قائمة مهام. وحين يحضر، تصبح كل قناة مسؤولة عن رقم واضح.

هذه نقطة البداية في قول تم: هدف واحد، وخطة واحدة تربط الاستراتيجية والإبداع والإعلانات والتقنية.

ما المؤشر الذي تعتمد عليه إدارتكم للحكم على التسويق؟

#التسويق_الرقمي #استراتيجية_التسويق #قول_تم""",
 """Not all movement means progress.

Many businesses have plenty of marketing activity: regular content, live campaigns, monthly reports. Yet the question leadership cares about often goes unanswered — what changed in sales, qualified leads or revenue?

Without a business objective, marketing becomes a list of tasks. With one, every channel answers to a clear number.

That is where SayTamm starts: one objective, and one plan connecting strategy, creative, media and technology.

Which metric does your leadership team use to judge marketing?

#DigitalMarketing #MarketingStrategy #SayTamm"""),
 "X": ("""مش كل حركة معناها إنك بتتقدم.
محتوى وإعلانات وتقارير… بس إيه اللي اتحسن فعلاً في البيزنس؟
النشاط مش نتيجة، والظهور مش نمو.
#قول_تم""",
 """Not all movement means progress.
Content, campaigns, reports — but what actually moved the business?
Activity is not impact. Visibility is not growth.
#SayTamm"""),
 "TikTok": ("""مش كل حركة معناها إنك بتتقدم 👀 إيه اللي اتحسن فعلاً؟
#قول_تم #تسويق #بيزنس""",
 """Not all movement means progress. What actually moved?
#SayTamm #Marketing #Business"""),
}

C[2] = {
 "Facebook": ("""هذا «تم».

شخصية تجسّد طريقة عملنا: نفهم المطلوب، ونرتّب الأولويات، ونحوّل الفكرة إلى خطوات واضحة.

ولنكن واضحين: «تم» ليس الفريق، وليس بديلاً عن الخبرة البشرية. إنه رفيق بصري لطريقة تفكير قائمة على الوضوح والدقة وتحمّل المسؤولية.

أهلاً بك في عالم قول تم.
قول. تم.

#قول_تم""",
 """Meet TAMM.

A character built to represent how we work: understand the brief, organise the priorities and turn an idea into clear next steps.

One thing matters: TAMM is not the team, and never a substitute for human expertise. It is a visual companion to a way of thinking built on clarity, precision and ownership.

Welcome to SayTamm.
Say it. Tamm it.

#SayTamm"""),
 "Instagram": ("""ده «تم» 👋

بيجسّد طريقة شغلنا: نفهم المطلوب، نرتّب الأولويات، ونحوّل الفكرة لخطوات واضحة.

بس خلّيها واضحة: «تم» مش الفريق، ومش بديل عن الخبرة. هو صورة لطريقة تفكيرنا.

هتشوفه كتير الفترة الجاية.
قول. تم.

#قول_تم #تسويق_رقمي""",
 """Meet TAMM 👋

It represents how we work: understand the brief, set the priorities, turn the idea into clear steps.

To be clear: TAMM is not the team, and never a substitute for expertise. It is a picture of how we think.

You will be seeing more of it.
Say it. Tamm it.

#SayTamm #DigitalMarketing"""),
 "LinkedIn": ("""نقدّم لكم «تم».

شخصية بصرية ستظهر في محتوى قول تم لتشرح أفكار التسويق المعقدة بلغة بسيطة، وتعبّر عن طريقة العمل التي نلتزم بها: فهم المطلوب، وترتيب الأولويات، وتحويل الفكرة إلى خطوات قابلة للتنفيذ.

«تم» ليس بديلاً عن الخبرة البشرية؛ فالقرارات والخطط والتنفيذ يقوم بها فريق من المتخصصين. دوره أن يجعل طريقة تفكيرنا أوضح وأسهل في التذكّر.

#قول_تم #التسويق_الرقمي""",
 """Introducing TAMM.

A visual character that will appear in SayTamm's content to explain complex marketing ideas simply — and to represent the way we work: understand the brief, organise the priorities and turn the idea into actionable steps.

TAMM is not a substitute for human expertise. Decisions, plans and execution come from a team of specialists. Its role is to make our way of thinking clearer and easier to remember.

#SayTamm #DigitalMarketing"""),
 "X": ("""ده «تم».
مش بديل عن الفريق… ده صورة لطريقة تفكيرنا: نفهم، نرتّب، وننفّذ.
#قول_تم""",
 """Meet TAMM.
Not a replacement for the team — a picture of how we think: understand, organise, execute.
#SayTamm"""),
 "TikTok": ("""ده «تم» 👋 مش بديل عن الفريق… ده طريقة تفكيرنا.
#قول_تم #تسويق""",
 """Meet TAMM 👋 Not a replacement for the team — how we think.
#SayTamm #Marketing"""),
}

C[3] = {
 "Facebook": ("""ثلاث عبارات نسمعها كثيراً:
«سنزيد المحتوى.»
«سنطلق حملة أكبر.»
«سنرسل التقرير آخر الشهر.»

قد تكون كلها جزءاً من العمل، لكنها لا تجيب عن السؤال الأساسي: ما المشكلة التي نحلّها؟ وكيف سنعرف أننا تقدّمنا؟

المحتوى يحتاج إلى هدف، والحملة تحتاج إلى فرضية واضحة، والتقرير يجب أن يقود إلى القرار التالي.

في قول تم نفضّل السؤال الصحيح على الإجابة الجاهزة.

أيّ هذه العبارات سمعتها أكثر؟

#قول_تم #تسويق_رقمي""",
 """Three lines you have probably heard:
“We’ll post more.”
“We’ll run a bigger campaign.”
“We’ll send the report at month-end.”

Each may have a place in the work. None is a strategy on its own. What problem are we solving — and how will we know we are moving forward?

Content needs a purpose. A campaign needs a clear hypothesis. A report should inform the next decision.

At SayTamm, we prefer the right question to a ready-made answer.

Which one have you heard most?

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""3 جمل بنسمعها كتير… ومش كفاية لوحدها 👇

«هنزوّد المحتوى»
«هنعمل حملة أكبر»
«هنبعتلك تقرير آخر الشهر»

كلها ممكن تبقى جزء من الشغل، بس مش إجابة على السؤال الأهم: إيه المشكلة اللي بنحلّها؟

اسحب للآخر، واحفظ المنشور قبل اجتماعك الجاي مع الوكالة.

#قول_تم #تسويق_رقمي #نصائح_تسويق""",
 """Three lines you have heard too often 👇

“We’ll post more.”
“We’ll run a bigger campaign.”
“We’ll send the report at month-end.”

Each can be part of the work. None answers the real question: what problem are we solving?

Swipe through, and save this before your next agency meeting.

#SayTamm #DigitalMarketing #MarketingTips"""),
 "LinkedIn": ("""ثلاث عبارات شائعة في اجتماعات التسويق:
«سنزيد المحتوى.» «سنطلق حملة أكبر.» «سنرسل التقرير آخر الشهر.»

لا خطأ فيها بحد ذاتها، لكنها إجابات عن «ماذا سنفعل؟» قبل أن نجيب عن «لماذا؟».

البديل بسيط ويحتاج إلى انضباط: مشكلة محددة، وفرضية واضحة، ومؤشر يحدد إن كنا نتقدم، وتقرير ينتهي بقرار.

ما السؤال الذي تطرحه أولاً قبل الموافقة على أي حملة؟

#التسويق_الرقمي #استراتيجية_التسويق #قول_تم""",
 """Three lines common in marketing meetings:
“We’ll post more.” “We’ll run a bigger campaign.” “We’ll send the report at month-end.”

None is wrong in itself. But each answers “what will we do?” before anyone has answered “why?”.

The alternative is simple and takes discipline: a defined problem, a clear hypothesis, a metric that shows whether we are moving forward, and a report that ends in a decision.

What is the first question you ask before approving a campaign?

#DigitalMarketing #MarketingStrategy #SayTamm"""),
 "X": ("""«هنزوّد المحتوى»
«هنعمل حملة أكبر»
«هنبعتلك تقرير آخر الشهر»
ولا واحدة فيهم استراتيجية لوحدها. السؤال الأول: إيه المشكلة اللي بنحلّها؟
#قول_تم""",
 """“We’ll post more.”
“We’ll run a bigger campaign.”
“We’ll send the report at month-end.”
None of these is a strategy. First question: what problem are we solving?
#SayTamm"""),
 "TikTok": ("""3 جمل بنسمعها من الوكالات… ومش كفاية 👇
#قول_تم #تسويق #نصائح_تسويق""",
 """Three agency lines that are not a strategy 👇
#SayTamm #Marketing #MarketingTips"""),
}

C[4] = {
 "Facebook": ("""قبل أن تزيد ميزانية الإعلانات، راجع ثلاثة أمور:

1. هل العرض واضح ومقنع؟
2. هل تكمل صفحة الهبوط الوعد نفسه الذي قدّمه الإعلان؟
3. هل تستطيع قياس ما يحدث بعد النقرة، لا النقرة وحدها؟

إذا كان في أحدها خلل، فقد تكبّر الميزانية الإضافية المشكلة بدلاً من أن تحلّها.

ابدأ بالتشخيص، ثم قرّر: تزيد أم تغيّر الاتجاه.

#قول_تم #تسويق_بالأداء""",
 """Before increasing your ad budget, check three things:

1. Is the offer clear and compelling?
2. Does the landing page continue the promise the ad made?
3. Can you measure what happens after the click — not just the click?

If one of these is weak, more budget may amplify the problem rather than solve it.

Diagnose first. Then decide whether to scale or change direction.

#SayTamm #PerformanceMarketing"""),
 "Instagram": ("""قبل ما تزوّد الميزانية… راجع 3 حاجات 👇

1. العرض واضح ومقنع؟
2. صفحة الهبوط بتكمّل نفس وعد الإعلان؟
3. بتقيس اللي بيحصل بعد الضغطة… ولا الضغطة بس؟

لو فيه حاجة منهم ناقصة، الفلوس الزيادة ممكن تكبّر المشكلة.

احفظه قبل قرار الميزانية الجاي.

#قول_تم #تسويق_بالأداء #إعلانات_ممولة""",
 """Before you increase the budget, check three things 👇

1. Is the offer clear and compelling?
2. Does the landing page keep the ad’s promise?
3. Are you measuring what happens after the click — or just the click?

If one is weak, more money can make the problem bigger.

Save this for your next budget decision.

#SayTamm #PerformanceMarketing #PaidAds"""),
 "LinkedIn": ("""«لنرفع الميزانية» من أكثر القرارات شيوعاً حين تتباطأ النتائج، وأكثرها تكلفة حين يكون الخلل في مكان آخر.

قبل زيادة الإنفاق، نراجع ثلاثة أمور:
1. وضوح العرض وقوة إقناعه.
2. اتساق صفحة الهبوط مع وعد الإعلان.
3. القدرة على قياس ما بعد النقرة: الطلب، أو العميل المؤهل، أو المبيعة.

إذا كان أحدها ضعيفاً، فالإنفاق الإضافي يوسّع المشكلة. التشخيص أولاً، ثم قرار التوسّع.

#التسويق_بالأداء #الإعلانات_الرقمية #قول_تم""",
 """“Let’s increase the budget” is one of the most common decisions when results slow down — and one of the most expensive when the problem is somewhere else.

Before spending more, we check three things:
1. Is the offer clear and persuasive?
2. Does the landing page match the ad’s promise?
3. Can we measure what happens after the click — the order, the qualified lead, the sale?

If one is weak, extra spend widens the problem. Diagnose first; scale second.

#PerformanceMarketing #PaidMedia #SayTamm"""),
 "X": ("""قبل ما تزوّد ميزانية الإعلانات:
1. العرض واضح؟
2. صفحة الهبوط بتكمّل الوعد؟
3. بتقيس بعد الضغطة؟
لو واحدة ناقصة، الفلوس الزيادة بتكبّر المشكلة.
#قول_تم""",
 """Before you raise ad spend:
1. Is the offer clear?
2. Does the landing page keep the promise?
3. Can you measure after the click?
If one is weak, more budget amplifies the problem.
#SayTamm"""),
 "TikTok": ("""قبل ما تزوّد الميزانية… راجع 3 حاجات 👇
#قول_تم #إعلانات_ممولة #تسويق""",
 """Before you raise ad spend, check these 3 things 👇
#SayTamm #PaidAds #Marketing"""),
}

C[5] = {
 "Facebook": ("""تخيّل نشاطاً تجارياً يستقبل زيارات على موقعه، لكن الطلبات أقل من المتوقع.

هل الحل مزيد من الإعلانات؟ ليس بالضرورة. يمكن أن يبدأ التشخيص من ثلاثة مسارات:
• العرض والرسالة: هل القيمة واضحة؟
• تجربة الموقع: هل الوصول إلى القرار سهل؟
• جودة الزيارات: هل يصل الجمهور المناسب؟

هذه مسارات محتملة وليست وصفة جاهزة، والبيانات هي التي تحدد الأولوية.

#قول_تم #تسويق_رقمي""",
 """Imagine a business receiving website visits but fewer orders than expected.

Is the answer more advertising? Not necessarily. The diagnosis could start in three places:
• Offer and message: is the value clear?
• Website experience: is it easy to decide?
• Traffic quality: are the right people arriving?

These are possible routes, not a universal formula. Evidence decides the priority.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""نفس المشكلة… مش لازم ليها نفس الحل.

زيارات كتير، وطلبات قليلة. الحل إعلانات أكتر؟ مش شرط.

3 أماكن نبدأ منها التشخيص:
• العرض: القيمة واضحة؟
• الموقع: الشراء سهل؟
• الزيارات: الجمهور الصح؟

والبيانات هي اللي تقول نبدأ منين.

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Same problem. Not the same solution.

Plenty of visits, few orders. More ads? Not necessarily.

Three places to start the diagnosis:
• Offer: is the value clear?
• Website: is buying easy?
• Traffic: are the right people arriving?

The data decides where to begin.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""سيناريو افتراضي يتكرر كثيراً: الزيارات إلى الموقع جيدة، والطلبات أقل من المتوقع.

الاستجابة الأسرع غالباً هي زيادة الإعلانات، لكنها ليست دائماً الصحيحة. نفضّل أن نختبر ثلاثة مسارات قبل أي قرار:
• العرض والرسالة.
• تجربة الموقع ومسار الشراء.
• جودة الزيارات ومطابقتها للجمهور المستهدف.

لا توجد وصفة واحدة تناسب كل نشاط؛ البيانات تحدد أي المسارات يأتي أولاً.

#التسويق_الرقمي #تحسين_معدل_التحويل #قول_تم""",
 """A hypothetical scenario we see often: website traffic is healthy, orders are below expectation.

The fastest response is usually more advertising. It is not always the right one. We would test three routes before deciding:
• Offer and message.
• Website experience and the path to purchase.
• Traffic quality and fit with the target audience.

There is no single formula for every business; evidence decides which route comes first.

#DigitalMarketing #CRO #SayTamm"""),
 "X": ("""زيارات كتير وطلبات قليلة؟ الحل مش دايماً إعلانات أكتر.
شوف العرض، تجربة الموقع، وجودة الزيارات… والبيانات تحدد تبدأ منين.
#قول_تم""",
 """Lots of visits, few orders? More ads is not always the answer.
Check the offer, the website experience and traffic quality — and let the data set the priority.
#SayTamm"""),
 "TikTok": ("""زيارات كتير وطلبات قليلة؟ 3 طرق للتشخيص 👇
#قول_تم #تسويق #بيزنس""",
 """Lots of visits, few orders? Three routes to diagnose 👇
#SayTamm #Marketing #Business"""),
}

C[6] = {
 "Facebook": ("""الرقم الكبير لا يعني دائماً أداءً جيداً. قبل أن تحكم على حملة، اعرف الرقم الذي أمامك:

• CAC: تكلفة اكتساب العميل.
• ROAS: العائد على الإنفاق الإعلاني، وهو ليس ربحاً.
• CVR: معدل التحويل.
• AOV: متوسط قيمة الطلب.
• LTV: القيمة المتوقعة للعميل طوال علاقته بالنشاط.

هذه المؤشرات يكمّل بعضها بعضاً، واختيار الأهم منها يعتمد على هدفك وهامش ربحك وجودة بياناتك.

السؤال ليس «كم الرقم؟» فقط، بل «ما القرار الذي يقودنا إليه؟»

#قول_تم #تسويق_بالأداء""",
 """A big number does not automatically mean good performance. Before judging a campaign, understand the metric in front of you:

• CAC: Customer Acquisition Cost.
• ROAS: Return on Ad Spend — not profit.
• CVR: Conversion Rate.
• AOV: Average Order Value.
• LTV: Lifetime Value.

These metrics work together. The right one depends on your objective, your margins and the quality of your data.

The question is not only “what is the number?” but “what decision should it inform?”

#SayTamm #PerformanceMarketing"""),
 "Instagram": ("""مش كل رقم كبير… معناه إن الأداء كويس 📊

5 أرقام لازم تفهمها قبل ما تحكم على أي حملة:
CAC · ROAS · CVR · AOV · LTV

وخد بالك: ROAS مش ربح.

اسحب للشرح، واحفظه للمرة الجاية اللي يجيلك فيها تقرير.

#قول_تم #تسويق_بالأداء #تسويق_رقمي""",
 """A big number is not always good performance 📊

Five metrics to understand before judging any campaign:
CAC · ROAS · CVR · AOV · LTV

And remember: ROAS is not profit.

Swipe for the definitions, and save this for your next report.

#SayTamm #PerformanceMarketing #DigitalMarketing"""),
 "LinkedIn": ("""كثير من نقاشات الأداء تبدأ بالرقم الأكبر في التقرير، وهنا يقع الخطأ غالباً.

خمسة مؤشرات يجب أن تُقرأ معاً: تكلفة اكتساب العميل (CAC)، والعائد على الإنفاق الإعلاني (ROAS)، ومعدل التحويل (CVR)، ومتوسط قيمة الطلب (AOV)، والقيمة المتوقعة للعميل (LTV).

ملاحظة أساسية: العائد على الإنفاق الإعلاني ليس ربحاً. حملة بعائد مرتفع قد تخسر إذا كان هامش الربح ضعيفاً أو تكلفة الاحتفاظ بالعميل مرتفعة.

اختيار المؤشر الصحيح يبدأ من الهدف التجاري، لا من التقرير.

#التسويق_بالأداء #تحليل_البيانات #قول_تم""",
 """Many performance discussions start with the biggest number in the report. That is often where they go wrong.

Five metrics should be read together: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Conversion Rate (CVR), Average Order Value (AOV) and Lifetime Value (LTV).

One essential point: ROAS is not profit. A high-ROAS campaign can still lose money if margins are thin or retention costs are high.

Choosing the right metric starts with the business objective, not the report.

#PerformanceMarketing #MarketingAnalytics #SayTamm"""),
 "X": ("""ROAS مش ربح.
اقرأ CAC وCVR وAOV وLTV مع بعض، واسأل: الرقم ده بيقودنا لأنهي قرار؟
#قول_تم""",
 """ROAS is not profit.
Read CAC, CVR, AOV and LTV together — and ask which decision the number should inform.
#SayTamm"""),
 "TikTok": ("""5 أرقام لازم تفهمها… و ROAS مش ربح 📊
#قول_تم #تسويق_بالأداء #تسويق""",
 """Five metrics to understand — and ROAS is not profit 📊
#SayTamm #PerformanceMarketing #Marketing"""),
}

C[7] = {
 "Facebook": ("""سيناريو افتراضي: الزيارات موجودة، والطلبات أقل من المتوقع. من أين نبدأ؟

بدلاً من إضافة قناة جديدة فوراً، يطرح «تم» ثلاثة أسئلة:
1. هل الجمهور مناسب؟
2. هل العرض مفهوم؟
3. هل تجربة الشراء سهلة؟

التشخيص ليس تخميناً: نجمع الإشارات، ونحدد نقطة الاحتكاك، ثم نختبر الحل المناسب.

فهم المشكلة أولاً أوفر من القفز إلى الحل.

#قول_تم #تسويق_رقمي""",
 """A hypothetical scenario: traffic is coming in, but orders are below expectation. Where do we start?

Instead of adding another channel straight away, TAMM asks three questions:
1. Is the audience right?
2. Is the offer understood?
3. Is the buying experience easy?

Diagnosis is not guesswork: gather the signals, find the friction point, then test the right response.

Understanding the problem first costs less than jumping to a solution.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""الزيارات موجودة… والطلبات مش بتتحرك 🤔

«تم» بيبدأ بـ 3 أسئلة قبل أي حل:
1. الجمهور مناسب؟
2. العرض مفهوم؟
3. الشراء سهل؟

افهم المشكلة الأول… وبعدين اختار الحل.

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Traffic is there. Orders are not moving 🤔

TAMM starts with three questions before any fix:
1. Is the audience right?
2. Is the offer understood?
3. Is buying easy?

Understand the problem first. Then choose the solution.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""عندما تكون الزيارات جيدة والطلبات ضعيفة، يكون أسهل قرار هو إضافة قناة جديدة، وغالباً ما يكون أغلاها.

في هذا السيناريو الافتراضي نبدأ بثلاثة أسئلة: هل يصل الجمهور المناسب؟ هل العرض مفهوم؟ هل تجربة الشراء سهلة؟

الإجابات تحدد نقطة الاحتكاك، ونقطة الاحتكاك تحدد الاختبار التالي. هكذا يصبح الإنفاق قراراً مبنياً على دليل، لا رد فعل.

#التسويق_الرقمي #تحسين_معدل_التحويل #قول_تم""",
 """When traffic is healthy and orders are weak, the easiest decision is to add a new channel — and often the most expensive.

In this hypothetical scenario we start with three questions: Is the right audience arriving? Is the offer understood? Is the buying experience easy?

The answers locate the friction point, and the friction point sets the next test. Spend becomes a decision based on evidence, not a reaction.

#DigitalMarketing #CRO #SayTamm"""),
 "X": ("""زيارات بدون طلبات؟ قبل قناة جديدة، اسأل:
الجمهور مناسب؟ العرض مفهوم؟ الشراء سهل؟
التشخيص مش تخمين.
#قول_تم""",
 """Traffic without orders? Before adding a channel, ask:
Right audience? Clear offer? Easy checkout?
Diagnosis is not guesswork.
#SayTamm"""),
 "TikTok": ("""زيارات بدون طلبات؟ «تم» بيشخّص في 3 أسئلة 🤖
#قول_تم #تسويق #بيزنس""",
 """Traffic but no orders? TAMM diagnoses in three questions 🤖
#SayTamm #Marketing #Business"""),
}

C[8] = {
 "Facebook": ("""زر Boost ليس استراتيجية.

قبل أن تروّج أي منشور، اسأل نفسك:
• من أريد أن أصل إليه تحديداً؟
• ماذا أريد أن يفعل الشخص بعد مشاهدة المحتوى؟
• بماذا سأقيس النجاح؟

إذا كان هدفك الزيارات، فقِس جودتها. وإذا كان هدفك العملاء المحتملين، فلا تكتفِ بعددهم وانظر إلى جودتهم.

الأداة ليست الخطة؛ الهدف هو الذي يحدد طريقة استخدامها.

#قول_تم #إعلانات_ممولة""",
 """The Boost button is not a strategy.

Before you promote any post, ask yourself:
• Who exactly do I want to reach?
• What should someone do after seeing this?
• Which metric will define success?

If the goal is traffic, measure its quality. If the goal is leads, look beyond volume to quality.

The tool is not the plan. The objective decides how you use it.

#SayTamm #PaidAds"""),
 "Instagram": ("""زرار Boost مش هو الاستراتيجية 🚫

قبل ما تدوس عليه، اسأل نفسك:
• عايز أوصل لمين؟
• عايزه يعمل إيه بعد ما يشوف المنشور؟
• هقيس النجاح بإيه؟

الأداة مش الخطة… الهدف هو اللي بيحدد.

احفظ المنشور قبل الـ Boost الجاي.

#قول_تم #إعلانات_ممولة #نصائح_تسويق""",
 """The Boost button is not a strategy 🚫

Before you press it, ask:
• Who do I want to reach?
• What should they do next?
• How will I measure success?

The tool is not the plan. The objective is.

Save this before your next boost.

#SayTamm #PaidAds #MarketingTips"""),
 "LinkedIn": ("""ترويج المنشورات من أسهل أدوات الإعلان، ولهذا يُستخدم كثيراً دون هدف واضح.

قبل أي ترويج، ثلاثة أسئلة تختصر كثيراً من الإنفاق غير الفعّال: من الجمهور المحدد؟ ما الإجراء المطلوب بعد المشاهدة؟ ما المؤشر الذي يحدد النجاح؟

وعندما يكون الهدف عملاء محتملين، فالجودة أهم من العدد: عشرة عملاء مؤهلين أفضل من مئة لا يشترون.

#التسويق_بالأداء #الإعلانات_الرقمية #قول_تم""",
 """Boosting a post is one of the easiest advertising tools — which is why it is so often used without a clear objective.

Before any boost, three questions save a lot of ineffective spend: Who exactly is the audience? What should they do after seeing it? Which metric defines success?

And when the goal is leads, quality matters more than volume: ten qualified leads beat a hundred who never buy.

#PerformanceMarketing #PaidMedia #SayTamm"""),
 "X": ("""قبل ما تدوس Boost:
عايز توصل لمين؟ عايزه يعمل إيه؟ هتقيس بإيه؟
الأداة مش الخطة.
#قول_تم""",
 """Before you hit Boost:
Who do you want to reach? What should they do? How will you measure it?
The tool is not the plan.
#SayTamm"""),
 "TikTok": ("""قبل ما تدوس Boost… اسأل 3 أسئلة 👇
#قول_تم #إعلانات_ممولة #نصائح_تسويق""",
 """Before you hit Boost, ask these 3 questions 👇
#SayTamm #PaidAds #MarketingTips"""),
}

C[9] = {
 "Facebook": ("""تأسست قول تم عام 2021، لكن الخبرة التي تقود العمل أقدم من ذلك.

يقود مؤسسها أعمال التسويق الرقمي منذ أكثر من 15 عاماً في السعودية ومصر ودول الخليج، وعمل مع أكثر من 200 علامة تجارية في أكثر من 20 قطاعاً.

ومن أسباب تأسيس قول تم جمع خبرات عملية متكاملة في فريق واحد، حتى لا يبدأ التفكير من الصفر في كل مرة، ولا يضيع الاتجاه بين تخصصات منفصلة.

قيمة الخبرة الحقيقية في جودة القرار، لا في عدد السنوات وحده.

#قول_تم #تسويق_رقمي""",
 """SayTamm was founded in 2021. The experience guiding the work goes back further.

Our founder brings more than 15 years of digital marketing leadership across Saudi Arabia, Egypt and the Gulf, with experience spanning 200+ brands and 20+ industries.

One reason for founding SayTamm was to bring complementary experience together in one team — so the thinking does not restart from zero, and direction is not lost between disconnected disciplines.

Experience matters most when it improves the quality of a decision, not simply the number of years behind it.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""قول تم بدأت 2021… والخبرة اللي وراها أقدم بكتير.

+15 سنة خبرة للمؤسس في التسويق الرقمي
+200 علامة تجارية
+20 قطاع

والهدف من البداية: فريق واحد بخبرات متكاملة، علشان القرار يبقى أحسن… مش علشان الأرقام وبس.

#قول_تم #تسويق_رقمي""",
 """SayTamm started in 2021. The experience behind it goes back much further.

15+ years of digital marketing leadership (our founder)
200+ brands
20+ industries

The aim from day one: one team with complementary experience — so decisions get better, not just the numbers.

#SayTamm #DigitalMarketing"""),
 "LinkedIn": ("""تأسست قول تم عام 2021، والخبرة التي بُنيت عليها أقدم من ذلك.

قاد مؤسسها عمليات التسويق الرقمي لأكثر من 15 عاماً في السعودية ومصر ودول الخليج، مع أكثر من 200 علامة تجارية في أكثر من 20 قطاعاً.

الفكرة وراء الوكالة بسيطة: أن تجتمع خبرات الاستراتيجية والإبداع والإعلانات والتقنية في فريق واحد يعمل على هدف واحد، فلا يبدأ التفكير من الصفر، ولا يضيع الاتجاه بين الأقسام.

الخبرة لا تُقاس بالسنوات، بل بجودة القرار الذي تساعد عليه.

#التسويق_الرقمي #ريادة_الأعمال #قول_تم""",
 """SayTamm was founded in 2021. The experience it is built on goes back further.

Our founder has led digital marketing operations for more than 15 years across Saudi Arabia, Egypt and the Gulf, working with 200+ brands across 20+ industries.

The idea behind the agency is simple: bring strategy, creative, media and technology experience into one team working to one objective — so the thinking never restarts from zero and direction is not lost between departments.

Experience is not measured in years, but in the quality of the decisions it supports.

#DigitalMarketing #Leadership #SayTamm"""),
 "X": ("""قول تم بدأت 2021.
الخبرة اللي وراها: +15 سنة في التسويق الرقمي، +200 علامة تجارية، +20 قطاع.
والأهم: جودة القرار.
#قول_تم""",
 """SayTamm was founded in 2021.
The experience behind it: 15+ years in digital marketing, 200+ brands, 20+ industries.
What matters most: the quality of the decision.
#SayTamm"""),
 "TikTok": ("""بدأنا 2021… بس الخبرة أقدم بكتير.
#قول_تم #تسويق_رقمي""",
 """Founded in 2021. The experience goes back further.
#SayTamm #DigitalMarketing"""),
}

C[10] = {
 "Facebook": ("""الاستراتيجية تحدد الاتجاه.
الإبداع يحوّل الاتجاه إلى فكرة ومحتوى.
الإعلانات توصل الرسالة إلى الجمهور المناسب.
والقياس يوضح ما حدث، وما الخطوة التالية.

في قول تم، هذه المراحل ليست جزراً منفصلة، بل منظومة واحدة تغذّي فيها كل مرحلة ما بعدها.

من أول هدف… إلى القرار التالي.

#قول_تم #تسويق_رقمي""",
 """Strategy sets the direction.
Creative turns it into ideas and content.
Media puts the message in front of the right audience.
Measurement shows what happened — and what should happen next.

At SayTamm, these are not isolated islands. They are one connected system, each stage informing the next.

From the first objective to the next decision.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""الفكرة بتضيع لما كل مرحلة تشتغل لوحدها.

الاستراتيجية ← الإبداع ← الإعلانات ← القياس
وكل مرحلة بتغذّي اللي بعدها.

من أول الهدف… لحد القرار الجاي.

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Good thinking gets lost when every stage works alone.

Strategy → Creative → Media → Measurement
Each stage feeds the next.

From the first objective to the next decision.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""أغلب الأفكار الجيدة لا تفشل في مرحلة الفكرة، بل في التسليم بين المراحل: الاستراتيجية في عرض تقديمي، والإبداع في ملف آخر، والإعلانات تُدار بمنطق ثالث، والتقرير لا يعود إلى أي منها.

نموذج العمل في قول تم: الاستراتيجية تحدد الاتجاه، والإبداع يحوّله إلى رسالة، والإعلانات توصلها، والقياس يعيد ما تعلّمناه إلى جولة التخطيط التالية. فريق واحد، ورقم واحد يحكم الجميع.

#التسويق_الرقمي #استراتيجية_التسويق #قول_تم""",
 """Most good ideas do not fail at the idea stage. They fail in the handovers: strategy in one deck, creative in another file, media run on a third logic, and a report that never returns to any of them.

SayTamm’s model: strategy sets the direction, creative turns it into a message, media delivers it, and measurement feeds what we learned into the next round of planning. One team, judged by one number.

#DigitalMarketing #MarketingStrategy #SayTamm"""),
 "X": ("""الاستراتيجية ← الإبداع ← الإعلانات ← القياس.
لما كل مرحلة تشتغل لوحدها، الفكرة بتضيع. لما تشتغل كمنظومة، كل خطوة بتبني على اللي قبلها.
#قول_تم""",
 """Strategy → Creative → Media → Measurement.
When each stage works alone, the idea gets lost. As one system, every step builds on the last.
#SayTamm"""),
 "TikTok": ("""من البريف للتنفيذ… في منظومة واحدة ⚡
#قول_تم #تسويق #تسويق_رقمي""",
 """From brief to execution, as one system ⚡
#SayTamm #Marketing #DigitalMarketing"""),
}

C[11] = {
 "Facebook": ("""جرّب أن تقرأ تقرير التسويق من النهاية.

قبل الأرقام، ابحث عن ثلاث إجابات:
1. ماذا تعلّمنا؟
2. ما الذي يجب أن يتغيّر؟
3. ما القرار الذي سنتخذه في الفترة القادمة؟

ثم عُد إلى البيانات وتأكد: هل تدعم هذا القرار أم لا؟

التقرير الجيد ليس توثيقاً لما حدث، بل بداية لقرار أذكى.

#قول_تم #تسويق_رقمي""",
 """Try reading your marketing report backwards.

Before the numbers, look for three answers:
1. What did we learn?
2. What needs to change?
3. What decision will we make next?

Then go back to the data and check whether it supports that decision.

A useful report does more than document what happened. It starts a smarter next move.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""التقرير اللي مفيهوش قرار… ناقصه أهم حتة.

جرّب تقراه من الآخر:
1. اتعلمنا إيه؟
2. إيه اللي لازم يتغير؟
3. هناخد قرار إيه؟

وبعدين ارجع للأرقام.

احفظه للتقرير الشهري الجاي 📌

#قول_تم #تسويق_رقمي #نصائح_تسويق""",
 """A report without a decision is missing its most important part.

Read it backwards:
1. What did we learn?
2. What needs to change?
3. What will we decide?

Then go back to the numbers.

Save this for your next monthly report 📌

#SayTamm #DigitalMarketing #MarketingTips"""),
 "LinkedIn": ("""نصيحة عملية لاجتماع التقرير الشهري: اقرأ التقرير من الصفحة الأخيرة.

ابحث أولاً عن ثلاث إجابات: ماذا تعلّمنا؟ ما الذي يجب أن يتغيّر؟ ما القرار التالي؟ ثم راجع الأرقام لتتأكد أنها تدعم هذا القرار.

إذا لم تجد قراراً، فالتقرير يوثّق الماضي ولا يقود المستقبل.

#التسويق_الرقمي #تحليل_البيانات #قول_تم""",
 """A practical tip for your next monthly review: read the report from the last page.

Look first for three answers: What did we learn? What needs to change? What is the next decision? Then check that the numbers support it.

If there is no decision, the report documents the past without guiding the future.

#DigitalMarketing #MarketingAnalytics #SayTamm"""),
 "X": ("""اقرأ تقرير التسويق من الآخر:
اتعلمنا إيه؟ إيه اللي يتغير؟ القرار الجاي إيه؟
لو مفيش قرار، التقرير ناقص.
#قول_تم""",
 """Read your marketing report backwards:
What did we learn? What changes? What is the next decision?
No decision, no report.
#SayTamm"""),
 "TikTok": ("""اقرأ التقرير من الآخر 🔁 السر في القرار.
#قول_تم #نصائح_تسويق #تسويق""",
 """Read your report backwards 🔁 It is all about the decision.
#SayTamm #MarketingTips #Marketing"""),
}

C[12] = {
 "Facebook": ("""التسويق الفعّال ليس مجموعة خدمات متجاورة، بل منظومة مترابطة:

01 الاستراتيجية: تحدد الهدف والجمهور والأولوية.
02 الإبداع والمحتوى: يحوّلان الاتجاه إلى رسائل وتجارب.
03 الإعلانات والأداء: توصل الرسالة وتختبر الاستثمار.
04 التقنية والقياس: تربط التجربة بالبيانات والقرار.

حين يعمل كل تخصص منفرداً تتقطع الصورة، وحين تعمل جميعها على الهدف نفسه تبني كل خطوة على ما قبلها.

#قول_تم #تسويق_رقمي""",
 """Effective marketing is not a collection of services side by side. It is a connected system:

01 Strategy: defines the objective, audience and priority.
02 Creative & Content: turns direction into messages and experiences.
03 Media & Performance: delivers the message and tests the investment.
04 Digital & Technology: connects the experience to data and decisions.

When each discipline works alone, the picture breaks apart. When they share one objective, every step builds on the last.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""4 تخصصات. خطة واحدة. هدف واضح.

01 الاستراتيجية
02 الإبداع والمحتوى
03 الإعلانات والأداء
04 التقنية والقياس

اسحب وشوف إزاي كل واحد بيكمّل التاني 👉

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Four disciplines. One plan. One clear objective.

01 Strategy
02 Creative & Content
03 Media & Performance
04 Digital & Technology

Swipe to see how each one feeds the next 👉

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""كثير من الشركات تتعامل مع أكثر من جهة: وكالة للمحتوى، وأخرى للإعلانات، وفريق تقني منفصل. والنتيجة غالباً أهداف متعارضة وتقارير لا تتحدث مع بعضها.

في قول تم تعمل أربعة تخصصات كفريق واحد: الاستراتيجية والاستشارات، والإبداع والمحتوى، والإعلانات والأداء، والتقنية والقنوات الرقمية. تسع خدمات، وهدف واحد يحكمها جميعاً.

#التسويق_الرقمي #استراتيجية_التسويق #قول_تم""",
 """Many businesses work with several parties at once: one agency for content, another for media, a separate tech team. The result is often competing objectives and reports that do not talk to each other.

At SayTamm, four disciplines work as one team: Strategy & Consulting, Creative & Content, Media & Performance, and Digital & Technology. Nine services, answering to one objective.

#DigitalMarketing #MarketingStrategy #SayTamm"""),
 "X": ("""4 تخصصات. خطة واحدة. هدف واضح.
الاستراتيجية · الإبداع · الإعلانات · التقنية
لما يشتغلوا على نفس الهدف، كل خطوة بتبني على اللي قبلها.
#قول_تم""",
 """Four disciplines. One plan. One objective.
Strategy · Creative · Media · Technology
When they share one goal, every step builds on the last.
#SayTamm"""),
 "TikTok": ("""4 تخصصات… وخطة واحدة 🎯
#قول_تم #تسويق_رقمي #تسويق""",
 """Four disciplines, one plan 🎯
#SayTamm #DigitalMarketing #Marketing"""),
}

C[13] = {
 "Facebook": ("""قد ترى «تم» في محتوانا، لكن من يحوّل الفكرة إلى عمل حقيقي هو فريق من المتخصصين.

استراتيجية، ومحتوى وإبداع، وإعلانات وأداء، وتقنية وقياس.

هدفنا منذ البداية كان جمع خبرات عملية تعمل على الصورة نفسها، بدلاً من أن يتحرك كل تخصص في اتجاه مختلف.

الشخصية تعبّر عن طريقتنا، والفريق هو من ينفّذها.

#قول_تم""",
 """You may see TAMM in our content, but the work behind every idea is human.

Strategy. Creative and content. Media and performance. Digital and technology.

From the start, the aim was to bring practical experience together — people working from the same picture rather than moving in separate directions.

The character represents our approach. The team brings it to life.

#SayTamm"""),
 "Instagram": ("""«تم» شخصية… بس الشغل وراه ناس وخبرة 🤝

استراتيجية · محتوى وإبداع · إعلانات وأداء · تقنية وقياس

فريق واحد شايف نفس الصورة.

#قول_تم #تسويق_رقمي""",
 """TAMM is a character. The work behind it is human 🤝

Strategy · Creative & content · Media & performance · Digital & technology

One team, working from the same picture.

#SayTamm #DigitalMarketing"""),
 "LinkedIn": ("""«تم» شخصية تساعدنا على شرح طريقة تفكيرنا، أما العمل نفسه فيقوم به فريق من 30 شخصاً في أربعة تخصصات: الاستراتيجية، والإبداع والمحتوى، والإعلانات والأداء، والتقنية والقياس.

ما يجمعهم ليس الهيكل التنظيمي، بل الهدف: أن يعمل الجميع على الصورة نفسها، وأن يُحاسَب كل تخصص على الرقم نفسه.

#قول_تم #فرق_العمل #التسويق_الرقمي""",
 """TAMM is a character that helps us explain how we think. The work itself is done by a team of 30 people across four disciplines: strategy, creative and content, media and performance, and digital and technology.

What holds them together is not an org chart but an objective: everyone working from the same picture, every discipline accountable to the same number.

#SayTamm #Teamwork #DigitalMarketing"""),
 "X": ("""«تم» شخصية.
اللي بينفّذ: فريق من 30 شخص في 4 تخصصات، شايفين نفس الهدف.
#قول_تم""",
 """TAMM is a character.
The work is done by a team of 30 across four disciplines, all working to one objective.
#SayTamm"""),
 "TikTok": ("""ورا «تم»… فريق حقيقي 🤝
#قول_تم #تسويق_رقمي""",
 """Behind TAMM: a real team 🤝
#SayTamm #DigitalMarketing"""),
}

C[14] = {
 "Facebook": ("""قول تم.
وكالة تسويق رقمي وأداء، تحوّل الأفكار إلى تأثير.

نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة. نفهم أهداف الأعمال، ونبني خطط التسويق، ونحوّلها إلى تنفيذ واضح ونتائج قابلة للقياس.

من أول سؤال… إلى القرار التالي.

لديك هدف؟ راسلنا على info@saytamm.com
قول. تم.

#قول_تم #تسويق_رقمي""",
 """SayTamm.
A digital marketing & performance agency built to move brands forward.

We bring strategy, creative, media and technology together under one connected approach. We understand business objectives, build marketing plans and turn them into clear execution and measurable outcomes.

From the first question to the next decision.

Have an objective? Write to us at info@saytamm.com
Say it. Tamm it.

#SayTamm #DigitalMarketing"""),
 "Instagram": ("""عندك هدف؟ ابدأ من هنا.

قول تم: وكالة تسويق رقمي وأداء.
استراتيجية، إبداع، إعلانات وتقنية… في منظومة واحدة.

ابعتلنا هدفك: info@saytamm.com
قول. تم.

#قول_تم #تسويق_رقمي #تسويق_بالأداء""",
 """Have an objective? Start here.

SayTamm: a digital marketing & performance agency.
Strategy, creative, media and technology — as one system.

Send us your objective: info@saytamm.com
Say it. Tamm it.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "LinkedIn": ("""نعلن رسمياً عن قول تم: وكالة تسويق رقمي وأداء، تحوّل الأفكار إلى تأثير.

نعمل بأربعة تخصصات متكاملة تقدّم تسع خدمات، من استراتيجية التسويق الرقمي وبناء الهوية، إلى الإعلانات وتحسين محركات البحث وتطوير المواقع وتحليل الأداء. وكلها تعمل على هدف تجاري واحد يُحدَّد من البداية: مبيعات، أو عملاء مؤهلون، أو إيرادات.

إذا كان لديك هدف تسويقي للمرحلة القادمة، يسعدنا أن نسمعه: info@saytamm.com

قول. تم.

#قول_تم #التسويق_الرقمي #التسويق_بالأداء""",
 """Introducing SayTamm: a digital marketing & performance agency built to move brands forward.

Four connected disciplines deliver nine services — from digital marketing strategy and brand identity to performance media, SEO, website development and analytics. All of them answer to one business objective set at the start: sales, qualified leads or revenue.

If you have a marketing objective for the months ahead, we would like to hear it: info@saytamm.com

Say it. Tamm it.

#SayTamm #DigitalMarketing #PerformanceMarketing"""),
 "X": ("""قول تم… رسمياً هنا.
وكالة تسويق رقمي وأداء: استراتيجية وإبداع وإعلانات وتقنية في منظومة واحدة.
عندك هدف؟ info@saytamm.com
قول. تم.""",
 """SayTamm is here.
A digital marketing & performance agency: strategy, creative, media and technology as one system.
Have an objective? info@saytamm.com
Say it. Tamm it."""),
 "TikTok": ("""قول تم هنا 🚀 عندك هدف؟ ابدأ من هنا.
#قول_تم #تسويق_رقمي #تسويق""",
 """SayTamm is here 🚀 Have an objective? Start here.
#SayTamm #DigitalMarketing #Marketing"""),
}
