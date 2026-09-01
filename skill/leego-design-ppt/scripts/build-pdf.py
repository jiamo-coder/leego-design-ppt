#!/usr/bin/env python3
import argparse
from pathlib import Path
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader

parser = argparse.ArgumentParser()
parser.add_argument("--renders", default="output/pptx/renders")
parser.add_argument("--output", default="output/pdf/deck.pdf")
args = parser.parse_args()
renders = Path(args.renders).resolve()
output = Path(args.output).resolve()
pages = sorted(renders.glob("slide-*.png"))
if not pages:
    raise SystemExit(f"No slide renders found in {renders}")
output.parent.mkdir(parents=True, exist_ok=True)
canvas = Canvas(str(output), pagesize=(1280, 720), pageCompression=1)
for page in pages:
    canvas.drawImage(ImageReader(str(page)), 0, 0, width=1280, height=720, preserveAspectRatio=True, mask="auto")
    canvas.showPage()
canvas.save()
print(f"Built PDF: {output} ({len(pages)} pages)")
