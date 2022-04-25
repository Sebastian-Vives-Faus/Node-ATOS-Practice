CREATE TABLE leaderboards(
    board_id SERIAL PRIMARY KEY,
    game VARCHAR(30) NOT NULL,
    player VARCHAR(30) NOT NULL,
    score INTEGER NOT NULL
);

-- Insert into Database
INSERT INTO leaderboards (game,player, score) VALUES ('hordezee', 'Fred', 15);