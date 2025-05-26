-- Active: 1747558872112@@localhost@5433@conservation_db@public

-- Create `rangers` table
CREATE TABLE rangers (
    ranger_id SERIAL NOT NULL,
    name varchar(100) NOT NULL,
    region varchar(100) NOT NULL,
    PRIMARY KEY (ranger_id)
);

--Create `species` table
CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150) NOT NULL,
    discovery_date DATE NOT NULL,
    conservation_status VARCHAR(50)
);

ALTER TABLE species ALTER COLUMN conservation_status SET NOT NULL;

--create `sightings` table
CREATE TABLE sightings (
    sighting_id SERIAL,
    species_id INT NOT NULL,
    ranger_id INT NOT NULL,
    "location" VARCHAR(150) NOT NULL,
    sighting_time TIMESTAMP NOT NULL,
    notes TEXT,
    PRIMARY KEY (sighting_id),
    FOREIGN KEY (ranger_id) REFERENCES rangers (ranger_id) ON DELETE CASCADE,
    FOREIGN KEY (species_id) REFERENCES species (species_id) ON DELETE CASCADE
);

INSERT INTO
    rangers ("name", region)
VALUES (
        'Alice Green',
        'Northern Hills'
    ),
    ('Bob White', 'River Delta'),
    (
        'Carol King',
        'Mountain Range'
    );

SELECT * FROM rangers;

INSERT INTO
    species (
        common_name,
        scientific_name,
        discovery_date,
        conservation_status
    )
VALUES (
        'Snow Leopard',
        'Panthera uncia',
        '1775-01-01',
        'Endangered'
    ),
    (
        'Bengal Tiger',
        'Panthera tigris tigris',
        '1758-01-01',
        'Endangered'
    ),
    (
        'Red Panda',
        'Ailurus fulgens',
        '1825-01-01',
        'Vulnerable'
    ),
    (
        'Asiatic Elephant',
        'Elephas maximus indicus',
        '1758-01-01',
        'Endangered'
    );

SELECT * FROM species;

INSERT INTO
    sightings (
        species_id,
        ranger_id,
        "location",
        sighting_time,
        notes
    )
VALUES (
        1,
        1,
        'Peak Ridge',
        '2024-05-10 07:45:00',
        'Camera trap image captured'
    ),
    (
        2,
        2,
        'Bankwood Area',
        '2024-05-12 16:20:00',
        'Juvenile seen'
    ),
    (
        3,
        3,
        'Bamboo Grove East',
        '2024-05-15 09:10:00',
        'Feeding observed'
    ),
    (
        1,
        2,
        'Snowfall Pass',
        '2024-05-18 18:30:00',
        NULL
    );



-- Problem 1
INSERT into
    rangers ("name", region)
VALUES ('Derek Fox', 'Coastal Plains');

-- Problem 2
select count(DISTINCT species_id) as unique_species_count
from sightings;

-- Problem 3
SELECT * FROM sightings WHERE location LIKE ('%Pass%');

-- Problem 4
SELECT r."name", count(s.*) as total_sightings
from sightings as s
    join rangers as r on r.ranger_id = s.ranger_id
group by
    s.ranger_id,
    r."name"
ORDER BY r.name;

-- Problem 5
SELECT species.common_name as common_name
from species
    LEFT JOIN sightings on species.species_id = sightings.species_id
where
    sightings.sighting_id is null;

-- Problem 6(With subquery)
select species.common_name, sighting_ranger.sighting_time, sighting_ranger."name"
from (
        SELECT *
        from sightings
            join rangers on sightings.ranger_id = rangers.ranger_id
    ) as sighting_ranger
    JOIN species on sighting_ranger.species_id = species.species_id
ORDER BY sighting_ranger.sighting_time DESC
limit 2;

-- Problem 6 (Without subquery)
select species.common_name, sightings.sighting_time, rangers."name"
FROM
    sightings
    JOIN rangers ON sightings.ranger_id = rangers.ranger_id
    JOIN species ON sightings.species_id = species.species_id
ORDER BY sightings.sighting_time DESC
limit 2;

-- Problem 7

UPDATE species
SET
    conservation_status = 'Historic'
where
    extract(
        year
        from discovery_date
    ) < 1800;




-- Problem 8 (using function)
CREATE OR replace FUNCTION get_time_of_day(sighting_time TIMESTAMP)
RETURNS varchar AS 
$$
BEGIN
    if extract(hour FROM sighting_time) < 12 THEN
        RETURN 'Morning';
    elseif extract(hour FROM sighting_time) >= 12 AND EXTRACT(HOUR FROM sighting_time) <= 17 THEN
        RETURN 'Afternoon';
    ELSE
        RETURN 'Evening';
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT
    sighting_id,
    get_time_of_day (sighting_time) as time_of_day
from sightings;

-- problem 8 (using case)
SELECT
    sighting_id,
    CASE
        WHEN extract(
            hour
            from sighting_time
        ) < 12 THEN 'Morning'
        when extract(
            hour
            from sighting_time
        ) >= 12
        and extract(
            hour
            from sighting_time
        ) <= 17 THEN 'Afternoon'
        else 'Evening'
    END as time_of_day
from sightings;



-- Problem 9
DELETE from rangers
where
    ranger_id IN (
        select rangers.ranger_id
        from rangers
            left join sightings on rangers.ranger_id = sightings.ranger_id
        where
            sightings.ranger_id is null
    )