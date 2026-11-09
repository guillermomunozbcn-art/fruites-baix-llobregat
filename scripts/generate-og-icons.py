# Genera favicon (src/app/icon.png, apple-icon.png) e imagen Open Graph (public/images/og/og-default.jpg)
# a partir del logotipo y de una foto del registro. Uso: python3 scripts/generate-og-icons.py
from PIL import Image, ImageDraw

IVORY = (243, 239, 229, 255)
sym = Image.open("public/brand/logo-symbol.png").convert("RGBA")
for size, name in [(512, "src/app/icon.png"), (180, "src/app/apple-icon.png")]:
    c = Image.new("RGBA", (size, size), IVORY)
    h = int(size * 0.68); w = int(sym.width * h / sym.height)
    c.alpha_composite(sym.resize((w, h), Image.LANCZOS), ((size - w) // 2, (size - h) // 2))
    c.convert("RGB").save(name, optimize=True)

W, H, PW = 1200, 630, 640
photo = Image.open("public/images/hero/mandarino-campo.webp").convert("RGB")
r = max(PW / photo.width, H / photo.height)
ph = photo.resize((int(photo.width * r), int(photo.height * r)), Image.LANCZOS)
x0, y0 = (ph.width - PW) // 2, (ph.height - H) // 2
og = Image.new("RGBA", (W, H), IVORY)
og.paste(ph.crop((x0, y0, x0 + PW, y0 + H)), (0, 0))
logo = Image.open("public/brand/logo-full.png").convert("RGBA")
lw = 480; lh = int(logo.height * lw / logo.width)
og.alpha_composite(logo.resize((lw, lh), Image.LANCZOS), (PW + (W - PW - lw) // 2, (H - lh) // 2 - 20))
d = ImageDraw.Draw(og)
d.rectangle((PW, H - 14, W, H), fill=(25, 61, 48, 255)); d.rectangle((PW, H - 20, W, H - 14), fill=(216, 163, 77, 255))
og.convert("RGB").save("public/images/og/og-default.jpg", quality=86, optimize=True)
