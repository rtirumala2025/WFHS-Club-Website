import pandas as pd
import psycopg2
import re
from collections import defaultdict

# --- CONFIGURATION ---

# Map school abbreviation to CSV file and column mapping
SCHOOL_CSVS = {
    'WFHS': {
        'file': 'data/wfhs_clubs_data.csv',
        'columns': {'Club Name': 'club_name', 'Sponsor': 'sponsor', 'Category': 'category', 'Description': 'description'}
    },
    'SFHS': {
        'file': 'data/sfhs_club_data.csv',
        'columns': {'Club Name': 'club_name', 'Club Sponsor': 'sponsor', 'Description': 'description', 'Meeting/Practice Dates': 'category', 'Sponsor Email': 'sponsor_email'}
    },
    'LHS': {
        'file': 'data/lhs_club_data.csv',
        'columns': {'Club/Organization': 'club_name', 'Name': 'sponsor'}
    },
    'FCHS': {
        'file': 'data/fchs_club_data.csv',
        'columns': {'Club/Organization': 'club_name', 'Sponsor(s)': 'sponsor'}
    },
    'EFHS': {
        'file': 'data/efhs_club_data.csv',
        'columns': {'Club Name': 'club_name'}
    },
    'DENMARK': {
        'file': 'data/denmark_club_data.csv',
        'columns': {'CLUB': 'club_name', 'FACULTY SPONSOR & EMAIL': 'sponsor', 'Description ': 'description'}
    },
    'ALLIANCE': {
        'file': 'data/alliance_club_data.csv',
        'columns': {'Club/CTSO/Organization/Competition name': 'club_name', 'last name of sponsor': 'sponsor'}
    },
    'NFHS': {
        'file': 'data/nfhs_club_data.csv',
        'columns': {'Arts': 'club_name'}  # This file may need special handling due to its format
    }
}

# --- DEDUPLICATION FUNCTION ---

def normalize_club_name(name):
    if not isinstance(name, str):
        return ''
    name = name.lower()
    name = re.sub(r'[\W_]+', '', name)
    # Custom equivalence
    if name in ['fbla', 'fblafuturebusinessleadersofamerica', 'futurebusinessleadersofamerica']:
        return 'fbla'
    if name in ['hosa', 'hosafuturehealthprofessionals']:
        return 'hosa'
    return name

def slugify(name):
    if not isinstance(name, str):
        return ''
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

# --- DATABASE CONNECTION ---

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="club_website",
    user="postgres",
    password="ritvik1213"
)
cur = conn.cursor()

# --- LOAD AND NORMALIZE DATA ---

all_clubs = []
for school, info in SCHOOL_CSVS.items():
    try:
        df = pd.read_csv(info['file'])
        df = df.rename(columns=info['columns'])
        # Fill missing columns with empty string
        for col in ['club_name', 'description', 'category', 'sponsor']:
            if col not in df.columns:
                df[col] = ''
        df['school_abbreviation'] = school
        all_clubs.append(df[['club_name', 'description', 'category', 'sponsor', 'school_abbreviation']])
    except Exception as e:
        print(f"Error loading {school}: {e}")

clubs_df = pd.concat(all_clubs, ignore_index=True)
clubs_df['normalized_name'] = clubs_df['club_name'].apply(normalize_club_name)
unique_clubs = clubs_df.drop_duplicates('normalized_name')

# --- INSERT UNIQUE CLUBS ---

club_id_map = {}
for _, row in unique_clubs.iterrows():
    slug = slugify(row['club_name'])
    cur.execute("""
        INSERT INTO Clubs (name, description, category, slug)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (name) DO UPDATE SET description=EXCLUDED.description
        RETURNING id;
    """, (row['club_name'], row['description'], row['category'], slug))
    result = cur.fetchone()
    if result is None:
        # Try to fetch the club id if it already exists
        cur.execute("SELECT id FROM Clubs WHERE name=%s", (row['club_name'],))
        result = cur.fetchone()
        if result is None:
            print(f"Error: Could not insert or find club '{row['club_name']}'")
            continue
    club_id = result[0]
    club_id_map[row['normalized_name']] = club_id

# --- INSERT INTO SCHOOL_CLUBS ---

for _, row in clubs_df.iterrows():
    cur.execute("SELECT id FROM Schools WHERE abbreviation=%s", (row['school_abbreviation'],))
    school_result = cur.fetchone()
    if school_result is None:
        print(f"Warning: School abbreviation '{row['school_abbreviation']}' not found in Schools table.")
        continue
    school_id = school_result[0]
    club_id = club_id_map.get(row['normalized_name'])
    if club_id is None:
        print(f"Warning: Club '{row['club_name']}' not found in club_id_map.")
        continue
    cur.execute("""
        INSERT INTO School_Clubs (school_id, club_id, sponsor)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING;
    """, (school_id, club_id, row['sponsor']))

conn.commit()
cur.close()
conn.close()

print("Club import complete!")