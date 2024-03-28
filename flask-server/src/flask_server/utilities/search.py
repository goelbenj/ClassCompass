from thefuzz import process

# Takes a dictionary of choices where the value is a string, a query, and an optional limit and match threshold
def textSearch(choices, query, limit=30, match_threshold=70):
    matches = process.extract(query, choices, limit=limit)
    # Filter out matches that are below the match threshold
    matches = [match[2] for match in matches if match[1] >= match_threshold]
    return matches