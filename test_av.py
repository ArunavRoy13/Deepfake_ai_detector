import av
import numpy as np

# Create a dummy silent audio frame
frame = av.AudioFrame(format='s16', layout='stereo', samples=1024)
frame.sample_rate = 48000

resampler = av.AudioResampler(format='fltp')
r_frames = resampler.resample(frame)

print(r_frames)
for rf in r_frames:
    print(rf.format.name)
    arr = rf.to_ndarray()
    print("Array shape:", arr.shape)
    print("Array dtype:", arr.dtype)
