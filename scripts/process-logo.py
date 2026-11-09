# Limpia el fondo del logotipo original y genera recortes fieles (sin redibujar).
# Uso: python3 scripts/process-logo.py public/brand/logo-original-agem.jpg public/brand
from PIL import Image
import sys
src,outdir=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB')
W,H=im.size
# Alpha from "distance to white": keeps anti-aliasing, removes the faint background
px=im.load()
out=Image.new('RGBA',(W,H))
op=out.load()
for y in range(H):
    for x in range(W):
        r,g,b=px[x,y]
        mn=min(r,g,b)
        # how far from white (0..255)
        d=255-mn
        a=0 if d<40 else min(255,int((d-40)*255/120))
        op[x,y]=(r,g,b,a)
bb=out.getbbox()
print('size',W,H,'bbox',bb)
# find rows with content to separate wordmark and symbol
rows=[sum(1 for x in range(W) if op[x,y][3]>60) for y in range(H)]
cols=[sum(1 for y in range(H) if op[x,y][3]>60) for x in range(W)]
segs=[];inside=False
for y,c in enumerate(rows):
    if c>0 and not inside: start=y;inside=True
    if c==0 and inside: segs.append((start,y));inside=False
if inside: segs.append((start,H))
print('row segments',segs)
def crop(y0,y1,name,pad=4,scale=3):
    sub=out.crop((0,y0,W,y1)); b=sub.getbbox()
    box=(max(0,b[0]-pad),max(0,y0+b[1]-pad),min(W,b[2]+pad),min(H,y0+b[3]+pad))
    c=out.crop(box); c=c.resize((c.width*scale,c.height*scale),Image.LANCZOS)
    c.save(f"{outdir}/{name}.png",optimize=True); print(name,box,c.size)
crop(segs[0][0],segs[0][1],'logo-wordmark')
crop(segs[1][0],segs[1][1],'logo-symbol')
crop(bb[1],bb[3],'logo-full',pad=8)
