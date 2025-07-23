import csv

input_path = "data/denmark_club_data.csv"
output_path = "data/denmark_club_data_cleaned.csv"

with open(input_path, "r", encoding="utf-8") as infile, open(output_path, "w", newline='', encoding="utf-8") as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile, quoting=csv.QUOTE_ALL)
    header = next(reader)
    writer.writerow(header)
    row_buffer = []
    for row in reader:
        # Merge lines if not enough fields
        while len(row) < 4:
            try:
                next_line = next(reader)
                row[-1] += " " + " ".join(next_line)
            except StopIteration:
                break
            row = [field.replace('\n', ' ').replace('\r', ' ') for field in row]
        # Truncate or pad to 4 fields
        row = row[:4] + [""] * (4 - len(row))
        writer.writerow(row)

print("Cleaned CSV written to", output_path)