CREATE OR REPLACE VIEW "public"."activeartworks" AS 
 SELECT DISTINCT a1.id
   FROM (artworks a1
     JOIN ( SELECT artworks.edition_id,
            min(artworks.edition) AS edition
           FROM artworks
          WHERE (artworks.transferred_at IS NULL)
          GROUP BY artworks.edition_id) a2 ON ((((a1.edition_id = a2.edition_id) AND (a1.edition = a2.edition)) OR (a1.transferred_at IS NOT NULL))));
