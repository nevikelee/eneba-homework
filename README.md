# Game Search Web Application

This repository contains a small full-stack web application that implements a searchable game catalog.
The application was built as part of a technical assignment and follows the provided design and API requirements.

## Overview

<p align="center">
  <img width="900" height="518" alt="Web Application Design Screenshot" src="https://github.com/user-attachments/assets/8db425e0-bdfd-48c1-b47e-1f43b106b936" />  
</p>

The application allows users to search for games using partial matches and typo-tolerant search [and typo-tolerant search].

The dataset includes (at minimum):
- FIFA 23
- Red Dead Redemption 2
- Split Fiction
Several game entries were added to better demonstrate search behaviour.

## Design

### Database
The diagram below visualizes the relational database schema used by the application. 
It shows the core entities (`games`, `offers`, and `deliveries`) and the relationships
between them.

The **games** table stores only the fundamental, immutable information about a game - in this case, its *title*. This ensures that shared game metadata is defined once
and reused consistently across the system.

All purchase-specific and variable information is stored in the **offers** table.
An offer represents a specific listing of a game, including its platform, region,
pricing, discounts, and delivery method. In this sense, the **offers** table extends
the **games** table by modeling how a game is actually sold under different
conditions.

This design allows a single **game** to have multiple variants of it, each representing
a different combination of platform, region, pricing, or delivery method, while
avoiding duplication of game data. The **deliveries** table is separated to normalize
delivery-related information and allow delivery types to be reused and extended
independently.

Foreign key constraints enforce referential integrity between tables, ensuring that
offers always reference valid games and delivery methods. Overall, this structure
keeps the database normalized, improves maintainability, and enables efficient
querying and filtering of offers without compromising data consistency.

<p align="center">
    <img width="931" height="627" alt="supabase-schema-tcurtvnexfuhuujukapo" src="https://github.com/user-attachments/assets/e5d2f411-877d-43a3-9906-a6597a162fa0" />
</p>


### Tech Stack

__Frontend__
- Vite React
- Fetch API for backend communication
- Responsive layout based on the provided design screenshot

__Backend__
- Node.js (Express)

__Database__
- PostgreSQL (via Supabase)

__Infrastructure__
- Docker & Docker Compose for containerization
- Nginx for reverse proxying and port forwarding
- Application deployed on a Virtual Machine


### Public API
The backend exposes the following public endpoints:
---
```
GET /list
```
Returns a list of all available games.

```JSON
[
  {
    "id": "12",
    "title": "Split Fiction",
    "game_id": "1",
    "edition": null,
    "platform": "Xbox Series X|S",
    "delivery": "1",
    "region": "United Kingdom",
    "price": "-1",
    "discount": "0.0",
    "cashback": "0.0",
    "image_url": "https://imgproxy.eneba.games/_5OxnTyhMZOmEpqkpIk1YDG6gzHYUflVtI4EifZ-YmA/rs:fit:600/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9z/cHNhQjAwRmRUOHJK/dW9uVGhGXzN5dksz/cjBuUWhDY0IwX2lB/VDh4Q25NLmpwZw"
  },
  ...
]
```

---
```
GET /list?search=<gamename>
```
Returns games matching the search query.
Supports partial matches
Supports typo-tolerant search to some extent

GET /list?search=spilt
```JSON
[
  {
    "id": "12",
    "title": "Split Fiction",
    "game_id": "1",
    "edition": null,
    "platform": "Xbox Series X|S",
    "delivery": "1",
    "region": "United Kingdom",
    "price": "-1",
    "discount": "0.0",
    "cashback": "0.0",
    "image_url": "https://imgproxy.eneba.games/_5OxnTyhMZOmEpqkpIk1YDG6gzHYUflVtI4EifZ-YmA/rs:fit:600/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9z/cHNhQjAwRmRUOHJK/dW9uVGhGXzN5dksz/cjBuUWhDY0IwX2lB/VDh4Q25NLmpwZw",
    "relevance_score": 0.660000002384186
  },
  {
    "id": "11",
    "title": "Split Fiction",
    "game_id": "1",
    "edition": null,
    "platform": "Nintendo Switch 2",
    "delivery": "3",
    "region": "Australia",
    "price": "37.61",
    "discount": "0.0",
    "cashback": "0.11",
    "image_url": "https://imgproxy.eneba.games/fAZaD1e4nBZ4pEgEuLMJObWarONd7PrJGsWUHtQbLMM/rs:fit:600/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9z/blMxMVM4SURqcHFF/NzZDLU9HdDRZMXJD/X1YzR1gzSTBVX3ZK/WEVMcTdjLmpwZw",
    "relevance_score": 0.660000002384186
  },
  ...
]
```
---


## Search Implementation (Fuzzy Search)

The search system is designed to tolerate typos, prioritize relevant results, and rank matches intelligently instead of simply returning anything that matches.

__Algorithm: Triple-Weighted Scoring__

Rather than using a single matching strategy, the search calculates a relevance_score for each game based on three complementary factors:

1. Trigram Similarity (`pg_trgm`)
    * Uses PostgreSQL’s strict_word_similarity to compare the search term against the game title. 
    * Works well for partial inputs and prefix searches.

2. Exact Word Match Bonus (`Regex`)
    * Applies an additional weight if the search term matches a full word in the title.
    * Uses PostgreSQL word boundaries (`\y`) to avoid false positives.

