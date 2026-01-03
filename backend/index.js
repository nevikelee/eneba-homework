require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/games', async (req, res) => {
  const search = req.query.search;

  try {
    if (!search) {
      const rows = await sql`
      SELECT g.*, o.*
        FROM games g
        LEFT JOIN offers o ON g.id = o.game_id
      `;

      return res.json(rows);
    }


    const rows = await sql.begin(async (sql) => {

      await sql`SET LOCAL pg_trgm.strict_word_similarity_threshold = 0.2`;
        
      return await sql`
        SELECT 
          g.*, 
          o.*,
          (
            -- 1. Word-level match
            -- Compare the search to each word. 
            -- strict_word_similarity is great, but we add a 'word-start' bonus.
            (strict_word_similarity(${search}, g.title) * 0.8) + 
            
            -- 2. Exact word bonus
            -- If the search term is found as a whole word inside the title
            (CASE WHEN g.title ~* ('\\y' || ${search} || '\\y') THEN 0.4 ELSE 0 END) +
        
            -- 3. Typo-tolerant bonus (Levenshtein)
            -- We check if search is close to any word in the title
            (CASE 
              WHEN EXISTS (
                SELECT 1 FROM unnest(string_to_array(lower(g.title), ' ')) as word 
                WHERE levenshtein(word, lower(${search})) <= 3
              ) THEN 0.5 ELSE 0 
            END)
          ) AS relevance_score
        FROM games g
        LEFT JOIN offers o ON g.id = o.game_id
        WHERE 
          ${search} <<% g.title 
          OR g.title ILIKE ${'%' + search + '%'}
        ORDER BY relevance_score DESC
      `;
    });


    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});



app.listen(process.env.PORT || 8080, () => {
  console.log('Server running');
});