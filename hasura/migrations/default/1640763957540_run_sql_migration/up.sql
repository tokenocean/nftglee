CREATE OR REPLACE FUNCTION public.artwork_unlocked_for(artwork_row artworks)
    RETURNS text
    LANGUAGE sql
    STABLE
AS $function$
SELECT array_agg(owner_id::text)::text FROM public.artworks A
WHERE artwork_row.locked_by = A.edition_id;
$function$
