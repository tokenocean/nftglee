CREATE OR REPLACE FUNCTION public.artwork_is_sold(artwork_row artworks)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
SELECT transferred_at IS NOT NULL
FROM artworks A
WHERE
        artwork_row.id = A.id;
$function$;
