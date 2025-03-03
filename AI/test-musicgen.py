from transformers import AutoProcessor, MusicgenForConditionalGeneration
from optimum.exporters.onnx import export
from pathlib import Path

# Load model
model_id = "facebook/musicgen-small"
model = MusicgenForConditionalGeneration.from_pretrained(model_id)
processor = AutoProcessor.from_pretrained(model_id)

# Define ONNX export path
onnx_path = Path("musicgen-small.onnx")

# Export model to ONNX
export(model, onnx_path, task="text-to-audio")