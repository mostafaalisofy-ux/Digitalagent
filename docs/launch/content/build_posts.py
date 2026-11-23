"""Merge corrected captions (captions_v2.py) with the production fields of the original book
(posts_v1_original.json) into posts_v2.json, fixing the prompt brand block and checking platform limits.

Usage: python3 docs/launch/content/build_posts.py
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from captions_v2 import C, HOOKS, PURPOSE  # noqa: E402

PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "X", "TikTok"]
REGISTER = {"Facebook": "msa", "LinkedIn": "msa", "Instagram": "conv", "X": "conv", "TikTok": "conv"}
LIMIT = {"X": 280, "TikTok": 150}

# The original prompts carried a non-approved palette. Replace it with the approved one (VISUAL_IDENTITY.md).
OLD_PALETTE = re.compile(r"Use SayTamm's Dark Editorial Performance system:.*?Arabic type: IBM Plex Sans Arabic\.", re.S)
NEW_PALETTE = ("Use SayTamm's Dark Editorial Performance system: Obsidian #09090D, Graphite #17171E, Soft White #F5F3FA, "
               "muted #96939F, Electric Purple #6C35FF as a restrained accent (about 10% or less). English type: Satoshi. "
               "Arabic type: IBM Plex Sans Arabic.")
CAROUSEL_DELIVERABLE = ("• Master visual: 4:5 carousel (1080 × 1350 px per slide), 6–8 slides: hook slide, one idea per slide, "
                        "summary, CTA. Separate Arabic and English sets.")
FIXES = {
    # nonsensical closing line in the original day 7 copy
    7: [("تمثيل المشكلة أسهل من القفز للحل.", "فهم المشكلة أولاً أوفر من القفز إلى الحل."),
        ("It is easier to represent a problem than to jump to a solution.", "Understanding the problem first costs less than jumping to a solution.")],
}


def x_len(text: str) -> int:
    # X counts URLs as 23 and most characters as 1 (Arabic included). Good enough for a pre-check.
    return len(re.sub(r"https?://\S+", "x" * 23, text))


def main():
    src = json.load(open(os.path.join(HERE, "posts_v1_original.json"), encoding="utf8"))
    out, problems = [], []
    for p in src:
        d = p["day"]
        q = dict(p)
        for a, b in FIXES.get(d, []):
            for k in ("core_ar", "core_en", "prompt"):
                q[k] = q[k].replace(a, b)
        q["hook_ar_msa"], q["hook_ar_conv"], q["hook_en"] = HOOKS[d]
        q["hook_ar"] = HOOKS[d][1]
        q["purpose"] = PURPOSE[d]
        q["captions"] = {}
        for pl in PLATFORMS:
            ar, en = C[d][pl]
            q["captions"][pl] = {"ar": ar.strip(), "en": en.strip(), "register_ar": REGISTER[pl]}
            if pl in LIMIT:
                for lang, t in (("ar", ar), ("en", en)):
                    n = x_len(t.strip())
                    if n > LIMIT[pl]:
                        problems.append(f"day {d} {pl} {lang}: {n} > {LIMIT[pl]}")
        prompt = OLD_PALETTE.sub(NEW_PALETTE, q["prompt"])
        if "carousel" in q["format"].lower():
            prompt = re.sub(r"• Master visual:[^\n]*", CAROUSEL_DELIVERABLE, prompt)
        # keep the prompt's purpose/hook lines in step with the corrected copy
        prompt = re.sub(r"SINGLE-MINDED PURPOSE:[^\n]*", "SINGLE-MINDED PURPOSE: " + PURPOSE[d], prompt)
        prompt = re.sub(r"OPENING HOOK \(AR\):[^\n]*", "OPENING HOOK (AR): " + HOOKS[d][1], prompt)
        prompt = re.sub(r"OPENING HOOK \(EN\):[^\n]*", "OPENING HOOK (EN): " + HOOKS[d][2], prompt)
        if "#0A0A0D" in prompt or "#FFFFFF" in prompt:
            problems.append(f"day {d}: old palette still in prompt")
        q["prompt"] = prompt
        out.append(q)
    json.dump(out, open(os.path.join(HERE, "posts_v2.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    caps = sum(len(q["captions"]) * 2 for q in out)
    print(f"posts_v2.json: {len(out)} days, {caps} captions")
    if problems:
        print("PROBLEMS:\n  " + "\n  ".join(problems))
        sys.exit(1)


if __name__ == "__main__":
    main()
