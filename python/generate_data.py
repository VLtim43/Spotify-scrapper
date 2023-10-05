import json

def extract_song_data():
    # Define the path to the input and output files
    input_path = './data/savedsongs.json'
    output_path = './data/orderedsongs.json'
    
    # Read the data from savedsongs.json
    with open(input_path, 'r') as infile:
        songs = json.load(infile)
    
    # Process the data
    ordered_songs = []
    for song in songs:
        ordered_songs.append({
            'name': song['name'],
            'artist': song['artist']
        })
    
    # Write the processed data to orderedsongs.json
    with open(output_path, 'w') as outfile:
        json.dump(ordered_songs, outfile, indent=4)

if __name__ == "__main__":
    extract_song_data()
