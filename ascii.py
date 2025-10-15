from PIL import Image, ImageEnhance
import os

# Only dot-style ASCII ramp from light to dark
ASCII_CHARS = " .·•oO"  # You may use ".oO" or ".:oO" etc.

def image_to_ascii(input_path, output_path, width, height, contrast_factor=1.5, bw_threshold=128):
    # Open, grayscale, resize
    img = Image.open(input_path).convert('L').resize((width, height))

    # Enhance contrast
    img = ImageEnhance.Contrast(img).enhance(contrast_factor)

    # Binarize (monochromatic, optional pre-step)
    img_bw = img.point(lambda x: 255 if x > bw_threshold else 0, mode='1')

    # Use the high-contrast (mono) image for mapping (use `img_bw` or `img` as you prefer)
    # For smoother effect, use 'img'. For pure binary dots, use 'img_bw'
    pixels = img.getdata()
    ascii_img = []
    for y in range(height):
        line = ""
        for x in range(width):
            pixel = img.getpixel((x, y))
            # If you want strictly black & white: uncomment below
            # pixel = img_bw.getpixel((x, y)) * 255  # 0 or 255
            char_index = int(pixel / 255 * (len(ASCII_CHARS) - 1))
            char = ASCII_CHARS[char_index]
            line += char
        ascii_img.append(line)
    with open(output_path, 'w') as f:
        f.write('\n'.join(ascii_img))

if __name__ == "__main__":
    images = [os.path.join("images", image) for image in os.listdir("images")]
    print(images)
    width = 45
    height = 16
    count = 0
    for image in images:
        image_to_ascii(image, f"ascii/ascii_{count}.txt", width, height)
        count += 1
