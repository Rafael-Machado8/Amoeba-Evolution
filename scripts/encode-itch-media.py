from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json, zipfile

root = Path(__file__).resolve().parents[1]
out = root / 'release' / 'itch-media'
frames = [Image.open(p).convert('RGB') for p in sorted((out / 'frames').glob('*.png'))]
assert len(frames) == 70
palette_source = Image.new('RGB', (720, 440 * 4))
for i, frame in enumerate([frames[0], frames[24], frames[29], frames[45]]):
    palette_source.paste(frame, (0, i * 440))
palette = palette_source.quantize(colors=256)
indexed = [f.quantize(palette=palette, dither=Image.Dither.NONE) for f in frames]
durations = [50] * len(indexed)
durations[0] = 250
durations[-1] = 750
gif = out / '00-fusao.gif'
indexed[0].save(gif, save_all=True, append_images=indexed[1:], duration=durations, loop=0, optimize=True, disposal=1)
with Image.open(gif) as result:
    assert result.n_frames == 70 and result.size == (720, 440)
    assert sum(result.seek(i) or result.info['duration'] for i in range(result.n_frames)) == sum(durations)

shots = sorted(out.glob('[0-9][0-9]-*.png'))
for file in shots:
    with Image.open(file) as source:
        pixels = source.convert('RGB')
    pixels.save(file, format='PNG', optimize=True)
sheet = Image.new('RGB', (960, 360 * 3), '#101d20')
draw = ImageDraw.Draw(sheet)
for i, file in enumerate(shots):
    with Image.open(file) as im:
        thumbnail = ImageOps.contain(im.convert('RGB'), (470, 320))
    x, y = (i % 2) * 480, (i // 2) * 360
    sheet.paste(thumbnail, (x, y + 25))
    draw.text((x + 10, y + 5), file.stem, fill='#d9ed9c')
sheet.save(out / 'preview-contact-sheet.jpg', quality=90)

guide = '''AMOEBA EVOLUTION — MATERIAL PARA ITCH.IO

00-fusao.gif: colocar perto do início da descrição. 720 × 440, 20 fps, loop de 4,4 segundos.
01-micromundo.png: primeira imagem da galeria.
02-oceano.png: variedade de criaturas e ambiente.
03-nebulosa.png: exploração espacial.
04-galaxia.png: progressão cósmica.
05-colecao.png: diversidade das evoluções.
06-menu.png: tela inicial, por último na galeria.

Os PNGs são capturas diretas do jogo em 1389 × 950, usando um save de demonstração separado.
O GIF é uma cena aproximada de divulgação, capturada quadro a quadro com as mesmas regras
de fusão, desenhos e animação do jogo. Tem título promocional e criaturas ampliadas.
Não é uma gravação da interface completa; não representa conteúdo novo.

Faça upload dos PNGs como screenshots. Insira o GIF na descrição pelo editor do itch.io.
Nenhum arquivo foi publicado automaticamente na sua conta.
'''
(out / 'LEIA-ME.txt').write_text(guide, encoding='utf-8')
archive = root / 'release' / 'Amoeba-Evolution-itch-media.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for file in [gif, *shots, out / 'LEIA-ME.txt']:
        z.write(file, file.name)
print(json.dumps({'gif_bytes':gif.stat().st_size,'frames':len(frames),'duration_ms':sum(durations),'screenshots':len(shots),'zip':str(archive)},ensure_ascii=False))
