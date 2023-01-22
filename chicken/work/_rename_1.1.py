import sys
from pathlib import Path

if __name__ == "__main__":

    if len(sys.argv) >= 2:

        files = [Path(a) for a in sys.argv[1:]]

        while True:

            print("$ is prefix")
            key_from = input("Replace from: ")
            key_to   = input("          to: ")

            for i, file in enumerate(files):
                new_name = (key_to + file.name) if key_from == "$" else file.name.replace(key_from, key_to)
                files[i] = file.rename(file.parent / new_name)

            #map(lambda file: file.parent / file.name.replace(key_from, key_to), files)

            print("Done.\n\n")

    else:
        input("D&D")