3. Levenshtein Distance (`Typo Tolerance`)

    * Calculates the edit distance between the search term and words in the title.

    * Allows results to appear even when the user makes small spelling mistakes.


## Deployment

The application is fully self-hosted and accessible via the following public URLs:

- **Frontend:** [https://api.eminik25.treok.eu/](https://api.eminik25.treok.eu/)  
- **Backend (API):** [https://api.eminik25.treok.eu/api/list](https://api.eminik25.treok.eu/api/list)

### Hosting Environment

- **Virtual Machine (VM):** The application is deployed on a VM, giving full control over runtime and network configuration.
- **Docker & Docker Compose:** All frontend and backend services are containerized for consistent and reproducible deployment.
- **Nginx:** Acts as a reverse proxy and handles port forwarding, routing requests to the appropriate service (frontend or backend).

## AI Usage & Prompt History

Below is a categorized list of how AI tools were used during development. 
Prompts were used as guidance, inspiration, or clarification; all code and final implementations were manually reviewed and adapted.

1. **Frontend Design Refinement**
   - Generated optimized CSS for hover interactions, grid layout, and responsive design.
   - Example prompts:
     - "Write a React/CSS card layout where an image, banner, and content move together on hover with smooth transitions."
     - "How to place the navigation bar to always be on the top of the page? When the page is being loaded, initially the navbar is in the middle of the page - how to make it appear on the top?"
     - "How to align the card list with the navigation bar?"
     - "How to make this element responsive?"
     - "Convert this SVG element into a component"
     - "How to make a slide-in/slide-out animation?"
     - "How does the grid template work? <style excerpt with grid-template attribute>"
     - "What's wrong? `background-color: 'rgba(0; 0; 0; 0.55)'`"
     - "There are some 'sold out' listings, where the price is -1. How can I push them to the back of the list?"

2. **Search Implementation Guidance**
   - Suggested algorithms for typo-tolerant fuzzy search with PostgreSQL.
   - Example prompts:
     - "How can I implement typo-tolerant fuzzy search in PostgreSQL for game titles?"
     - "What are the most popular ways to implement fuzzy search?"
     - "How does Levenshtein distance work?"

3. **Design Consultation / Decision Support**
   - Clarifying questions about design feasibility and approach:
     - "Is it possible to implement fuzzy search using SQLite?"
     - "Does fuzzy search just mean the user provides a substring of the title, or that they can make typos?"
     - "There are a lot of variations of a game with the same title. Does it make sense to split the game title into a separate class?"

4. **Prototyping & Testing Ideas**
   - Used AI to quickly prototype or validate implementation ideas before integrating into the main system.
   - Integrated new changes suggested by AI into existing implementation to test feasibility.

5. **Error Handling**
   - Diagnosed and fixed issues with guidance from AI.
   - Example: "I got this problem — why did it occur and how do I fix it?" - just sending errors and stack traces

6. **Clarifying Documentation / Task Questions**
   - Asked about text interpretation or understanding the task requirements.
   - Example:
     - "Does the 'Available public APIs' part mean the frontend or backend endpoints? <task excerpt>"

7. **Deployment Assistance**
   - Example prompt: "Write the Dockerfile draft for [frontend/backend] if I start it on host like this: <command>"
   - Ultimately reused a past solution with Nginx on the VM, requiring minimal AI support.

8. **README Drafting**
   - Helped generate initial README structure based on the task description.
   - Example prompt: "How to center a picture in markdown"

**Note:**  
All code was manually reviewed and adapted for this project. 
AI prompts were used primarily as guidance or inspiration, but the final solution, architecture, and design decisions were fully implemented by me. 
Most of the time, I preferred reading official documentation and using AI to quickly understand where to look and how to integrate solutions into my existing system.

## Notices / Limitations

While the application demonstrates the required features, there are a few points to consider:

1. **Small dataset** - The database currently contains a limited number of entries, so loading items may seem slower than expected due to query and frontend rendering overhead.
2. **Supabase availability** – Occasionally, the Supabase service may be temporarily unavailable, which affects backend responses.
3. **No “no items” screen** – A dedicated screen for empty search results (like Eneba’s website) has not been implemented. It only shows a text "No results found".
4. **Non-functional buttons** – The buttons in the UI are currently placeholders and do not perform actions.
5. **Mobile platform banners** – Platform (drm) banners on mobile do not behave exactly like Eneba’s implementation.
6. **Wishlist counts** – Counts for each listing are currently generated randomly. In a full implementation, they would be tied to a user and wishlist table in the database.
7. **Discounts and cashbacks** – Stored as separate fields; in real-life scenarios, cashbacks and discounts might be normalized into separate tables for scalability.
8. **External image links** – Image links are copied directly from Eneba’s site; in production, images would typically be hosted independently or in a CDN.
9. **Search scope** – The search currently only queries the game title. In real-world applications, searches would likely include platform, edition, and other fields to improve relevance.
10. **Fuzzy search limitation** - The search returns items with their relevance scores, Sometimes they might contain irrelevant results, which are "caught" by the algorithm, because of the similarity. It would make sense to compare the difference from results with higher relevance scores and filter out the ones which are significantly lower, therefore irrelevant. 
